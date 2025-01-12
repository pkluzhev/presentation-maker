import { type Editor } from "../types/EditorTypes.ts";
import { SetFontFamilyAction } from "../redux/actions.ts";
import { Slide } from "../types/PresentationTypes.ts";

function setFontFamily(editor: Editor, action: SetFontFamilyAction): Editor {
    const newSlides: Slide[] = structuredClone(editor.presentation.slides)
    newSlides.forEach((slide) => {
        slide.objects.forEach((element) => {
            editor.elementSelection.forEach((elemId) => {
                if (elemId === element.id && element.type === "text") {
                    element.fontFamily = action.payload
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
    setFontFamily,
}