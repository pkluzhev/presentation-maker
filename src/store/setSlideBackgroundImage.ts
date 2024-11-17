import { type Editor } from "./types/EditorTypes";
import { type ImageBackground } from "./types/PresentationTypes";


function setSlideBackgroundImage(editor: Editor, backgroundImage: string): Editor {
    function setBackground(srcStr: string): ImageBackground {
        return {
            type: "image",
            src: srcStr
        }
    }
    const newSlides = structuredClone(editor.presentation.slides)
    newSlides.forEach((slide) => {
        editor.slideSelection.forEach((idStr) => {
            if (slide.id === idStr) {
                slide.background = setBackground(backgroundImage)
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
    setSlideBackgroundImage,
}