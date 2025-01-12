import { type Editor } from "../types/EditorTypes.ts";
import { SetFontWeightAction } from "../redux/actions.ts";
import { Slide } from "../types/PresentationTypes.ts";

function setFontWeight(editor: Editor, action: SetFontWeightAction): Editor {
    const newSlides: Slide[] = structuredClone(editor.presentation.slides)
    newSlides.forEach((slide) => {
        slide.objects.forEach((element) => {
            editor.elementSelection.forEach((elemId) => {
                if (elemId === element.id && element.type === "text") {
                    element.fontWeight = action.payload
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
    setFontWeight,
}