import { type Editor } from "../types/EditorTypes.ts";

function closePreviewPopup(editor: Editor): Editor {
    return {
        ...editor,
        interfaceState: {
            ...editor.interfaceState,
            isPreviewActive: false
        }
    }
}

export {
    closePreviewPopup,
}