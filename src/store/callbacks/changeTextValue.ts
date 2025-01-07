import { type Editor } from "../types/EditorTypes.ts";
import { type ChangeTextValueAction } from "../redux/actions.ts";

function changeTextValue(editor: Editor, action: ChangeTextValueAction): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map((slide) => {
                if (slide.id !== editor.slideSelection[editor.slideSelection.length - 1]) {
                    return slide
                }
                return {
                    ...slide,
                    objects: slide.objects.map((object) => {
                        if (object.id !== action.payload.elementId) {
                            return object
                        }
                        return {
                            ...object,
                            value: action.payload.newValue
                        }
                    })
                }
            })
        }

    }
}

export {
    changeTextValue,
}