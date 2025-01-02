import { type Editor } from "../types/EditorTypes";
import { type TextObject } from "../types/PresentationTypes";
import { type ImageObject } from "../types/PresentationTypes";

function incSlideObjectLayer(editor: Editor): Editor {
    const currentSlideId = editor.slideSelection[editor.slideSelection.length - 1]
    let newSlides = [...editor.presentation.slides]
    function incElem(array: Array<TextObject | ImageObject>, currIndex: number): Array<TextObject | ImageObject> {
        const newArray = [...array]
        const swapElem1 = newArray[currIndex]
        const swapElem2 = newArray[currIndex + 1]
        const temp = swapElem1
        newArray[currIndex] = swapElem2
        newArray[currIndex + 1] = temp
        return newArray
    };
    editor.elementSelection.forEach((elem) => {
        newSlides = newSlides.map((slide) => {
            if (slide.id !== currentSlideId) {
                return slide;
            }
            const incSlideObjectIndex = slide.objects.findIndex((obj) => obj.id === elem)
            if ((incSlideObjectIndex < 0) || (incSlideObjectIndex >= (slide.objects.length - 1))) {
                return slide;
            }
            return {
                ...slide,
                objects: incElem(slide.objects, incSlideObjectIndex),
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
    incSlideObjectLayer,
}