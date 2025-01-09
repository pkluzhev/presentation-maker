import { type Editor } from "../types/EditorTypes";
import { ImageObject, Slide, TextObject } from "../types/PresentationTypes";

function pasteElements(editor: Editor): Editor {
    if (editor.slideSelection.length <= 0 || editor.elementBuffer.length <= 0) {
        return editor
    }
    const newSlides: Slide[] = structuredClone(editor.presentation.slides)
    newSlides.forEach((slide) => {
        editor.slideSelection.forEach((slideId) => {
            if (slideId === slide.id) {
                editor.elementBuffer.forEach((element) => {
                    const newElement: TextObject | ImageObject = structuredClone(element)
                    newElement.id = crypto.randomUUID()
                    slide.objects.push(newElement)
                })
            }
        })
    })

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
        },
    }
}

export {
    pasteElements,
}