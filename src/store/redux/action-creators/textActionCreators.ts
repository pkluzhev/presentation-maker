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

export {
    addNewText,
    changeTextValue,
}