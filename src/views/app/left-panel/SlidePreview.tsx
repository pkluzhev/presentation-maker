// import * as React from "react";
// import { type SelectionUnit } from "../../../store/types/EditorTypes.ts";
import { dispatch } from "../../../store/editor.ts";
import { addToSlideSelection } from "../../../store/setSelection.ts";
import { selectOneSlide } from "../../../store/setSelection.ts";
import { CSSProperties, useState, useCallback, useEffect, useRef, PointerEventHandler, DragEventHandler, Ref } from "react";
import { Slide } from "../../presentation/slide/Slide.tsx";
import styles from './SlidePreview.module.css'
import { Position } from "../../../store/types/PresentationTypes.ts";
import { setSlidesOrder } from "../../../store/setSlidesOrder.ts";

const SLIDE_PREVIEW_SCALE = 0.2

type SlidePreviewProps = {
    id: string,
    slideNum: number,
    slide: Slide,
    isSelected: boolean
}

function SlidePreview(props: SlidePreviewProps) {
    const inlineStyles: CSSProperties = {
        left: `0px`,
        top: `0px`,
    }

    if (props.isSelected) {
        inlineStyles.backgroundColor = "#e4e4e4"
    }

    const [currentSlideId, setCurrentSlideId] = useState(props.slide.id)
    // const dragSlideRef = useRef<HTMLDivElement>(null)
    // const startPointerPosInsideSlide = useRef<Position>()
    // const [slideDragging, setSlideDragging] = useState(false);

    // const handleSlideDragStart = useCallback<PointerEventHandler>((event) => {
    //     if (!props.isSelected && event.ctrlKey) {
    //         dispatch(addToSlideSelection, props.slide.id)
    //         return
    //     }
    //     dispatch(selectOneSlide, props.slide.id)

    //     if (!dragSlideRef.current) return
    //     const dragElementRect = dragSlideRef.current?.getBoundingClientRect();
    //     startPointerPosInsideSlide.current = {
    //         x: dragElementRect.left - event.pageX,
    //         y: dragElementRect.top - event.pageY
    //     }

    //     console.log('start')
    //     setSlideDragging(true)
    // }, [])

    // const handleSlideDragMove = useCallback((event: PointerEvent) => {
    //     if (!dragSlideRef.current || !startPointerPosInsideSlide.current) return

    //     const dragElementRect = dragSlideRef.current?.getBoundingClientRect();

    //     let offset: Position = {
    //         x: 0,
    //         y: event.clientY - dragElementRect.top - startPointerPosInsideSlide.current.y
    //     }

    //     dragSlideRef.current.style.top = offset.y + 'px' 

    //     const deeperElementUnderItem = document.elementFromPoint(
    //         event.clientX - offset.x + dragElementRect.width / 2,
    //         event.clientY - offset.y + dragElementRect.height / 2,
    //     )
    //     const closestSlidePreviewElement = deeperElementUnderItem?.closest('[slidePreviewContainer]')
    //     if (!closestSlidePreviewElement) return
    //     console.log(closestSlidePreviewElement)
    // }, [])

    // const handleSlideDragEnd = useCallback(() => {
    //     console.log('end')
    //     setSlideDragging(false)
    //     // dispatch(selectOneSlide, props.slide.id)
    // }, [])

    // useEffect(() => {
    //     if (slideDragging) {
    //         window.addEventListener('pointermove', handleSlideDragMove)
    //         window.addEventListener('pointerup', handleSlideDragEnd)
    //     }
    //     return () => {
    //         window.removeEventListener('pointermove', handleSlideDragMove)
    //         window.removeEventListener('pointerup', handleSlideDragEnd)
    //     }
    // }, [slideDragging, handleSlideDragMove, handleSlideDragEnd])

    const dragStartHandler = (event) => {
        console.log('drag')
        console.log(props.id)
        setCurrentSlideId(props.id)

    }

    const dragOverHandler = (event: DragEvent) => {
        event.preventDefault()
    }

    const dropHandler = (event) => {
        event.preventDefault()
        console.log('drop')
        console.log(props.id)
        const payload: {dragSlideId: string, dropSlideId: string} = {
            dragSlideId: currentSlideId,
            dropSlideId: props.id
        }
        console.log(payload)
        dispatch(setSlidesOrder, payload)

    }

    return (
        <div
            onDragStart={(event)=>dragStartHandler(event)}
            // onDragLeave={(event)=>dragEndHandler(event)}
            // onDragEnd={(event)=>dragEndHandler(event)}
            onDragOver={(event)=>dragOverHandler(event)}
            onDrop={(event)=>dropHandler(event)}
            draggable={true}
            style={inlineStyles}
            className={styles.slidePreviewContainer}
        >
            <p className={styles.slideIndex}>
                {props.slideNum}
            </p>
            <Slide
                slide={props.slide}
                scale={SLIDE_PREVIEW_SCALE}
            />
            <div className={styles.slidePreviewContainerGuard} />
        </div>
    )
}

export {
    SlidePreview
}