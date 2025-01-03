import { type Editor } from "../types/EditorTypes.ts";

function openChangeImagePopup(editor: Editor): Editor {
    return {
        ...editor,
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit",
            isPreviewActive: false,
            isChangeImagePopupActive: true,
            isSetSlideBackgroundImagePopupActive: false
        }
    }
}

export {
    openChangeImagePopup,
}