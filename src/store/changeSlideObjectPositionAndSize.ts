import { type Editor } from "./types/EditorTypes.ts";
import { type Position, type Size } from "./types/PresentationTypes.ts";
import { ChangeSlideObjectPositionAndSizeAction } from "./redux/actions.ts";

function changeSlideObjectPositionAndSize(editor: Editor, action: ChangeSlideObjectPositionAndSizeAction): Editor {
    const modifyPosition = (position: Position, newPos: Position): Position => {
        position.x = newPos.x
        position.y = newPos.y
        return position
    }
    const modifySize = (size: Size, newSize: Size): Size => {
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
                            position: modifyPosition(structuredClone(object.position), action.payload.position),
                            size: modifySize(structuredClone(object.size), action.payload.size)
                        }
                    })
                }
            })
        }
    }
}

export {
    changeSlideObjectPositionAndSize,
}