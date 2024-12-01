// import * as React from "react";
// import { type SelectionUnit } from "../../../store/types/EditorTypes.ts";
import { dispatch } from "../../../store/editor.ts";
import { addToSlideSelection } from "../../../store/setSelection.ts";
import { selectOneSlide } from "../../../store/setSelection.ts";
import { CSSProperties, useState, useCallback, useEffect, useRef, PointerEventHandler } from "react";
import { Slide } from "../../presentation/slide/Slide.tsx";
import styles from './SlidePreview.module.css'
// import { swapSlides } from "../../../store/types/PresentationTypes.ts";

const SLIDE_PREVIEW_SCALE = 0.2

type SlidePreviewProps = {
    slideNum: number,
    slide: Slide,
    isSelected: boolean
}

function SlidePreview(props: SlidePreviewProps) {
    const onSelectionStyle: CSSProperties = {}
    if (props.isSelected) {
        onSelectionStyle.backgroundColor = "#e4e4e4"
    }

    const dragSlideRef = useRef<HTMLDivElement>(null)
    const [dragging, setDragging] = useState(false);

    const handleDragStart = useCallback<PointerEventHandler>((event) => {
        if (!props.isSelected && event.ctrlKey) {
            dispatch(addToSlideSelection, props.slide.id)
            return
        }
        dispatch(selectOneSlide, props.slide.id)
        
        if (!dragSlideRef.current) return
        setDragging(true)
    }, [])

    const handleDragMove = useCallback((event: PointerEvent) => {
        if (!dragSlideRef.current) return
    }, [])

    const handleDragEnd = useCallback(() => {
        setDragging(false)
        // dispatch(changeSlideObjectPosition, finalObjectPos)
    }, [])

    useEffect(() => {
        if (dragging) {
            window.addEventListener('pointermove', handleDragMove)
            window.addEventListener('pointerup', handleDragEnd)
        }
        return () => {
            window.removeEventListener('pointermove', handleDragMove)
            window.removeEventListener('pointerup', handleDragEnd)
        }
    }, [dragging, handleDragMove, handleDragEnd])


    return (
        <div
            ref={dragSlideRef}
            onPointerDown={handleDragStart}
            style={onSelectionStyle}
            className={styles.slidePreviewContainer}
        >
            <p className={styles.slideIndex}>
                {props.slideNum}
            </p>
            <Slide
                slide={props.slide}
                scale={SLIDE_PREVIEW_SCALE}
            />
            <div draggable={true} className={styles.slidePreviewContainerGuard}/>
        </div>
    )
}

export {
    SlidePreview
}