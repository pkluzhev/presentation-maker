import { type Editor } from "../types/EditorTypes";
import { ActionType } from "./actions";

function setEditor(newEditor: Editor) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

export {
    setEditor,
}