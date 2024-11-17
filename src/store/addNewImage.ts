import { type Editor } from "./types/EditorTypes";
import { SLIDE_WIDTH } from "../views/presentation/slide/Slide";
import { SLIDE_HEIGHT } from "../views/presentation/slide/Slide";
import { type ImageObject } from "./types/PresentationTypes";
import { defaultImageElement } from "./types/PresentationTypes";


//


function addNewImage(editor: Editor): Editor {
    console.log('editor', editor)
    if (editor.slideSelection.length <= 0 || editor.presentation.slides.length <= 0) {
        return editor
    }
    const newElement: ImageObject = structuredClone(defaultImageElement)
    newElement.id = crypto.randomUUID()
    newElement.position.x = (SLIDE_HEIGHT - 150) / 2
    newElement.position.y = (SLIDE_WIDTH - 200) / 2
    newElement.position.angle = 0
    newElement.size.width = 200
    newElement.size.height = 150
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
        },
        elementSelection: [newElement.id],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "image"
        } 
    }
}

export {
    addNewImage,
}