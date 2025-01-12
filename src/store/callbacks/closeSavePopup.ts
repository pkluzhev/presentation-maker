import { type Editor } from "../types/EditorTypes.ts";

function closeSavePopup(editor: Editor): Editor {
    return {
        ...editor,
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit",
            savePopupState: {
                ...editor.interfaceState.savePopupState,
                isActive: false
            }
            // isSavePopupActive: false,
        }
    }
}

export {
    closeSavePopup,
}