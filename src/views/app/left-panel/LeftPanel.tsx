// import * as React from "react";
// import { type SelectionUnit } from "../../../store/types/EditorTypes.ts";
import { dispatch } from "../../../store/editor.ts";
import { renamePresentation } from "../../../store/renamePresentation";
// import { addToSlideSelection } from "./../../../store/setSelection.ts";
// import { selectOneSlide } from "./../../../store/setSelection.ts";
// import { CSSProperties, useState, useCallback, useEffect, useRef, PointerEventHandler } from "react";
import { Slide } from "../../presentation/slide/Slide.tsx";
// import { SlidePreview } from "./SlidePreview.tsx";
import styles from './LeftPanel.module.css'
import { setSlidesOrder } from "../../../store/setSlidesOrder.ts";
import { CSSProperties, useState } from "react";

type LeftPanelProps = {
    title: string,
    slides: Slide[],
    slideSelection: string[]
}

const SLIDE_PREVIEW_SCALE = 0.2

function LeftPanel(props: LeftPanelProps) {
    const onRenamePresentation: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentation, (event.target as HTMLInputElement).value)
    }

    // const [slideList, setSlideList] = useState<Slide[]>(props.slides)
    const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)

    const dragStartHandler = (event: DragEvent<HTMLDivElement>, slide: Slide) => {
        setCurrentSlide(slide)
        console.log(5345)
    }

    const dragEndHandler = (event: DragEvent<HTMLDivElement>) => {
    }

    const dragOverHandler = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const dropHandler = (event: DragEvent<HTMLDivElement>, slide: Slide) => {
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
            <input type='text' className={styles.inputPresentationTitle} value={props.title} onChange={onRenamePresentation} />
            <div className={styles.leftPanel}>
                {props.slides.map((slide, i) => {
                    const inlineStyles: CSSProperties = {}
                    let isSlideSelected = false
                    props.slideSelection.forEach((element) => {
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
                        onDragLeave={(event) => dragEndHandler(event)}
                        onDragEnd={(event) => dragEndHandler(event)}
                        onDragOver={(event) => dragOverHandler(event)}
                        onDrop={(event) => dropHandler(event, slide)}
                        onClick={() => {}}
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