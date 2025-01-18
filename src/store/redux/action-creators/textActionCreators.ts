import { ActionType } from "../actions"

function addNewText() {
    return {
        type: ActionType.ADD_NEW_TEXT,
    }
}

function changeTextValue({elementId, newValue}: {elementId: string, newValue: string}) {
    return {
        type: ActionType.CHANGE_TEXT_VALUE,
        payload: {elementId, newValue}
    }
}

function setFontColor(newColor: string) {
    return {
        type: ActionType.SET_FONT_COLOR,
        payload: newColor
    }
}

function setFontWeight(newWeight: number) {
    return {
        type: ActionType.SET_FONT_WEIGHT,
        payload: newWeight
    }
}

function setFontSize(newSize: number) {
    return {
        type: ActionType.SET_FONT_SIZE,
        payload: newSize
    }
}

function setFontFamily(newFamily: string) {
    return {
        type: ActionType.SET_FONT_FAMILY,
        payload: newFamily
    }
}

function setTextAlign(newValue: "left" | "center" | "right") {
    return {
        type: ActionType.SET_TEXT_ALIGN,
        payload: newValue
    }
}

export {
    addNewText,
    changeTextValue,
    setFontColor,
    setFontWeight,
    setFontSize,
    setFontFamily,
    setTextAlign,
}