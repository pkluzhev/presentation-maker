import { type RedoAction } from "../redux/actions.ts";
import { type Editor } from "../types/EditorTypes.ts";

function setFutureEditor(action: RedoAction): Editor {
    return action.payload
}

export {
    setFutureEditor,
}