import { type Editor } from "./types/EditorTypes";
import { type RenamePresentationAction } from "./redux/actions.ts";

function renamePresentation(editor: Editor, action: RenamePresentationAction): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: action.payload,
        }
    }
}

export {
    renamePresentation,
}