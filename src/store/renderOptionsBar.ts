import { type Editor } from "./types/EditorTypes";
import { RenderOptionsBarAction } from "./redux/actions.ts";

function renderOptionsBar(editor: Editor, action: RenderOptionsBarAction): Editor {
    return {
        ...editor,
        interfaceState: {
            ...editor.interfaceState,
            optionsBarState: action.payload
        }
    }
}

export {
    renderOptionsBar,
}