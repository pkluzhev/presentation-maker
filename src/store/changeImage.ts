import { type Editor } from "./types/EditorTypes";
import { ChangeImageAction } from "./redux/actions.ts";

function changeImage(editor: Editor, action: ChangeImageAction): Editor {
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
                            src: action.payload
                        }
                    })
                }
            })
        }

    }
}


export {
    changeImage,
}