import { CSSProperties, useState } from "react";
import { Slide } from "../../presentation/slide/Slide.tsx";
import styles from './LeftPanel.module.css'
 import { useTitleSelector, useSlideSelectionSelector, useSlidesSelector } from "../../hooks/useAppSelector.ts";
import { useAppActions } from "../../hooks/useAppActions.ts";

const SLIDE_PREVIEW_SCALE = 0.2

function LeftPanel() {
    const title = useTitleSelector()
    const slideSelection = useSlideSelectionSelector()
    const slides = useSlidesSelector()

    const { addToSlideSelection } = useAppActions()
    const { selectOneSlide } = useAppActions()
    const { renamePresentation } = useAppActions()
    const { setSlidesOrder } = useAppActions()
    const onRenamePresentation: React.ChangeEventHandler = (event) => {
        renamePresentation((event.target as HTMLInputElement).value)
    }
    const onSlideClick = (slideId: string, event: React.MouseEvent) => {
        if (event.ctrlKey) {
            addToSlideSelection(slideId)
        } else {
            selectOneSlide(slideId)
        }
    }
    const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
    const dragStartHandler = (slide: Slide) => {
        setCurrentSlide(slide)
    }
    const dragOverHandler = (event: any) => {
        event.preventDefault()
    }
    const dropHandler = (event: any, slide: Slide) => {
        event.preventDefault()
        if (currentSlide == null) return
        const draggableSlides: { dragSlideId: string, dropSlideId: string } = {
            dragSlideId: currentSlide?.id,
            dropSlideId: slide.id
        }
        setSlidesOrder(draggableSlides)
    }
    return (
        <div>
            <p className={styles.inputTitleLabel}>Change project name</p>
            <input type='text' className={styles.inputPresentationTitle} value={title} onChange={onRenamePresentation} />
            <div className={styles.leftPanel}>
                {slides.map((slide, i) => {
                    const inlineStyles: CSSProperties = {}
                    let isSlideSelected = false
                    slideSelection.forEach((element) => {
                        if (element === slide.id) {
                            isSlideSelected = true
                        }
                    })
                    if (isSlideSelected) {
                        inlineStyles.backgroundColor = "#e4e4e4"
                    }
                    return <div
                        key={slide.id}
                        onDragStart={() => dragStartHandler(slide)}
                        onDragOver={(event) => dragOverHandler(event)}
                        onDrop={(event) => dropHandler(event, slide)}
                        onClick={(event) => { onSlideClick(slide.id, event) }}
                        draggable={true}
                        style={inlineStyles}
                        className={styles.slidePreviewContainer}
                    >
                        <p className={styles.slideIndex}>
                            {i + 1}
                        </p>
                        <Slide
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                        />
                        <div className={styles.slidePreviewContainerGuard} />
                    </div>
                }
                )}
            </div>
        </div>
    )
}

export {
    LeftPanel
}