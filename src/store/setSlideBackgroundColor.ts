import { type Editor } from "./types/EditorTypes";
import { type SolidBackground } from "./types/PresentationTypes";


function setSlideBackgroundColor(editor: Editor, backgroundColor: string): Editor {
    function setBackground(colorStr: string): SolidBackground {
        return {
            type: "solid",
            color: colorStr
        }
    }
    const newSlides = structuredClone(editor.presentation.slides)
    if (backgroundColor === "") {
        return {
            ...editor,
        }
    }
    newSlides.forEach((slide) => {
        editor.slideSelection.forEach((idStr) => {
            if (slide.id === idStr) {
                slide.background = setBackground(backgroundColor)
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