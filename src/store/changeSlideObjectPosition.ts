import { type Editor } from "./types/EditorTypes";
import { Position } from "./types/PresentationTypes";

function changeSlideObjectPosition(editor: Editor, newPosition: Position): Editor {
    function modifyPosition(position: Position, newPos: Position): Position {
        position.x = newPos.x
        position.y = newPos.y
        return position
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
                            position: modifyPosition(structuredClone(object.position), newPosition)
                        }
                    })
                }
            })
        }

    }
}

export {
    changeSlideObjectPosition,
}