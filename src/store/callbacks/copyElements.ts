import { type Editor } from "../types/EditorTypes";
import { ImageObject, TextObject } from "../types/PresentationTypes";

function copyElements(editor: Editor): Editor {
    if (editor.slideSelection.length <= 0 || editor.elementSelection.length <= 0) {
        return editor
    }
    let copyingObjects: (TextObject | ImageObject)[] = []
    editor.presentation.slides.forEach((slide)=>{
        slide.objects.forEach((object)=>{
            editor.elementSelection.forEach((id)=>{
                if(id === object.id) {
                    const newObject: TextObject | ImageObject = structuredClone(object)
                    copyingObjects.push(newObject)
                }
            })
        })
    })

    return {
        ...editor,
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit"
        },
        elementBuffer: copyingObjects
    }
}

export {
    copyElements,
}