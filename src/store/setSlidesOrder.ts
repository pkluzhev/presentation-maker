import { type Editor } from "./types/EditorTypes";
import { type Slide } from "./types/PresentationTypes";

function setSlidesOrder(editor: Editor, orderData: {dragSlideId: string, dropSlideId: string}): Editor {
    const dragSlideIndex: number = editor.presentation.slides.findIndex((slide) => slide.id === orderData.dragSlideId)
    const dropSlideIndex: number = editor.presentation.slides.findIndex((slide) => slide.id === orderData.dropSlideId)
    const draggableSlide: Slide = structuredClone(editor.presentation.slides[dragSlideIndex])
    const newSlides = structuredClone(editor.presentation.slides)
    newSlides.splice(dragSlideIndex, 1)
    newSlides.splice(dropSlideIndex, 0, draggableSlide)
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides

        },
        slideSelection: [orderData.dragSlideId],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide"
        }
    }
}

export {
    setSlidesOrder,
}