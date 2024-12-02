import { type Editor } from "./types/EditorTypes.ts";
import { type EditBarState } from "./types/EditorTypes.ts";

function addToElementSelection(editor: Editor, selectedElement: string): Editor {
    let elemType: EditBarState = "no-edit";
    editor.presentation.slides.forEach((slide) => {
        slide.objects.forEach((object) => {
            if (object.id === selectedElement) {
                elemType = object.type
            }
        })
    })
    return {
        ...editor,
        elementSelection: [...editor.elementSelection, selectedElement],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: elemType
        }
    }
}

export {
    addToElementSelection,
}