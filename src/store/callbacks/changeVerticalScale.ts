import { type Editor } from "../types/EditorTypes.ts";

function changeVerticalScale(editor: Editor): Editor {
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
                            scale: {
                                ...object.scale,
                                x: object.scale.x * (-1)
                            }
                        }
                    })
                }
            })
        }

    }
}


export {
    changeVerticalScale,
}