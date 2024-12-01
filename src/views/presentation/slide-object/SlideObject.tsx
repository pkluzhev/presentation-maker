import { CSSProperties, PointerEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { TextObject } from "../slide-object/text-object/TextObject.tsx";
import { ImageObject } from "../slide-object/image-object/ImageObject.tsx";
import { dispatch } from "../../../store/editor.ts";
import { selectOneElement } from "../../../store/setSelection.ts";
import { changeSlideObjectPosition } from "../../../store/changeSlideObjectPosition.ts";
import { changeSlideObjectSize } from "../../../store/changeSlideObjectSize.ts";
import { addToElementSelection } from "../../../store/setSelection.ts";
import { slideStart, SLIDE_WIDTH, SLIDE_HEIGHT } from "../../presentation/slide/Slide.tsx";
import styles from './SlideObject.module.css'
import { type Position, type Size } from "../../../store/types/PresentationTypes.ts";
// import { ResizePointMB } from "./resize-points/ResizePointMB.tsx";



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

    let finalObjectPos: Position = object.position
    let deltaResize: Size = {
        width: 0,
        height: 0
    }
    let finalObjectSize: Size = object.size

    const dragElementRef = useRef<HTMLDivElement>(null)
    const startPointerPosInsideElem = useRef<{ left: number, top: number }>()
    const [dragging, setDragging] = useState(false);
    const handleDragStart = useCallback<PointerEventHandler>((event) => {
        if (!isSelected && event.ctrlKey) {
            dispatch(addToElementSelection, object.id)
            return
        }
        dispatch(selectOneElement, object.id)
        if (!dragElementRef.current || resizing) return
        const dragElementRect = dragElementRef.current?.getBoundingClientRect();
        startPointerPosInsideElem.current = {
            left: dragElementRect.left - event.pageX,
            top: dragElementRect.top - event.pageY
        }
        setDragging(true)
    }, [])

    const handleDragMove = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPointerPosInsideElem.current) return
        finalObjectPos.x = event.pageX + startPointerPosInsideElem.current.left - slideStart.x
        finalObjectPos.y = event.pageY + startPointerPosInsideElem.current.top - slideStart.y
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
        setResizing(false)
        dispatch(changeSlideObjectPosition, finalObjectPos)
    }, [])


    const refResizeMB = useRef<HTMLDivElement>(null)
    const startPos = useRef<{ left: number, top: number }>()
    const startSize = useRef<{ width: number, height: number }>()
    const [resizing, setResizing] = useState(false);
    const handleResizeStart = useCallback<PointerEventHandler>((event) => {
        if (!refResizeMB.current || !dragElementRef.current) return
        startPos.current = {
            left: event.pageX,
            top: event.pageY
        }
        const resizeElementRect = dragElementRef.current?.getBoundingClientRect();
        startSize.current = {
            width: resizeElementRect?.width,
            height: resizeElementRect?.height,
        }
        setResizing(true)
    }, [])
    const handleResizeMove = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPos.current || !startSize.current) return
        deltaResize.height = event.pageY - startPos.current?.top
        finalObjectSize.height = startSize.current?.height + deltaResize.height
        if (finalObjectSize.height < 24) {
            finalObjectSize.height = 24
        }
        dragElementRef.current.style.height = finalObjectSize.height + 'px'
    }, [])
    const handleResizeEnd = useCallback(() => {
        setResizing(false)
        setDragging(false)
        dispatch(changeSlideObjectSize, finalObjectSize)
    }, [])


    useEffect(() => {
        if (resizing) {
            window.addEventListener('pointermove', handleResizeMove)
            window.addEventListener('pointerup', handleResizeEnd)
            return () => {
                window.removeEventListener('pointermove', handleResizeMove)
                window.removeEventListener('pointerup', handleResizeEnd)
            }
        }
        if (dragging) {
            window.addEventListener('pointermove', handleDragMove)
            window.addEventListener('pointerup', handleDragEnd)
            return () => {
                window.removeEventListener('pointermove', handleDragMove)
                window.removeEventListener('pointerup', handleDragEnd)
            }
        }
    }, [resizing, handleResizeMove, handleResizeEnd, dragging, handleDragMove, handleDragEnd])

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
                            <div ref={refResizeMB}
                                onPointerDown={handleResizeStart}
                                className={styles.resizePointMB}
                            />
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
                            <div ref={refResizeMB}
                                onPointerDown={handleResizeStart}
                                className={styles.resizePointMB}
                            />
                        </>
                    }
                </div>
            )
        default:
            throw new Error(`Unknown slide-object type: ${object}`)
    }
}

export {
    SlideObject,
}