import { type Editor } from "./types/EditorTypes";
import { type Slide } from "./types/PresentationTypes";


function addNewSlide(editor: Editor): Editor {
    console.log('editor', editor)
    const newSlides = [...editor.presentation.slides]
    const newSlide: Slide = {
        id: crypto.randomUUID(),
        background: {
            type: {
                type: "solid",
                color: "#ffffff"
            }
        },
        objects: []
    }
    newSlides.push(newSlide)
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        slideSelection: [newSlide.id],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide"
        }
    }
}

export {
    addNewSlide,
}