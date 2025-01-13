import { CSSProperties, useEffect, useState } from "react";
import { type TextObject } from "../../../../store/types/PresentationTypes.ts";
import styles from './TextObject.module.css'
import { useAppActions } from "../../../hooks/useAppActions.ts";

type TextProps = {
    value: string,
    fontFamily: string,
    fontSize: number,
    fontWeight: number,
    fontColor: string,
    isSelected: boolean,
    id: string
}

function TextObject({ value, fontFamily, fontSize, fontWeight, fontColor, isSelected, id }: TextProps) {
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
    const [currentValue, setCurrentValue] = useState<string>(value)
    const [hasBeenSelected, setHasBeenSelected] = useState<boolean>(false)

    useEffect(() => {
        if (isSelected) {
            setHasBeenSelected(true)
        }
    }, [isSelected, setHasBeenSelected])

    useEffect(() => {
        if (!isSelected && hasBeenSelected && currentValue !== value) {
            changeTextValue({ elementId: id, newValue: currentValue })
            setHasBeenSelected(false)
        }
    }, [isSelected, currentValue, value, hasBeenSelected, setHasBeenSelected])

    return <>
        {isSelected &&
            <textarea
                wrap={"hard"}
                spellCheck={false}
                style={textareaStyles}
                className={styles.textObjectEditable}
                value={currentValue}
                onChange={(event) => {
                    setCurrentValue((event.target as HTMLTextAreaElement).value)
                }}
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