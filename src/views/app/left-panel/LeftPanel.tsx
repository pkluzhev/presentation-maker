// import * as React from "react";
// import { type SelectionUnit } from "../../../store/types/EditorTypes.ts";
import { dispatch } from "../../../store/editor.ts";
import { renamePresentation } from "../../../store/renamePresentation";
// import { addToSlideSelection } from "./../../../store/setSelection.ts";
// import { selectOneSlide } from "./../../../store/setSelection.ts";
// import { CSSProperties, useState, useCallback, useEffect, useRef, PointerEventHandler } from "react";
import { Slide } from "../../presentation/slide/Slide.tsx";
import { SlidePreview } from "./SlidePreview.tsx";

import styles from './LeftPanel.module.css'
// import { swapSlides } from "../../../store/types/PresentationTypes.ts";

type LeftPanelProps = {
    title: string,
    slides: Slide[],
    slideSelection: string[]
}

function LeftPanel(props: LeftPanelProps) {
    const onRenamePresentation: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentation, (event.target as HTMLInputElement).value)
    }
    return (
        <div>
            <p className={styles.inputTitleLabel}>Change project name</p>
            <input type='text' className={styles.inputPresentationTitle} value={props.title} onChange={onRenamePresentation} />
            <div className={styles.leftPanel}>
                {props.slides.map((slide, i) => {
                    let isSlideSelected = false
                    props.slideSelection.forEach((element) => {
                        if (element === slide.id) {
                            isSlideSelected = true
                        }
                    })
                    return <SlidePreview
                        key={slide.id}
                        slideNum={i + 1}
                        slide={slide}
                        isSelected={isSlideSelected}
                    />
                }
                )}
            </div>
        </div>
    )
}

export {
    LeftPanel
}