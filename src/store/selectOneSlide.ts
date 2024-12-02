import { type Editor } from "./types/EditorTypes.ts";

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

export {
    selectOneSlide,
}