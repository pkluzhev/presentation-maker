import { type Editor } from "../types/EditorTypes.ts";
import { ChangeImageAction } from "../redux/actions.ts";
import { Scale } from "../types/PresentationTypes.ts";

function changeImage(editor: Editor, action: ChangeImageAction): Editor {
    const defaultScale: Scale = {
        x: 1,
        y: 1,
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
                        if (!editor.elementSelection.includes(object.id) || object.type !== "image") {
                            return object
                        }
                        return {
                            ...object,
                            src: action.payload,
                            scale: defaultScale
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