import { type Editor } from "./types/EditorTypes";
import { type Slide } from "./types/PresentationTypes";

function deleteElements(editor: Editor): Editor {
    if (editor.slideSelection.length <= 0 || editor.elementSelection.length <= 0) {
        return editor
    }
    let newSlides: Slide[] = structuredClone(editor.presentation.slides)
    editor.elementSelection.forEach((objectId) => {
        newSlides = newSlides.map((slide) => {
            return {
                ...slide,
                objects: slide.objects.filter((object) => object.id !== objectId)
            }
        })
    });
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit"
        }
    }
}

export {
    deleteElements,
}