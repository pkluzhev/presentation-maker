import { type Editor } from "../../types/EditorTypes";
import { Presentation } from "../../types/PresentationTypes";
import { ActionType } from "../actions";

function setPastEditor(newEditor: Editor) {
    return {
        type: ActionType.UNDO,
        payload: newEditor,
    }
}

function setFutureEditor(newEditor: Editor) {
    return {
        type: ActionType.REDO,
        payload: newEditor,
    }
}

function openJSON(newPresentation: Presentation) {
    return {
        type: ActionType.OPEN_JSON,
        payload: newPresentation,
    }
}

export {
    setPastEditor,
    setFutureEditor,
    openJSON
}