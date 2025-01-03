import { type Editor } from "../types/EditorTypes.ts";

function closeSetImagePopup(editor: Editor): Editor {
    return {
        ...editor,
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit",
            isPreviewActive: false,
            isChangeImagePopupActive: false,
            isSetSlideBackgroundImagePopupActive: false
        }
    }
}

export {
    closeSetImagePopup,
}