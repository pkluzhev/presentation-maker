import { type Editor } from "../types/EditorTypes";

import { addSlide } from "../addSlide";
import { setSelection } from "../setSelection";
import { ActionType, EditorAction } from "./actions";
import { defaultEditor } from "../data";
import { removeSlide } from "../removeSlide";

function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE: 
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)
        case ActionType.SET_SELECTION: 
            return setSelection(editor, action)
        case ActionType.SET_EDITOR:
            return action.payload
        default:
            return editor
    }
}

export {
    editorReducer,
}