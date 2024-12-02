import { CSSProperties } from "react";
import { type TextObject } from "../../../../store/types/PresentationTypes.ts";
import styles from './TextObject.module.css'

import { dispatch } from "../../../../store/editor.ts";

import { changeTextValue } from "../../../../store/changeTextValue.ts";

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
    return (
        <textarea
            style={textStyles}
            className={styles.textObjectInput}
            onChange={(event) => {
                dispatch(changeTextValue, (event.target as HTMLTextAreaElement).value)
            }}
            value={value}
        />
    )
}

export {
    TextObject
}