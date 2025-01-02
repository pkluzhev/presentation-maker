import { ActionType } from "../actions"

function addNewText() {
    return {
        type: ActionType.ADD_NEW_TEXT,
    }
}

function changeTextValue(newValue: string) {
    return {
        type: ActionType.CHANGE_TEXT_VALUE,
        payload: newValue
    }
}

export {
    addNewText,
    changeTextValue,
}