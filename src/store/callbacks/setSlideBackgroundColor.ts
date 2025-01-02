import { type Editor } from "../types/EditorTypes.ts";
import { type SolidBackground } from "../types/PresentationTypes.ts";
import { SetSlideBackgroundColorAction } from "../redux/actions.ts";

function setSlideBackgroundColor(editor: Editor, action: SetSlideBackgroundColorAction): Editor {
    function setBackground(colorStr: string): SolidBackground {
        return {
            type: "solid",
            color: colorStr
        }
    }
    const newSlides = structuredClone(editor.presentation.slides)
    if (action.payload === "") {
        return {
            ...editor,
        }
    }
    newSlides.forEach((slide) => {
        editor.slideSelection.forEach((idStr) => {
            if (slide.id === idStr) {
                slide.background = setBackground(action.payload)
            }
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
    setSlideBackgroundColor,
}