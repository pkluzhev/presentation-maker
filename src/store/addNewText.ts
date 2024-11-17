import { type Editor } from "./types/EditorTypes";
import { SLIDE_WIDTH } from "../views/presentation/slide/Slide";
import { SLIDE_HEIGHT } from "../views/presentation/slide/Slide";
import { type TextObject } from "./types/PresentationTypes";

function addNewText(editor: Editor): Editor {
    console.log('editor', editor)
    if (editor.slideSelection.length <= 0 || editor.presentation.slides.length <= 0) {
        return editor
    }
    const newElement: TextObject = {
        type: "text",
        value: "New text",
        fontFamily: "Montserrat",
        fontSize: 30,
        fontWeight: 400,
        fontColor: "#000000",
        id: crypto.randomUUID(),
        position: {
            x: (SLIDE_HEIGHT - 50) / 2,
            y: (SLIDE_WIDTH - 140) / 2,
            angle: 0
        },
        size: {
            width: 140,
            height: 50
        }
    }
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
            editBarState: "text"
        } 
    }
}

export {
    addNewText,
}