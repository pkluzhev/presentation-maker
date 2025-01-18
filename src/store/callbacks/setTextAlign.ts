import { type Editor } from "../types/EditorTypes.ts";
import { SetTextAlignAction } from "../redux/actions.ts";
import { Slide } from "../types/PresentationTypes.ts";

function setTextAlign(editor: Editor, action: SetTextAlignAction): Editor {
    const newSlides: Slide[] = structuredClone(editor.presentation.slides)
    newSlides.forEach((slide) => {
        slide.objects.forEach((element) => {
            editor.elementSelection.forEach((elemId) => {
                if (elemId === element.id && element.type === "text") {
                    element.textAlign = action.payload
                }
            })
        })
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export {
    setTextAlign,
}