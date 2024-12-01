import { type Editor } from "./types/EditorTypes.ts";
import { type EditBarState } from "./types/EditorTypes.ts";

// import { type SlideSelection} from "./types/EditorTypes.ts";
// import { type ElementSelection} from "./types/EditorTypes.ts";


function addToSlideSelection(editor: Editor, selectedSlide: string): Editor {
    return {
        ...editor,
        slideSelection: [...editor.slideSelection, selectedSlide],
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide"
        }
    }
}

function selectOneSlide(editor: Editor, selectedSlide: string): Editor {
    return {
        ...editor,
        slideSelection: [selectedSlide],
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide"
        }
    }
}

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

function selectOneElement(editor: Editor, selectedElement: string): Editor {
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
        elementSelection: [selectedElement],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: elemType
        }
    }
}

function clearElementSelection(editor: Editor): Editor {
    return {
        ...editor,
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit"
        }
    }
}



export {
    addToSlideSelection,
    selectOneSlide,
    addToElementSelection,
    selectOneElement,
    clearElementSelection
}