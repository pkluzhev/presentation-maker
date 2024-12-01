import { type Editor } from "./types/EditorTypes";
import { Size } from "./types/PresentationTypes";

function changeSlideObjectSize(editor: Editor, newSize: Size): Editor {
    function modifySize(size: Size, newSize: Size): Size {
        size.width = newSize.width
        size.height = newSize.height
        return size
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map((slide) => {
                if (slide.id !== editor.slideSelection[editor.slideSelection.length - 1]) {
                    return slide
                }
                return {
                    ...slide,
                    objects: slide.objects.map((object) => {
                        if (object.id !== editor.elementSelection[editor.elementSelection.length - 1]) {
                            return object
                        }
                        return {
                            ...object,
                            size: modifySize(structuredClone(object.size), newSize)
                        }
                    })
                }
            })
        }
    }
}

export {
    changeSlideObjectSize
}
