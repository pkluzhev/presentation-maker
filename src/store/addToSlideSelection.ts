import { type Editor } from "./types/EditorTypes.ts";

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

export {
    addToSlideSelection,
}