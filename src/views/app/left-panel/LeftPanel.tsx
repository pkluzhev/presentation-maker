// import * as React from "react";
// import { type SelectionUnit } from "../../../store/types/EditorTypes.ts";
import { dispatch } from "../../../store/editor.ts";
import { renamePresentation } from "../../../store/renamePresentation";
import { addToSlideSelection } from "./../../../store/setSelection.ts";
import { selectOneSlide } from "./../../../store/setSelection.ts";
import { CSSProperties, useState } from "react";
import { Slide } from "../../presentation/slide/Slide.tsx";
import styles from './LeftPanel.module.css'
// import { swapSlides } from "../../../store/types/PresentationTypes.ts";

const SLIDE_PREVIEW_SCALE = 0.2

type LeftPanelProps = {
    title: string,
    slides: Slide[],
    slideSelection: string[]
}

function LeftPanel(props: LeftPanelProps) {
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

    return (
        <div>
            <p className={styles.inputTitleLabel}>Change project name</p>
            <input type='text' className={styles.inputPresentationTitle} value={props.title} onChange={onRenamePresentation} />
            <div className={styles.leftPanel}>
                {props.slides.map((slide, i) => {
                    const onSelectionStyle: CSSProperties = {}
                    props.slideSelection.forEach((element) => {
                        if (element === slide.id) {
                            onSelectionStyle.backgroundColor = "#e4e4e4"
                        }
                    })
                    return <div
                        style={onSelectionStyle}
                        className={styles.slidePreviewContainer}
                        key={slide.id}
                        onClick={(event) => { onSlideClick(slide.id, event) }}
                    >
                        <p className={styles.slideIndex}>
                            {i + 1}
                        </p>
                        <Slide
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                        />
                        <div className={styles.slidePreviewContainerWrapper}></div>
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