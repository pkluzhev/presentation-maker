import { type Editor } from "../types/EditorTypes";
import { type Slide, type Presentation } from "../types/PresentationTypes";

function createNewPresentation(editor: Editor): Editor {
    const newSlide: Slide = {
        id: crypto.randomUUID(),
        background: {
            type: "solid",
            color: "#ffffff"
        },
        objects: []
    }
    const newSlides: Slide[] = [newSlide]
    const newPresentation: Presentation = {
        title: "New project",
        slides: newSlides
    }
    return {
        ...editor,
        slideSelection: [newSlide.id],
        presentation: newPresentation,
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit"
        }
    }
}

export {
    createNewPresentation,
}