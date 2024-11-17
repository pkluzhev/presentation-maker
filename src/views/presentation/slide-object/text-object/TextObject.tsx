import { type TextObject } from "../../../../store/types/PresentationTypes.ts";
import styles from './TextObject.module.css'
import { dispatch } from "../../../../store/editor.ts";
import { changeTextValue } from "../../../../store/changeTextValue.ts";
import { selectOneElement } from "../../../../store/setSelection.ts";
import { addToElementSelection } from "../../../../store/setSelection.ts";

import { CSSProperties, useState } from "react";

type TextProps = {
    object: TextObject,
    scale: number,
    isSelected?: boolean
}

function TextObject({ object, scale, isSelected }: TextProps) {
    const textStyles: CSSProperties = {
        position: "absolute",
        boxSizing: "border-box",
        padding: 0,
        margin: 0,
        top: `${object.position.x * scale}px`,
        left: `${object.position.y * scale}px`,
        width: `${object.size.width * scale}px`,
        height: `${object.size.height * scale}px`,
        fontFamily: `${object.fontFamily}`,
        fontSize: `${object.fontSize * scale}px`,
        fontWeight: object.fontWeight,
        color: `${object.fontColor}`,
        backgroundColor: "transparent"
    }
    if (isSelected) {
        textStyles.border = "solid 0.5px #4071db"
    }

    const onElementClick = (elemId: string, event: React.MouseEvent) => {
        if (event.ctrlKey) {
            dispatch(addToElementSelection, elemId)
        } else {
            dispatch(selectOneElement, elemId)
        }
    }

    const [editMode, setEditMode] = useState(false)

    return (
        <div>
            {!editMode &&
                <div
                    style={textStyles}
                    className={styles.textObjectDiv}
                    onClick={(event) => { onElementClick(object.id, event) }}
                    onDoubleClick={() => {setEditMode(true)}}
                >
                    {object.value}
                </div>
            }
            {editMode &&
                <textarea
                    style={textStyles}
                    className={styles.textObjectInput}
                    wrap="soft"
                    onChange={(event) => {
                        dispatch(changeTextValue, (event.target as HTMLTextAreaElement).value)
                    }}
                    onBlur={() => {setEditMode(false)}}
                    value={object.value}
                />
            }
        </div>
    )
}

export {
    TextObject
}