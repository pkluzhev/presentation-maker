import { CSSProperties, useEffect, useRef, useState } from "react";
import { Slide } from "../../../presentation/slide/Slide.tsx";
import styles from './LeftPanel.module.css'
import { useTitleSelector, useSlideSelectionSelector, useSlidesSelector } from "../../../hooks/useAppSelector.ts";
import { useAppActions } from "../../../hooks/useAppActions.ts";

const SLIDE_PREVIEW_SCALE = 0.2

function LeftPanel() {
    const title = useTitleSelector()
    const slideSelection = useSlideSelectionSelector()
    const slides = useSlidesSelector()

    const { addToSlideSelection } = useAppActions()
    const { selectOneSlide } = useAppActions()
    const { renamePresentation } = useAppActions()
    const { setSlidesOrder } = useAppActions()

    const [currentTitle, setCurrentTitle] = useState<string>(title)
    const onChangeTitle: React.ChangeEventHandler = (event) => {
        setCurrentTitle((event.target as HTMLInputElement).value)
    }
    const onRenamePresentation: React.ChangeEventHandler = (event) => {
        (event.target as HTMLInputElement).value = ''
        renamePresentation(currentTitle)
    }

    const onSlideClick = (slideId: string, event: React.MouseEvent) => {
        if (event.ctrlKey) {
            addToSlideSelection(slideId)
        } else {
            selectOneSlide(slideId)
        }
    }
    const [currentSlides, setCurrentSlides] = useState<string[] | null>(null)

    const dragStartHandler = (slide: Slide) => {
        addToSlideSelection(slide.id)
        setCurrentSlides(slideSelection)
    }
    const dragOverHandler = (event: any) => {
        event.preventDefault()
    }
    const dropHandler = (event: any, slide: Slide) => {
        event.preventDefault()
        if (currentSlides == null) return
        for (let i = 0; i < currentSlides.length; i++) {
            if (currentSlides[i] == slide.id) return
        }
        const draggableSlides: { dragSlideId: string[], dropSlideId: string } = {
            dragSlideId: currentSlides,
            dropSlideId: slide.id
        }
        setSlidesOrder(draggableSlides)
    }

    const selectedSlideRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if (selectedSlideRef.current) {
            selectedSlideRef.current.scrollIntoView({behavior: "smooth", block: "center"})
        }
    }, [slideSelection])
    
    return (
        <div className={styles.leftPanel}>
            <p className={styles.inputTitleLabel}>Change project name</p>
            <input
                type='text'
                className={styles.inputPresentationTitle}
                placeholder={title}
                onChange={onChangeTitle}
                onBlur={onRenamePresentation}
            />
            <div className={styles.slideList}>
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
                        inlineStyles.boxShadow = "2px 2px 4px #414141"
                    }
                    return <div
                        ref={isSlideSelected ? selectedSlideRef : null}
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
                            elementSelection={[]}
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