import { CSSProperties } from "react";
import { TextObject } from "../slide-object/text-object/TextObject.tsx";
import { ImageObject } from "../slide-object/image-object/ImageObject.tsx";
import { dispatch } from "../../../store/editor.ts";
import { selectOneElement } from "../../../store/setSelection.ts";
import { addToElementSelection } from "../../../store/setSelection.ts";
import styles from './SlideObject.module.css'

type SlideObjectProps = {
    object: TextObject | ImageObject,
    scale: number,
    isSelected?: boolean
}

function SlideObject({ object, scale, isSelected }: SlideObjectProps) {
    const slideObjectStyles: CSSProperties = {
        top: `${object.position.x * scale}px`,
        left: `${object.position.y * scale}px`,
        width: `${object.size.width * scale}px`,
        height: `${object.size.height * scale}px`,
    }

    const onElementMouseDown = (object: ImageObject | TextObject, event: React.MouseEvent) => {
        if (!isSelected) {
            if (event.ctrlKey) {
                dispatch(addToElementSelection, object.id)
            } else {
                dispatch(selectOneElement, object.id)
            }
            console.log(event.pageX)
            console.log(event.pageY)
        }
    }

    if (isSelected) {
        slideObjectStyles.border = "solid 0.5px #4071db"
    }

    switch (object.type) {
        case "text":
            return (
                <div
                    style={slideObjectStyles}
                    className={styles.slideObject}
                    onMouseDown={(event) => { onElementMouseDown(object, event) }}
                >
                    <TextObject 
                        value={object.value}
                        fontFamily={object.fontFamily}
                        fontSize={object.fontSize * scale}
                        fontWeight={object.fontWeight}
                        fontColor={object.fontColor}
                    />
                </div>
            )
        case "image":
            return (
                <div
                    style={slideObjectStyles}
                    className={styles.slideObject}
                    onMouseDown={(event) => { onElementMouseDown(object, event) }}
                >
                    <ImageObject src={object.src} />
                </div>
            )
        default:
            throw new Error(`Unknown slide-object type: ${object}`)
    }
}

export {
    SlideObject
}