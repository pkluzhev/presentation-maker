import { type TextObject } from "../../../../store/types/PresentationTypes.ts";
import { dispatch } from "../../../../store/editor.ts";
import { changeTextValue } from "../../../../store/changeTextValue.ts";
import styles from './TextObject.module.css'

import { CSSProperties, useState } from "react";

type TextProps = {
    value: string,
    fontFamily: string,
    fontSize: number,
    fontWeight: number,
    fontColor: string
}

function TextObject({ value, fontFamily, fontSize, fontWeight, fontColor }: TextProps) {
    const textStyles: CSSProperties = {
        fontFamily: `${fontFamily}`,
        fontSize: `${fontSize}px`,
        fontWeight: `${fontWeight}`,
        color: `${fontColor}`,
    }

    const [editMode, setEditMode] = useState(false)

    let component
    if (editMode) {
        component = <div
            style={textStyles}
            className={styles.textObjectDiv}
            onDoubleClick={() => { setEditMode(true) }}
        >
            {value}
        </div>
    } else {
        component = <textarea
            style={textStyles}
            className={styles.textObjectInput}
            wrap="soft"
            onChange={(event) => {
                dispatch(changeTextValue, (event.target as HTMLTextAreaElement).value)
            }}
            onBlur={() => { setEditMode(false) }}
            value={value}
        />
    }

    return component
}

export {
    TextObject
}