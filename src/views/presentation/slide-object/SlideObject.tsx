import { CSSProperties, PointerEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { type Position, type Size, type SlideObjectProperties } from "../../../store/types/PresentationTypes.ts";
import { TextObject } from "../slide-object/text-object/TextObject.tsx";
import { ImageObject } from "../slide-object/image-object/ImageObject.tsx";
import styles from './SlideObject.module.css'
import { slideStart, SLIDE_WIDTH, SLIDE_HEIGHT } from "../../presentation/slide/Slide.tsx";
import { useAppActions } from "../../hooks/useAppActions.ts";

type SlideObjectProps = {
    object: TextObject | ImageObject,
    scale: number,
    isSelected?: boolean
}

type ResizeAttribute = null | 'LT' | 'LM' | 'LB' | 'RT' | 'RM' | 'RB' | 'MB' | 'MT'

function SlideObject({ object, scale, isSelected }: SlideObjectProps) {
    const { selectOneElement } = useAppActions()
    const { addToElementSelection } = useAppActions()

    // const { changeSlideObjectPosition } = useAppActions()
    // const { changeSlideObjectSize } = useAppActions()

    const { changeSlideObjectPositionAndSize } = useAppActions()


    const slideObjectStyles: CSSProperties = {
        left: `${object.position.x * scale}px`,
        top: `${object.position.y * scale}px`,
        width: `${object.size.width * scale}px`,
        height: `${object.size.height * scale}px`,
    }

    let elementFinalData: SlideObjectProperties = {
        id: object.id,
        position: object.position,
        size: object.size
    }
    // let finalObjectPos: Position = object.position
    // let finalObjectSize: Size = object.size

    let delta: Position = {
        x: 0,
        y: 0
    }

    const dragElementRef = useRef<HTMLDivElement>(null)
    const startPointerPosInsideElem = useRef<Position>()
    const [dragging, setDragging] = useState(false);

    const [resizingType, setResizingType] = useState<ResizeAttribute>(null);

    const startPos = useRef<Position>()
    const startSize = useRef<Size>()
    const startPosition = useRef<Position>()
    const resizeAttribute = useRef<ResizeAttribute>()

    const handleDragStart = useCallback<PointerEventHandler>((event) => {
        if (!isSelected && event.ctrlKey) {
            addToElementSelection(object.id)
            return
        }
        selectOneElement(object.id)
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
        elementFinalData.position.x = event.pageX + startPointerPosInsideElem.current.x - slideStart.x
        elementFinalData.position.y = event.pageY + startPointerPosInsideElem.current.y - slideStart.y
        dragElementRef.current.style.left = elementFinalData.position.x + 'px'
        dragElementRef.current.style.top = elementFinalData.position.y + 'px'
        if (elementFinalData.position.x <= 0) {
            dragElementRef.current.style.left = 0 + 'px'
            elementFinalData.position.x = 0
        }
        if (elementFinalData.position.x + object.size.width >= SLIDE_WIDTH) {
            dragElementRef.current.style.left = (SLIDE_WIDTH - object.size.width - 2) + 'px'
            elementFinalData.position.x = SLIDE_WIDTH - object.size.width - 2
        }
        if (elementFinalData.position.y <= 0) {
            dragElementRef.current.style.top = 0 + 'px'
            elementFinalData.position.y = 0
        }
        if (elementFinalData.position.y + object.size.height >= SLIDE_HEIGHT - 2) {
            dragElementRef.current.style.top = (SLIDE_HEIGHT - object.size.height - 2) + 'px'
            elementFinalData.position.y = SLIDE_HEIGHT - object.size.height - 2
        }
    }, [])
    const handleDragEnd = useCallback(() => {
        setDragging(false)
        changeSlideObjectPositionAndSize(elementFinalData)
        // changeSlideObjectPosition(finalObjectPos)
    }, [])

    const handleResizeStart = useCallback((event: any, type: ResizeAttribute) => {
        if (!type || !dragElementRef.current) return
        startPos.current = {
            x: event.pageX,
            y: event.pageY
        }
        const resizeElementRect = dragElementRef.current.getBoundingClientRect();
        startSize.current = {
            width: resizeElementRect?.width,
            height: resizeElementRect?.height,
        }
        startPosition.current = {
            x: resizeElementRect?.x,
            y: resizeElementRect?.y,
        }
        resizeAttribute.current = type
        setResizingType(type)
    }, [])

    const handleResizeMove = useCallback((event: PointerEvent) => {
        if (!dragElementRef.current || !startPos.current || !startSize.current || !startPosition.current) return
        let endPos: Position = {
            x: event.pageX,
            y: event.pageY
        }
        if (endPos.x < slideStart.x) {
            endPos.x = slideStart.x
        }
        if (endPos.x > slideStart.x + SLIDE_WIDTH) {
            endPos.x = slideStart.x + SLIDE_WIDTH
        }
        if (endPos.y < slideStart.y) {
            endPos.y = slideStart.y
        }
        if (endPos.y > slideStart.y + SLIDE_HEIGHT) {
            endPos.y = slideStart.y + SLIDE_HEIGHT
        }
        delta.x = endPos.x - startPos.current.x
        delta.y = endPos.y - startPos.current.y
        switch (resizeAttribute.current) {
            case 'RB':
                elementFinalData.size.width = startSize.current.width + delta.x
                elementFinalData.size.height = startSize.current.height + delta.y
                if (elementFinalData.size.width < 24) {
                    elementFinalData.size.width = 24
                }
                if (elementFinalData.size.height < 24) {
                    elementFinalData.size.height = 24
                }
                break
            case 'RM':
                elementFinalData.size.width = startSize.current.width + delta.x
                if (elementFinalData.size.width < 24) {
                    elementFinalData.size.width = 24
                }
                break
            case 'RT':
                elementFinalData.size.width = startSize.current.width + delta.x
                elementFinalData.size.height = startSize.current.height - delta.y
                if (elementFinalData.size.width < 24) {
                    elementFinalData.size.width = 24
                    delta.x = startPos.current.x - elementFinalData.size.width
                }
                if (elementFinalData.size.height < 24) {
                    elementFinalData.size.height = 24
                    elementFinalData.position.y = startPosition.current?.y - slideStart.y + startSize.current.height - elementFinalData.size.height
                } else {
                    elementFinalData.position.y = startPosition.current?.y - slideStart.y + delta.y
                }
                break
            case 'MT':
                elementFinalData.size.height = startSize.current.height - delta.y
                if (elementFinalData.size.height < 24) {
                    elementFinalData.size.height = 24
                    elementFinalData.position.y = startPosition.current?.y - slideStart.y + startSize.current.height - elementFinalData.size.height
                } else {
                    elementFinalData.position.y = startPosition.current?.y - slideStart.y + delta.y
                }
                break
            case 'LT':
                elementFinalData.size.width = startSize.current.width - delta.x
                elementFinalData.size.height = startSize.current.height - delta.y
                if (elementFinalData.size.width < 24) {
                    elementFinalData.size.width = 24
                    elementFinalData.position.x = startPosition.current?.x - slideStart.x + startSize.current.width - elementFinalData.size.width
                } else {
                    elementFinalData.position.x = startPosition.current?.x - slideStart.x + delta.x
                }
                if (elementFinalData.size.height < 24) {
                    elementFinalData.size.height = 24
                    elementFinalData.position.y = startPosition.current?.y - slideStart.y + startSize.current.height - elementFinalData.size.height
                } else {
                    elementFinalData.position.y = startPosition.current?.y - slideStart.y + delta.y
                }
                break
            case 'LM':
                elementFinalData.size.width = startSize.current.width - delta.x
                if (elementFinalData.size.width < 24) {
                    elementFinalData.size.width = 24
                    elementFinalData.position.x = startPosition.current?.x - slideStart.x + startSize.current.width - elementFinalData.size.width
                } else {
                    elementFinalData.position.x = startPosition.current?.x - slideStart.x + delta.x
                }
                break
            case 'LB':
                elementFinalData.size.width = startSize.current.width - delta.x
                elementFinalData.size.height = startSize.current.height + delta.y
                if (elementFinalData.size.width < 24) {
                    elementFinalData.size.width = 24
                    elementFinalData.position.x = startPosition.current?.x - slideStart.x + startSize.current.width - elementFinalData.size.width
                } else {
                    elementFinalData.position.x = startPosition.current?.x - slideStart.x + delta.x
                }
                if (elementFinalData.size.height < 24) {
                    elementFinalData.size.height = 24
                }
                break
            case 'MB':
                elementFinalData.size.height = startSize.current.height + delta.y
                if (elementFinalData.size.height < 24) {
                    elementFinalData.size.height = 24
                }
                break
            default:
                break
        }
        dragElementRef.current.style.top = elementFinalData.position.y + 'px'
        dragElementRef.current.style.left = elementFinalData.position.x + 'px'
        dragElementRef.current.style.width = elementFinalData.size.width + 'px'
        dragElementRef.current.style.height = elementFinalData.size.height + 'px'
    }, [])
    const handleResizeEnd = useCallback(() => {
        resizeAttribute.current = null
        setResizingType(null)
        setDragging(false)
        changeSlideObjectPositionAndSize(elementFinalData)
        // changeSlideObjectSize(finalObjectSize)
        // changeSlideObjectPosition(finalObjectPos)
    }, [])

    useEffect(() => {
        if (resizingType !== null) {
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
    }, [dragging, handleDragMove, handleDragEnd, handleResizeMove, handleResizeEnd,])

    if (isSelected && scale === 1) {
        slideObjectStyles.border = "solid 1px #4071db"
    }
    let slideElement
    switch (object.type) {
        case "text":
            slideElement = <TextObject
                value={object.value}
                fontFamily={object.fontFamily}
                fontSize={object.fontSize * scale}
                fontWeight={object.fontWeight}
                fontColor={object.fontColor}
            />
            break
        case "image":
            slideElement = <ImageObject src={object.src} />
            break
        default:
            throw new Error(`Unknown slide-object type: ${object}`)
    }
    return (
        <div
            ref={dragElementRef}
            onPointerDown={handleDragStart}
            style={slideObjectStyles}
            className={styles.slideObject}
        >
            {slideElement}
            {(isSelected && scale === 1) &&
                <>
                    <div
                        onPointerDown={(e) => handleResizeStart(e, 'LT')}
                        className={styles.resizePointLT}
                    />
                    <div
                        onPointerDown={(e) => handleResizeStart(e, 'LM')}
                        className={styles.resizePointLM}
                    />
                    <div
                        onPointerDown={(e) => handleResizeStart(e, 'LB')}
                        className={styles.resizePointLB}
                    />
                    <div
                        onPointerDown={(e) => handleResizeStart(e, 'RT')}
                        className={styles.resizePointRT}
                    />
                    <div
                        onPointerDown={(e) => handleResizeStart(e, 'RM')}
                        className={styles.resizePointRM}
                    />
                    <div
                        onPointerDown={(e) => handleResizeStart(e, 'RB')}
                        className={styles.resizePointRB}
                    />
                    <div
                        onPointerDown={(e) => handleResizeStart(e, 'MT')}
                        className={styles.resizePointMT}
                    />
                    <div
                        onPointerDown={(e) => handleResizeStart(e, 'MB')}
                        className={styles.resizePointMB}
                    />
                </>
            }
        </div>
    )
}

export {
    SlideObject,
}