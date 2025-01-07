import { type Editor } from "../types/EditorTypes";
import { ImageObject, TextObject } from "../types/PresentationTypes";

function pasteElements(editor: Editor): Editor {
    console.log('paste')
    if (editor.slideSelection.length <= 0 || editor.elementBuffer.length <= 0) {
        return editor
    }
    
    let copyingObjects: (TextObject | ImageObject)[] = []
    editor.presentation.slides.forEach((slide)=>{
        slide.objects.forEach((object)=>{
            editor.elementSelection.forEach((id)=>{
                if(id === object.id) {
                    copyingObjects.push(object)
                }
            })
        })
    })
    let newElementSelection: string[] = []
    copyingObjects.forEach((object)=>{
        object.id = crypto.randomUUID()
        newElementSelection.push(object.id)
    })

    return {
        ...editor,
        elementSelection: newElementSelection,
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit"
        },
        elementBuffer: copyingObjects
    }
}

export {
    pasteElements,
}