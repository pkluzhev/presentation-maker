// import * as React from "react";
// import { type SelectionUnit } from "../../../store/types/EditorTypes.ts";
import { dispatch } from "../../../store/editor.ts";
import { addToSlideSelection } from "../../../store/setSelection.ts";
import { selectOneSlide } from "../../../store/setSelection.ts";
import { CSSProperties, useState, useCallback, useEffect, useRef, PointerEventHandler } from "react";
import { Slide } from "../../presentation/slide/Slide.tsx";
import styles from './SlidePreview.module.css'
import { Position } from "../../../store/types/PresentationTypes.ts";

const SLIDE_PREVIEW_SCALE = 0.2

type SlidePreviewProps = {
    slideNum: number,
    slide: Slide,
    isSelected: boolean
}

function SlidePreview(props: SlidePreviewProps) {
    const onSelecionStyle: CSSProperties = {}

    if (props.isSelected) {
        onSelecionStyle.backgroundColor = "#e4e4e4"
    }

    let finalObjectPos: { left: number, top: number }

    const dragSlideRef = useRef<HTMLDivElement>(null)
    const startPointerPosInsideElem = useRef<{ left: number, top: number }>()
    const [dragging, setDragging] = useState(false);

    const handleDragStart = useCallback<PointerEventHandler>((event) => {
        if (!props.isSelected && event.ctrlKey) {
            dispatch(addToSlideSelection, props.slide.id)
            return
        }
        dispatch(selectOneSlide, props.slide.id)

        if (!dragSlideRef.current) return
        const dragElementRect = dragSlideRef.current?.getBoundingClientRect();
        startPointerPosInsideElem.current = {
            left: dragElementRect.left - event.pageX,
            top: dragElementRect.top - event.pageY
        }

        console.log('start')
        // setDragging(true)
    }, [])

    const handleDragMove = useCallback((event: PointerEvent) => {
        if (!dragSlideRef.current || !startPointerPosInsideElem.current) return

        // const { left, top } = startPointerPosInsideElem.current
        const dragElementRect = dragSlideRef.current?.getBoundingClientRect();

        console.log('move')
        console.log('dragging: ', dragging)




        // const deeperElementUnderItem = document.elementFromPoint(
        //     event.clientX + left + dragElementRect.width / 2,
        //     event.clientY + top + dragElementRect.height / 2,
        // )
        // const closestSlidePreviewElement = deeperElementUnderItem?.closest('slidePreviewContainer')
        // if (!closestSlidePreviewElement) return
    }, [])

    const handleDragEnd = useCallback(() => {
        console.log('end')
        setDragging(false)
        dispatch(selectOneSlide, props.slide.id)
    }, [])

    useEffect(() => {
        if (dragging) {
            console.log('useEffect')
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
            style={onSelecionStyle}
            className={styles.slidePreviewContainer}
        >
            <p className={styles.slideIndex}>
                {props.slideNum}
            </p>
            <Slide
                slide={props.slide}
                scale={SLIDE_PREVIEW_SCALE}
            />
            <div draggable={true} className={styles.slidePreviewContainerGuard} />
        </div>
    )
}

export {
    SlidePreview
}