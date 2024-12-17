import { type AddToElementSelectionAction } from "./redux/actions.ts";
import { type Editor, type EditBarState } from "./types/EditorTypes.ts";

function addToElementSelection(editor: Editor, action: AddToElementSelectionAction): Editor {
    let elemType: EditBarState = "no-edit";
    editor.presentation.slides.forEach((slide) => {
        slide.objects.forEach((object) => {
            if (object.id === action.payload) {
                elemType = object.type
            }
        })
    })
    return {
        ...editor,
        elementSelection: [...editor.elementSelection, action.payload],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: elemType
        }
    }
}

export {
    addToElementSelection,
}