import { type Editor } from "../types/EditorTypes";
import { type Slide } from "../types/PresentationTypes";

function deleteSlides(editor: Editor): Editor {
    if (editor.slideSelection.length <= 0) {
        return editor
    }
    let newSlides: Slide[] = structuredClone(editor.presentation.slides)
    editor.slideSelection.forEach((id) => {
        newSlides = newSlides.filter((slide) => slide.id !== id)
    });
    let newSelectedSlideId: string = ""
    if (newSlides.length > 0) {
        newSelectedSlideId = newSlides[0].id
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides

        },
        slideSelection: [newSelectedSlideId],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit"
        }
    }
}

export {
    deleteSlides,
}