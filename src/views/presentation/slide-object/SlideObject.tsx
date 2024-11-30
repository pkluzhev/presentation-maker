import { CSSProperties, PointerEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { TextObject } from "../slide-object/text-object/TextObject.tsx";
import { ImageObject } from "../slide-object/image-object/ImageObject.tsx";
import { dispatch } from "../../../store/editor.ts";
import { clearElementSelection, selectOneElement } from "../../../store/setSelection.ts";
import { changeSlideObjectPosition } from "../../../store/changeSlideObjectPosition.ts";
import { addToElementSelection } from "../../../store/setSelection.ts";
import { slideStart, SLIDE_WIDTH, SLIDE_HEIGHT } from "../../presentation/slide/Slide.tsx";
import styles from './SlideObject.module.css'
import { Position } from "../../../store/types/PresentationTypes.ts";

type SlideObjectProps = {
    object: TextObject | ImageObject,
    scale: number,
    isSelected?: boolean
}

function SlideObject({ object, scale, isSelected }: SlideObjectProps) {
    const slideObjectStyles: CSSProperties = {
        left: `${object.position.x * scale}px`,
        top: `${object.position.y * scale}px`,
        width: `${object.size.width * scale}px`,
        height: `${object.size.height * scale}px`,
    }

    // let deltaObjectPos: Position = {
    //     x: 0,
    //     y: 0,
    //     angle: 0
    // }

    let finalObjectPos: Position = {
        x: 0,
        y: 0,
        angle: 0
    }

    const dragElementRef = useRef<HTMLDivElement>(null)
    const startPointerPos = useRef<{ top: number, left: number }>()
    const [dragging, setDragging] = useState(false);

    const handleDragStart = useCallback<PointerEventHandler>((event) => {
        if (!isSelected && event.ctrlKey) {
            dispatch(addToElementSelection, object.id)
            return
        }
        dispatch(clearElementSelection)
        dispatch(selectOneElement, object.id)

        if (!dragElementRef.current) return
        const dragElementRect = dragElementRef.current?.getBoundingClientRect();
        startPointerPos.current = {
            left: dragElementRect.left - event.pageX,
            top: dragElementRect.top - event.pageY
        }
        setDragging(true)
    }, [])

    const handleDragMove = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPointerPos.current) return

        finalObjectPos.x = event.pageX + startPointerPos.current.left - slideStart.x
        finalObjectPos.y = event.pageY + startPointerPos.current.top - slideStart.y

        dragElementRef.current.style.left = finalObjectPos.x + 'px'
        dragElementRef.current.style.top = finalObjectPos.y + 'px'

        if (finalObjectPos.x <= 0) {
            dragElementRef.current.style.left = 0 + 'px'
            finalObjectPos.x = 0
        }
        if (finalObjectPos.x + object.size.width >= SLIDE_WIDTH) {
            dragElementRef.current.style.left = (SLIDE_WIDTH - object.size.width - 2) + 'px'
            finalObjectPos.x = SLIDE_WIDTH - object.size.width - 2
        }
        if (finalObjectPos.y <= 0) {
            dragElementRef.current.style.top = 0 + 'px'
            finalObjectPos.y = 0
        }
        if (finalObjectPos.y + object.size.height >= SLIDE_HEIGHT - 2) {
            dragElementRef.current.style.top = (SLIDE_HEIGHT - object.size.height - 2) + 'px'
            finalObjectPos.y = SLIDE_HEIGHT - object.size.height - 2
        }
    }, [])

    const handleDragEnd = useCallback(() => {
        setDragging(false)
        dispatch(changeSlideObjectPosition, finalObjectPos)
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


    if (isSelected) {
        slideObjectStyles.border = "solid 1px #4071db"
    }
    switch (object.type) {
        case "text":
            return (
                <div
                    ref={dragElementRef}
                    onPointerDown={handleDragStart}
                    style={slideObjectStyles}
                    className={styles.slideObject}
                >
                    <TextObject
                        value={object.value}
                        fontFamily={object.fontFamily}
                        fontSize={object.fontSize * scale}
                        fontWeight={object.fontWeight}
                        fontColor={object.fontColor}
                    />
                    {isSelected &&
                        <>
                            <div className={styles.resizePointLT}></div>
                            <div className={styles.resizePointLM}></div>
                            <div className={styles.resizePointLB}></div>

                            <div className={styles.resizePointRT}></div>
                            <div className={styles.resizePointRM}></div>
                            <div className={styles.resizePointRB}></div>

                            <div className={styles.resizePointMT}></div>
                            <div className={styles.resizePointMB}></div>
                        </>
                    }
                </div>
            )
        case "image":
            return (
                <div
                    ref={dragElementRef}
                    onPointerDown={handleDragStart}
                    style={slideObjectStyles}
                    className={styles.slideObject}
                >
                    <ImageObject src={object.src} />
                    {isSelected &&
                        <>
                            <div className={styles.resizePointLT}></div>
                            <div className={styles.resizePointLM}></div>
                            <div className={styles.resizePointLB}></div>

                            <div className={styles.resizePointRT}></div>
                            <div className={styles.resizePointRM}></div>
                            <div className={styles.resizePointRB}></div>

                            <div className={styles.resizePointMT}></div>
                            <div className={styles.resizePointMB}></div>
                        </>
                    }
                </div>
            )
        default:
            throw new Error(`Unknown slide-object type: ${object}`)
    }
}

export {
    SlideObject
}