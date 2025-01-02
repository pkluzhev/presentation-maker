import { AddToSlideSelectionAction } from "../redux/actions.ts";
import { type Editor } from "../types/EditorTypes.ts";

function addToSlideSelection(editor: Editor, action: AddToSlideSelectionAction): Editor {
    return {
        ...editor,
        slideSelection: [...editor.slideSelection, action.payload],
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide"
        }
    }
}

export {
    addToSlideSelection,
}