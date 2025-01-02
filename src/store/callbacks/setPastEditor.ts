import { type UndoAction } from "../redux/actions.ts";
import { type Editor } from "../types/EditorTypes.ts";

function setPastEditor(action: UndoAction): Editor {
    return action.payload
}

export {
    setPastEditor,
}