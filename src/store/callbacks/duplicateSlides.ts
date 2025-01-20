import { type Editor } from "../types/EditorTypes";
import { type Slide } from "../types/PresentationTypes";

function duplicateSlides(editor: Editor): Editor {
    if (editor.slideSelection.length <= 0)
        return {
            ...editor
        }
    const copyingSlides: Slide[] = []
    editor.presentation.slides.forEach(slide => {
        editor.slideSelection.forEach(id => {
            if (id === slide.id) {
                copyingSlides.push(slide)
            }
        })
    })
    const slideCopies: Slide[] = structuredClone(copyingSlides)
    slideCopies.forEach(slide => {
        slide.id = crypto.randomUUID()
        slide.objects.forEach(slideObject => {
            slideObject.id = crypto.randomUUID()
        })
    })
    const newSlides: Slide[] = structuredClone(editor.presentation.slides)
    const newSlideSelection: string[] = []
    slideCopies.forEach(slide => {
        newSlides.push(slide)
        newSlideSelection.push(slide.id)
    })

    return {
        ...editor,
        slideSelection: newSlideSelection,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export {
    duplicateSlides,
}