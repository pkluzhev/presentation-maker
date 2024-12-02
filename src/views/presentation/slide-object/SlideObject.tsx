import { CSSProperties, PointerEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { type Position, type Size } from "../../../store/types/PresentationTypes.ts";
import { TextObject } from "../slide-object/text-object/TextObject.tsx";
import { ImageObject } from "../slide-object/image-object/ImageObject.tsx";
import styles from './SlideObject.module.css'

import { dispatch } from "../../../store/editor.ts";

import { slideStart, SLIDE_WIDTH, SLIDE_HEIGHT } from "../../presentation/slide/Slide.tsx";

import { selectOneElement } from "../../../store/selectOneElement";
import { changeSlideObjectPosition } from "../../../store/changeSlideObjectPosition.ts";
import { changeSlideObjectSize } from "../../../store/changeSlideObjectSize.ts";
import { addToElementSelection } from "../../../store/addToElementSelection";

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
    let finalObjectSize: Size = object.size
    let deltaResize: Size = {
        width: 0,
        height: 0
    }

    const [resizingLT, setResizingLT] = useState(false);
    const [resizingLM, setResizingLM] = useState(false);
    const [resizingLB, setResizingLB] = useState(false);
    const [resizingRT, setResizingRT] = useState(false);
    const [resizingRM, setResizingRM] = useState(false);
    const [resizingRB, setResizingRB] = useState(false);
    const [resizingMB, setResizingMB] = useState(false);
    const [resizingMT, setResizingMT] = useState(false);

    const startPos = useRef<Position>()
    const startSize = useRef<Size>()


    const dragElementRef = useRef<HTMLDivElement>(null)
    const startPointerPosInsideElem = useRef<Position>()
    const [dragging, setDragging] = useState(false);
    const handleDragStart = useCallback<PointerEventHandler>((event) => {
        if (!isSelected && event.ctrlKey) {
            dispatch(addToElementSelection, object.id)
            return
        }
        dispatch(selectOneElement, object.id)
        if (!dragElementRef.current) return
        const dragElementRect = dragElementRef.current?.getBoundingClientRect();
        startPointerPosInsideElem.current = {
            x: dragElementRect.left - event.pageX,
            y: dragElementRect.top - event.pageY
        }
        setDragging(true)
    }, [])

    const handleDragMove = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPointerPosInsideElem.current) return
        finalObjectPos.x = event.pageX + startPointerPosInsideElem.current.x - slideStart.x
        finalObjectPos.y = event.pageY + startPointerPosInsideElem.current.y - slideStart.y
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
        setResizingLT(false)
        setResizingLM(false)
        setResizingLB(false)
        setResizingRT(false)
        setResizingRM(false)
        setResizingRB(false)
        setResizingMB(false)
        setResizingMT(false)
        dispatch(changeSlideObjectPosition, finalObjectPos)
    }, [])



    const refResizeLT = useRef<HTMLDivElement>(null)
    const handleResizeStartLT = useCallback<PointerEventHandler>((event) => {
        if (!refResizeLT.current || !dragElementRef.current) return
        startPos.current = {
            x: event.pageX,
            y: event.pageY
        }
        const resizeElementRect = dragElementRef.current?.getBoundingClientRect();
        startSize.current = {
            width: resizeElementRect?.width,
            height: resizeElementRect?.height,
        }
        setResizingLT(true)
    }, [])
    const handleResizeMoveLT = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPos.current || !startSize.current) return
        let endPos: Position = {
            x: event.pageX,
            y: event.pageY
        }
        if (endPos.x < slideStart.x) {
            endPos.x = slideStart.x
        }
        deltaResize.width = endPos.x - startPos.current?.x
        finalObjectSize.width = startSize.current?.width - deltaResize.width
        if (finalObjectSize.width < 24) {
            finalObjectSize.width = 24
            deltaResize.width = startSize.current?.width - finalObjectSize.width
        }
        if (endPos.y < slideStart.y) {
            endPos.y = slideStart.y
        }
        deltaResize.height = endPos.y - startPos.current?.y
        finalObjectSize.height = startSize.current?.height - deltaResize.height
        if (finalObjectSize.height < 24) {
            finalObjectSize.height = 24
            deltaResize.height = startSize.current?.height - finalObjectSize.height
        }
        finalObjectPos.x = startPos.current?.x - slideStart.x + deltaResize.width
        finalObjectPos.y = startPos.current?.y - slideStart.y + deltaResize.height
        dragElementRef.current.style.top = finalObjectPos.y + 'px'
        dragElementRef.current.style.left = finalObjectPos.x + 'px'
        dragElementRef.current.style.width = finalObjectSize.width + 'px'
        dragElementRef.current.style.height = finalObjectSize.height + 'px'
    }, [])
    const handleResizeEndLT = useCallback(() => {
        setResizingLT(false)
        setDragging(false)
        dispatch(changeSlideObjectSize, finalObjectSize)
        dispatch(changeSlideObjectPosition, finalObjectPos)
    }, [])



    const refResizeLM = useRef<HTMLDivElement>(null)
    const handleResizeStartLM = useCallback<PointerEventHandler>((event) => {
        if (!refResizeLM.current || !dragElementRef.current) return
        startPos.current = {
            x: event.pageX,
            y: event.pageY
        }
        const resizeElementRect = dragElementRef.current?.getBoundingClientRect();
        startSize.current = {
            width: resizeElementRect?.width,
            height: resizeElementRect?.height,
        }
        setResizingLM(true)
    }, [])
    const handleResizeMoveLM = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPos.current || !startSize.current) return

        let endPos: Position = {
            x: event.pageX,
            y: event.pageY
        }
        if (endPos.x < slideStart.x) {
            endPos.x = slideStart.x
        }
        deltaResize.width = endPos.x - startPos.current?.x
        finalObjectSize.width = startSize.current?.width - deltaResize.width
        if (finalObjectSize.width < 24) {
            finalObjectSize.width = 24
            deltaResize.width = startSize.current?.width - finalObjectSize.width
        }
        finalObjectPos.x = startPos.current?.x - slideStart.x + deltaResize.width
        dragElementRef.current.style.left = finalObjectPos.x + 'px'
        dragElementRef.current.style.width = finalObjectSize.width + 'px'
    }, [])
    const handleResizeEndLM = useCallback(() => {
        setResizingLM(false)
        setDragging(false)
        dispatch(changeSlideObjectSize, finalObjectSize)
        dispatch(changeSlideObjectPosition, finalObjectPos)
    }, [])



    const refResizeLB = useRef<HTMLDivElement>(null)
    const handleResizeStartLB = useCallback<PointerEventHandler>((event) => {
        if (!refResizeLB.current || !dragElementRef.current) return
        startPos.current = {
            x: event.pageX,
            y: event.pageY
        }
        const resizeElementRect = dragElementRef.current?.getBoundingClientRect();
        startSize.current = {
            width: resizeElementRect?.width,
            height: resizeElementRect?.height,
        }
        setResizingLB(true)
    }, [])
    const handleResizeMoveLB = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPos.current || !startSize.current) return

        let endPos: Position = {
            x: event.pageX,
            y: event.pageY
        }
        if (endPos.x < slideStart.x) {
            endPos.x = slideStart.x
        }
        deltaResize.width = endPos.x - startPos.current?.x
        finalObjectSize.width = startSize.current?.width - deltaResize.width
        if (finalObjectSize.width < 24) {
            finalObjectSize.width = 24
            deltaResize.width = startSize.current?.width - finalObjectSize.width
        }
        if (endPos.y > slideStart.y + SLIDE_HEIGHT - 4) {
            endPos.y = slideStart.y + SLIDE_HEIGHT - 4
        }
        deltaResize.height = endPos.y - startPos.current?.y
        finalObjectSize.height = startSize.current?.height + deltaResize.height
        if (finalObjectSize.height < 24) {
            finalObjectSize.height = 24
        }
        finalObjectPos.x = startPos.current?.x - slideStart.x + deltaResize.width
        dragElementRef.current.style.left = finalObjectPos.x + 'px'
        dragElementRef.current.style.width = finalObjectSize.width + 'px'
        dragElementRef.current.style.height = finalObjectSize.height + 'px'
    }, [])
    const handleResizeEndLB = useCallback(() => {
        setResizingLB(false)
        setDragging(false)
        dispatch(changeSlideObjectSize, finalObjectSize)
        dispatch(changeSlideObjectPosition, finalObjectPos)
    }, [])



    const refResizeRT = useRef<HTMLDivElement>(null)
    const handleResizeStartRT = useCallback<PointerEventHandler>((event) => {
        if (!refResizeRT.current || !dragElementRef.current) return
        startPos.current = {
            x: event.pageX,
            y: event.pageY
        }
        const resizeElementRect = dragElementRef.current?.getBoundingClientRect();
        startSize.current = {
            width: resizeElementRect?.width,
            height: resizeElementRect?.height,
        }
        setResizingRT(true)
    }, [])
    const handleResizeMoveRT = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPos.current || !startSize.current) return

        let endPos: Position = {
            x: event.pageX,
            y: event.pageY
        }
        if (endPos.x > slideStart.x + SLIDE_WIDTH - 2) {
            endPos.x = slideStart.x + SLIDE_WIDTH - 2
        }
        deltaResize.width = endPos.x - startPos.current?.x
        if (endPos.y < slideStart.y) {
            endPos.y = slideStart.y
        }
        deltaResize.height = endPos.y - startPos.current?.y
        finalObjectSize.width = startSize.current?.width + deltaResize.width
        if (finalObjectSize.width < 24) {
            finalObjectSize.width = 24
        }
        finalObjectSize.height = startSize.current?.height - deltaResize.height
        if (finalObjectSize.height < 24) {
            finalObjectSize.height = 24
            deltaResize.height = startSize.current?.height - finalObjectSize.height
        }
        finalObjectPos.y = startPos.current?.y - slideStart.y + deltaResize.height
        dragElementRef.current.style.width = finalObjectSize.width + 'px'
        dragElementRef.current.style.top = finalObjectPos.y + 'px'
        dragElementRef.current.style.height = finalObjectSize.height + 'px'
    }, [])
    const handleResizeEndRT = useCallback(() => {
        setResizingRT(false)
        setDragging(false)
        dispatch(changeSlideObjectSize, finalObjectSize)
        dispatch(changeSlideObjectPosition, finalObjectPos)
    }, [])



    const refResizeRM = useRef<HTMLDivElement>(null)
    const handleResizeStartRM = useCallback<PointerEventHandler>((event) => {
        if (!refResizeRM.current || !dragElementRef.current) return
        startPos.current = {
            x: event.pageX,
            y: event.pageY
        }
        const resizeElementRect = dragElementRef.current?.getBoundingClientRect();
        startSize.current = {
            width: resizeElementRect?.width,
            height: resizeElementRect?.height,
        }
        setResizingRM(true)
    }, [])
    const handleResizeMoveRM = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPos.current || !startSize.current) return

        let endPos: Position = {
            x: event.pageX,
            y: event.pageY
        }
        if (endPos.x > slideStart.x + SLIDE_WIDTH - 2) {
            endPos.x = slideStart.x + SLIDE_WIDTH - 2
        }
        deltaResize.width = endPos.x - startPos.current?.x

        finalObjectSize.width = startSize.current?.width + deltaResize.width
        if (finalObjectSize.width < 24) {
            finalObjectSize.width = 24
        }
        dragElementRef.current.style.width = finalObjectSize.width + 'px'
    }, [])
    const handleResizeEndRM = useCallback(() => {
        setResizingRM(false)
        setDragging(false)
        dispatch(changeSlideObjectSize, finalObjectSize)
    }, [])



    const refResizeRB = useRef<HTMLDivElement>(null)
    const handleResizeStartRB = useCallback<PointerEventHandler>((event) => {
        if (!refResizeRB.current || !dragElementRef.current) return
        startPos.current = {
            x: event.pageX,
            y: event.pageY
        }
        const resizeElementRect = dragElementRef.current?.getBoundingClientRect();
        startSize.current = {
            width: resizeElementRect?.width,
            height: resizeElementRect?.height,
        }
        setResizingRB(true)
    }, [])
    const handleResizeMoveRB = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPos.current || !startSize.current) return

        let endPos: Position = {
            x: event.pageX,
            y: event.pageY
        }
        if (endPos.x > slideStart.x + SLIDE_WIDTH - 2) {
            endPos.x = slideStart.x + SLIDE_WIDTH - 2
        }
        deltaResize.width = endPos.x - startPos.current?.x
        if (endPos.y > slideStart.y + SLIDE_HEIGHT - 4) {
            endPos.y = slideStart.y + SLIDE_HEIGHT - 4
        }
        deltaResize.height = endPos.y - startPos.current?.y
        finalObjectSize.width = startSize.current?.width + deltaResize.width
        if (finalObjectSize.width < 24) {
            finalObjectSize.width = 24
        }
        finalObjectSize.height = startSize.current?.height + deltaResize.height
        if (finalObjectSize.height < 24) {
            finalObjectSize.height = 24
        }
        dragElementRef.current.style.width = finalObjectSize.width + 'px'
        dragElementRef.current.style.height = finalObjectSize.height + 'px'
    }, [])
    const handleResizeEndRB = useCallback(() => {
        setResizingRB(false)
        setDragging(false)
        dispatch(changeSlideObjectSize, finalObjectSize)
    }, [])



    const refResizeMT = useRef<HTMLDivElement>(null)
    const handleResizeStartMT = useCallback<PointerEventHandler>((event) => {
        if (!refResizeMT.current || !dragElementRef.current) return
        startPos.current = {
            x: event.pageX,
            y: event.pageY
        }
        const resizeElementRect = dragElementRef.current?.getBoundingClientRect();
        startSize.current = {
            width: resizeElementRect?.width,
            height: resizeElementRect?.height,
        }
        setResizingMT(true)
    }, [])
    const handleResizeMoveMT = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPos.current || !startSize.current) return

        let endPos: Position = {
            x: event.pageX,
            y: event.pageY
        }
        if (endPos.y < slideStart.y) {
            endPos.y = slideStart.y
        }
        deltaResize.height = endPos.y - startPos.current?.y
        finalObjectSize.height = startSize.current?.height - deltaResize.height
        if (finalObjectSize.height < 24) {
            finalObjectSize.height = 24
            deltaResize.height = startSize.current?.height - finalObjectSize.height
        }
        finalObjectPos.y = startPos.current?.y - slideStart.y + deltaResize.height
        dragElementRef.current.style.top = finalObjectPos.y + 'px'
        dragElementRef.current.style.height = finalObjectSize.height + 'px'
    }, [])
    const handleResizeEndMT = useCallback(() => {
        setResizingMT(false)
        setDragging(false)
        dispatch(changeSlideObjectSize, finalObjectSize)
        dispatch(changeSlideObjectPosition, finalObjectPos)
    }, [])



    const refResizeMB = useRef<HTMLDivElement>(null)
    const handleResizeStartMB = useCallback<PointerEventHandler>((event) => {
        if (!refResizeMB.current || !dragElementRef.current) return
        startPos.current = {
            x: event.pageX,
            y: event.pageY
        }
        const resizeElementRect = dragElementRef.current?.getBoundingClientRect();
        startSize.current = {
            width: resizeElementRect?.width,
            height: resizeElementRect?.height,
        }
        setResizingMB(true)
    }, [])
    const handleResizeMoveMB = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPos.current || !startSize.current) return

        let endPos: Position = {
            x: event.pageX,
            y: event.pageY
        }
        if (endPos.y > slideStart.y + SLIDE_HEIGHT - 4) {
            endPos.y = slideStart.y + SLIDE_HEIGHT - 4
        }
        deltaResize.height = endPos.y - startPos.current?.y

        finalObjectSize.height = startSize.current?.height + deltaResize.height
        if (finalObjectSize.height < 24) {
            finalObjectSize.height = 24
        }
        dragElementRef.current.style.height = finalObjectSize.height + 'px'
    }, [])
    const handleResizeEndMB = useCallback(() => {
        setResizingMB(false)
        setDragging(false)
        dispatch(changeSlideObjectSize, finalObjectSize)
    }, [])


    useEffect(() => {
        if (resizingLT) {
            window.addEventListener('pointermove', handleResizeMoveLT)
            window.addEventListener('pointerup', handleResizeEndLT)
            return () => {
                window.removeEventListener('pointermove', handleResizeMoveLT)
                window.removeEventListener('pointerup', handleResizeEndLT)
            }
        }
        if (resizingLM) {
            window.addEventListener('pointermove', handleResizeMoveLM)
            window.addEventListener('pointerup', handleResizeEndLM)
            return () => {
                window.removeEventListener('pointermove', handleResizeMoveLM)
                window.removeEventListener('pointerup', handleResizeEndLM)
            }
        }
        if (resizingLB) {
            window.addEventListener('pointermove', handleResizeMoveLB)
            window.addEventListener('pointerup', handleResizeEndLB)
            return () => {
                window.removeEventListener('pointermove', handleResizeMoveLB)
                window.removeEventListener('pointerup', handleResizeEndLB)
            }
        }
        if (resizingRT) {
            window.addEventListener('pointermove', handleResizeMoveRT)
            window.addEventListener('pointerup', handleResizeEndRT)
            return () => {
                window.removeEventListener('pointermove', handleResizeMoveRT)
                window.removeEventListener('pointerup', handleResizeEndRT)
            }
        }
        if (resizingRM) {
            window.addEventListener('pointermove', handleResizeMoveRM)
            window.addEventListener('pointerup', handleResizeEndRM)
            return () => {
                window.removeEventListener('pointermove', handleResizeMoveRM)
                window.removeEventListener('pointerup', handleResizeEndRM)
            }
        }
        if (resizingRB) {
            window.addEventListener('pointermove', handleResizeMoveRB)
            window.addEventListener('pointerup', handleResizeEndRB)
            return () => {
                window.removeEventListener('pointermove', handleResizeMoveRB)
                window.removeEventListener('pointerup', handleResizeEndRB)
            }
        }
        if (resizingMT) {
            window.addEventListener('pointermove', handleResizeMoveMT)
            window.addEventListener('pointerup', handleResizeEndMT)
            return () => {
                window.removeEventListener('pointermove', handleResizeMoveMT)
                window.removeEventListener('pointerup', handleResizeEndMT)
            }
        }
        if (resizingMB) {
            window.addEventListener('pointermove', handleResizeMoveMB)
            window.addEventListener('pointerup', handleResizeEndMB)
            return () => {
                window.removeEventListener('pointermove', handleResizeMoveMB)
                window.removeEventListener('pointerup', handleResizeEndMB)
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
    }, [resizingLT, resizingLM, resizingLB, resizingRT, resizingRM, resizingRB, resizingMB, resizingMT,
        handleResizeMoveLT, handleResizeEndLT,
        handleResizeMoveLM, handleResizeEndLM,
        handleResizeMoveLB, handleResizeEndLB,
        handleResizeMoveRT, handleResizeEndRT,
        handleResizeMoveRM, handleResizeEndRM,
        handleResizeMoveRB, handleResizeEndRB,
        handleResizeMoveMB, handleResizeEndMB,
        handleResizeMoveMT, handleResizeEndMT,
        dragging, handleDragMove, handleDragEnd])

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
                            <div ref={refResizeLT}
                                onPointerDown={handleResizeStartLT}
                                className={styles.resizePointLT}
                            />
                            <div ref={refResizeLM}
                                onPointerDown={handleResizeStartLM}
                                className={styles.resizePointLM}
                            />
                            <div ref={refResizeLB}
                                onPointerDown={handleResizeStartLB}
                                className={styles.resizePointLB}
                            />
                            <div ref={refResizeRT}
                                onPointerDown={handleResizeStartRT}
                                className={styles.resizePointRT}
                            />
                            <div ref={refResizeRM}
                                onPointerDown={handleResizeStartRM}
                                className={styles.resizePointRM}
                            />
                            <div ref={refResizeRB}
                                onPointerDown={handleResizeStartRB}
                                className={styles.resizePointRB}
                            />
                            <div ref={refResizeMT}
                                onPointerDown={handleResizeStartMT}
                                className={styles.resizePointMT}
                            />
                            <div ref={refResizeMB}
                                onPointerDown={handleResizeStartMB}
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
                            <div ref={refResizeLT}
                                onPointerDown={handleResizeStartLT}
                                className={styles.resizePointLT}
                            />
                            <div ref={refResizeLM}
                                onPointerDown={handleResizeStartLM}
                                className={styles.resizePointLM}
                            />
                            <div ref={refResizeLB}
                                onPointerDown={handleResizeStartLB}
                                className={styles.resizePointLB}
                            />
                            <div ref={refResizeRT}
                                onPointerDown={handleResizeStartRT}
                                className={styles.resizePointRT}
                            />
                            <div ref={refResizeRM}
                                onPointerDown={handleResizeStartRM}
                                className={styles.resizePointRM}
                            />
                            <div ref={refResizeRB}
                                onPointerDown={handleResizeStartRB}
                                className={styles.resizePointRB}
                            />
                            <div ref={refResizeMT}
                                onPointerDown={handleResizeStartMT}
                                className={styles.resizePointMT}
                            />
                            <div ref={refResizeMB}
                                onPointerDown={handleResizeStartMB}
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