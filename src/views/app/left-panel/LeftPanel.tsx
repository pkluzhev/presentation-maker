import { CSSProperties, useState } from "react";
import { Slide } from "../../presentation/slide/Slide.tsx";
import styles from './LeftPanel.module.css'
import { dispatch } from "../../../store/editor.ts";
import { renamePresentation } from "../../../store/renamePresentation.ts";
import { addToSlideSelection } from "../../../store/addToSlideSelection.ts";
import { selectOneSlide } from "../../../store/selectOneSlide.ts";
import { setSlidesOrder } from "../../../store/setSlidesOrder.ts";
import { useAppSelector } from "../../hooks/useAppSelector.ts";


// type LeftPanelProps = {
//     title: string,
//     slides: Slide[],
//     slideSelection: string[]
// }

const SLIDE_PREVIEW_SCALE = 0.2

function LeftPanel() { //(props: LeftPanelProps) {

    const editor = useAppSelector(editor => editor)
    const title = editor.presentation.title
    const slideSelection = editor.slideSelection


    const slides = editor.presentation.slides
    // const selection = editor.selection
    // const selectedSlide: SlideType = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0]




    const onRenamePresentation: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentation, (event.target as HTMLInputElement).value)
    }
    const onSlideClick = (slideId: string, event: React.MouseEvent) => {
        if (event.ctrlKey) {
            dispatch(addToSlideSelection, slideId)
        } else {
            dispatch(selectOneSlide, slideId)
        }
    }
    const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
    const dragStartHandler = (event: any, slide: Slide) => {
        setCurrentSlide(slide)
    }
    const dragOverHandler = (event: any) => {
        event.preventDefault()
    }
    const dropHandler = (event: any, slide: Slide) => {
        event.preventDefault()
        if (currentSlide == null) return
        const payload: { dragSlideId: string, dropSlideId: string } = {
            dragSlideId: currentSlide?.id,
            dropSlideId: slide.id
        }
        dispatch(setSlidesOrder, payload)
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
                        onDragStart={(event) => dragStartHandler(event, slide)}
                        onDragOver={(event) => dragOverHandler(event)}
                        onDrop={(event) => dropHandler(event, slide)}
                        onClick={(event) => {onSlideClick(slide.id, event)}}
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