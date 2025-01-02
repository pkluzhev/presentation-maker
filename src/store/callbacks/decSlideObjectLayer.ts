import { type Editor } from "../types/EditorTypes";
import { type TextObject, type ImageObject } from "../types/PresentationTypes";

function decSlideObjectLayer(editor: Editor): Editor {
    const currentSlideId = editor.slideSelection[editor.slideSelection.length - 1]
    let newSlides = [...editor.presentation.slides]
    function incElem(array: Array<TextObject | ImageObject>, currIndex: number): Array<TextObject | ImageObject> {
        const newArray = [...array]
        const swapElem1 = newArray[currIndex - 1]
        const swapElem2 = newArray[currIndex]
        const temp = swapElem1
        newArray[currIndex - 1] = swapElem2
        newArray[currIndex] = temp
        return newArray
    };
    editor.elementSelection.forEach((elem) => {
        newSlides = newSlides.map((slide) => {
            if (slide.id !== currentSlideId) {
                return slide;
            }
            const decSlideObjectIndex = slide.objects.findIndex((obj) => obj.id === elem)
            if ((decSlideObjectIndex < 1) || (decSlideObjectIndex >= (slide.objects.length))) {
                return slide;
            }
            return {
                ...slide,
                objects: incElem(slide.objects, decSlideObjectIndex),
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
    decSlideObjectLayer,
}