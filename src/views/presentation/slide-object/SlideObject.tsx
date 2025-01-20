import { CSSProperties, RefObject } from "react";
import { type Position } from "../../../store/types/PresentationTypes.ts";
import { TextObject } from "../slide-object/text-object/TextObject.tsx";
import { ImageObject } from "../slide-object/image-object/ImageObject.tsx";
import styles from './SlideObject.module.css'
import { useDragAndDrop } from "../../hooks/useDragAndDrop.ts";

type SlideObjectProps = {
    object: TextObject | ImageObject,
    scale: number,
    isSelected: boolean,
    slideStart: RefObject<Position>,
    alignmentsRef: RefObject<{ objectId: string, x: number, y: number, width: number, height: number }[]>
}

function SlideObject({ object, scale, isSelected, slideStart, alignmentsRef }: SlideObjectProps) {
    const {
        dragElementRef,
        verticalCenterAlignment,
        objectVerticalAlignment,
        objectHorizontalAlignment,
        objectVerticalCenterAlignment,
        objectHorizontalCenterAlignment,
        verticalAlignPos,
        horizontalAlignPos,
        verticalCenterObjectAlignPos,
        horizontalCenterObjectAlignPos,
        handleDragStart,
        handleResizeStart,
    } = useDragAndDrop(object, isSelected, slideStart, alignmentsRef)

    const slideObjectStyles: CSSProperties = {
        left: `${object.position.x * scale}px`,
        top: `${object.position.y * scale}px`,
        width: `${object.size.width * scale}px`,
        height: `${object.size.height * scale}px`,
    }

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
                textAlign={object.textAlign}
                isSelected={isSelected}
                id={object.id}
            />
            break
        case "image":
            slideElement = <ImageObject
             src={object.src}
             scale={object.scale} />
            break
        default:
            throw new Error(`Unknown slide-object type: ${object}`)
    }
    return (
        <div>
            {verticalCenterAlignment &&
                <div className={styles.verticalCenterLine}></div>
            }
            {objectVerticalAlignment &&
                <div style={verticalAlignPos} className={styles.verticalLine}></div>
            }
            {objectHorizontalAlignment &&
                <div style={horizontalAlignPos} className={styles.horizontalLine}></div>
            }
            {objectVerticalCenterAlignment &&
                <div style={verticalCenterObjectAlignPos} className={styles.verticalObjectCenterLine}></div>
            }
            {objectHorizontalCenterAlignment &&
                <div style={horizontalCenterObjectAlignPos} className={styles.horizontalObjectCenterLine}></div>
            }
            <div
                ref={dragElementRef}
                onPointerDown={handleDragStart}
                style={slideObjectStyles}
                className={styles.slideObject}
            >
                <div className={styles.elementContainer}>
                    {slideElement}
                </div>
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
        </div>
    )
}

export {
    SlideObject,
}