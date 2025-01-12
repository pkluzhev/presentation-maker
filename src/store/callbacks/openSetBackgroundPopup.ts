import { type Editor } from "../types/EditorTypes.ts";

function openSetBackgroundPopup(editor: Editor): Editor {
    return {
        ...editor,
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide",
            isSetSlideBackgroundPopupActive: true,
        }
    }
}

export {
    openSetBackgroundPopup,
}