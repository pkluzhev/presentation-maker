import { CSSProperties } from "react";
import { type TextObject } from "../../../../store/types/PresentationTypes.ts";
import styles from './TextObject.module.css'
import { useAppActions } from "../../../hooks/useAppActions.ts";


type TextProps = {
    value: string,
    fontFamily: string,
    fontSize: number,
    fontWeight: number,
    fontColor: string,
    isSelected: boolean
}

function TextObject({ value, fontFamily, fontSize, fontWeight, fontColor, isSelected }: TextProps) {
    const { changeTextValue } = useAppActions()

    const textareaStyles: CSSProperties = {
        fontFamily: `${fontFamily}`,
        fontSize: `${fontSize}px`,
        fontWeight: `${fontWeight}`,
        color: `${fontColor}`,
    }
    const textStyles: CSSProperties = {
        fontFamily: `${fontFamily}`,
        fontSize: `${fontSize}px`,
        fontWeight: `${fontWeight}`,
        color: `${fontColor}`,
    }
    return <>
        {isSelected &&
            <textarea
                style={textareaStyles}
                className={styles.textObjectEditable}
                onChange={(event) => {
                    changeTextValue((event.target as HTMLTextAreaElement).value)
                }}
                value={value}
            />
        }
        {!isSelected &&
            <div
                style={textStyles}
                className={styles.textObjectView}
            >
                {value}
            </div>
        }
    </>

}

export {
    TextObject
}