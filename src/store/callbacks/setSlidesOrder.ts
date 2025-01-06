import { type Editor } from "../types/EditorTypes.ts";
import { type Slide } from "../types/PresentationTypes.ts";
import { SetSlidesOrderAction } from "../redux/actions.ts";

// function setSlidesOrder(editor: Editor, action: SetSlidesOrderAction): Editor {
//     const dragSlideIndex: number = editor.presentation.slides.findIndex((slide) => slide.id === action.payload.dragSlideId)
//     const dropSlideIndex: number = editor.presentation.slides.findIndex((slide) => slide.id === action.payload.dropSlideId)
//     const draggableSlide: Slide = structuredClone(editor.presentation.slides[dragSlideIndex])
//     const newSlides = structuredClone(editor.presentation.slides)
//     newSlides.splice(dragSlideIndex, 1)
//     newSlides.splice(dropSlideIndex, 0, draggableSlide)
//     return {
//         ...editor,
//         presentation: {
//             ...editor.presentation,
//             slides: newSlides
//         },
//         slideSelection: [action.payload.dragSlideId],
//         interfaceState: {
//             ...editor.interfaceState,
//             editBarState: "slide"
//         }
//     }
// }

function setSlidesOrder(editor: Editor, action: SetSlidesOrderAction): Editor {
    if (action.payload.dragSlideId.length <= 0) {
        return { ...editor }
    }
    const draggableSlides: Slide[] = editor.presentation.slides.filter((slide) => {
        for (let i = 0; i < action.payload.dragSlideId.length; i++) {
            if (slide.id === action.payload.dragSlideId[i]) {
                return true
            }
        }
        return false
    })
    const newSlides: Slide[] = editor.presentation.slides.filter((slide) => {
        for (let i = 0; i < action.payload.dragSlideId.length; i++) {
            if (slide.id === action.payload.dragSlideId[i]) {
                return false
            }
        }
        return true
    })
    const dropSlideIndex: number = newSlides.findIndex((slide) => slide.id === action.payload.dropSlideId)
    for (let i = draggableSlides.length - 1; i >= 0; i--) {
        newSlides.splice(dropSlideIndex, 0, draggableSlides[i])
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        slideSelection: action.payload.dragSlideId,
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide"
        }
    }
}

export {
    setSlidesOrder,
}