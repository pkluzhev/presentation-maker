import { type Editor } from "../types/EditorTypes.ts"
import { type SelectOneSlideAction } from "../redux/actions.ts"

function selectOneSlide(editor: Editor, action: SelectOneSlideAction): Editor {
    return {
        ...editor,
        slideSelection: [action.payload],
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide"
        }
    }
}

export {
    selectOneSlide,
}