import { type Editor } from "./types/EditorTypes.ts";
import { openJSONAction } from "./redux/actions.ts";

function openJSON(editor: Editor, action: openJSONAction): Editor {
    return {
        ...editor,
        presentation: action.payload,
        slideSelection: []
    }
}

export {
    openJSON
}