// import * as React from "react";
// import { SelectionUnit } from "../../../store/types/EditorTypes";
import { Slide } from "../../presentation/slide/Slide.tsx";
// import { dispatch } from "../../../store/editor.ts";


import styles from './WorkSpace.module.css'

type WorkSpaceProps = {
    slides: Array<Slide>,
    slideSelection: string[],
    elementSelection: string[],
}

const SLIDE_WORKSPACE_SCALE = 1

function WorkSpace(props: WorkSpaceProps) {
    // function onElementClick(slideId: string) {
    //     dispatch(setElementSelection, slideId)
    // }
    if (props.slides.length <= 0) {
        return <></>
    }
    let currentSlideIndex: number = 0

    if (props.slideSelection.length > 0) {
        currentSlideIndex = props.slides.findIndex((slide)=>{
            return slide.id === props.slideSelection[props.slideSelection.length - 1]
        })
    }
    if (currentSlideIndex === -1) {
        return <></>
    }
    return (
        <div className={styles.workSpace}>
            <Slide
                slide={props.slides[currentSlideIndex]}
                scale={SLIDE_WORKSPACE_SCALE}
                elementSelection={props.elementSelection}
            />
        </div>
    )
}

export {
    WorkSpace
}