import { type Editor } from "../types/EditorTypes.ts";

function closeSetBackgroundPopup(editor: Editor): Editor {
    return {
        ...editor,
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide",
            isSetSlideBackgroundPopupActive: false,
        }
    }
}

export {
    closeSetBackgroundPopup,
}