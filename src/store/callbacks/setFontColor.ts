import { type Editor } from "../types/EditorTypes.ts";
import { SetFontColorAction } from "../redux/actions.ts";
import { Slide } from "../types/PresentationTypes.ts";

function setFontColor(editor: Editor, action: SetFontColorAction): Editor {
    const newSlides: Slide[] = structuredClone(editor.presentation.slides)
    newSlides.forEach((slide) => {
        slide.objects.forEach((element) => {
            editor.elementSelection.forEach((elemId) => {
                if (elemId === element.id && element.type === "text") {
                    element.fontColor = action.payload
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
    setFontColor,
}