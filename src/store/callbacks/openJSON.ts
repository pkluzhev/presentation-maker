import { type Editor } from "../types/EditorTypes.ts";
import { openJSONAction } from "../redux/actions.ts";
import { validate } from "../../../ajvValidator.ts";


function openJSON(editor: Editor, action: openJSONAction): Editor {
    const valid = validate(action.payload)
    if (!valid) {
        console.log("Not valid JSON data")
        return editor
    }
    const newSlideSelection: string[] = []
    if (action.payload.slides.length > 0) {
        newSlideSelection.push(action.payload.slides[0].id)
    }
    return {
        ...editor,
        presentation: action.payload,
        slideSelection: newSlideSelection
    }
}

export {
    openJSON
}