import { type Editor } from "./types/EditorTypes.ts"
import { type AddToSlideSelectionAction } from "./redux/actions.ts"

function selectOneSlide(editor: Editor, action: AddToSlideSelectionAction): Editor {
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