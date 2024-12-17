import { type Editor } from "./types/EditorTypes";
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "../views/presentation/slide/Slide";
import { type TextObject, defaultTextElement } from "./types/PresentationTypes";

function addNewText(editor: Editor): Editor {
    if (editor.slideSelection.length <= 0 || editor.presentation.slides.length <= 0) {
        return editor
    }
    const newElement: TextObject = structuredClone(defaultTextElement)
    newElement.id = crypto.randomUUID()
    newElement.position.x = (SLIDE_WIDTH - newElement.size.width) / 2
    newElement.position.y = (SLIDE_HEIGHT - newElement.size.height) / 2
    const currentSlideId = editor.slideSelection[editor.slideSelection.length - 1]
    const newSlides = editor.presentation.slides.map((slide) => {
        if (slide.id !== currentSlideId) {
            return slide
        }
        return {
            ...slide,
            objects: [...slide.objects, newElement]
        }
    })
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export {
    addNewText,
}