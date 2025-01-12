import { type Editor } from "../types/EditorTypes.ts";
import { type GradientBackground } from "../types/PresentationTypes.ts";
import { SetSlideBackgroundGradientAction } from "../redux/actions.ts";

function setSlideBackgroundGradient(editor: Editor, action: SetSlideBackgroundGradientAction): Editor {
    function setBackground(value: {color1: string, color2: string, tilt: number}): GradientBackground {
        return {
            type: "gradient",
            colorOne: value.color1,
            colorTwo: value.color2,
            angle: value.tilt
        }
    }
    const newSlides = structuredClone(editor.presentation.slides)
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
    setSlideBackgroundGradient,
}