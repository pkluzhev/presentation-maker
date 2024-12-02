import { type Editor } from "./types/EditorTypes";
import { type OptionsBarState } from './types/EditorTypes'

function renderOptionsBar(editor: Editor, newState: OptionsBarState): Editor {
    return {
        ...editor,
        interfaceState: {
            ...editor.interfaceState,
            optionsBarState: newState
        }
    }
}

export {
    renderOptionsBar,
}