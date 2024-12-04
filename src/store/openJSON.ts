import { type Editor } from "./types/EditorTypes.ts";
import { Presentation } from "./types/PresentationTypes.ts";

function openJSON(editor: Editor, newPresentation: Presentation): Editor {
    return {
        ...editor,
        presentation: newPresentation,
        slideSelection: []
    }
}

export {
    openJSON
}