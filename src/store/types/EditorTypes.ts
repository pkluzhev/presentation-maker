import { Presentation } from "./PresentationTypes";

type Editor = {
    presentation: Presentation,
    slideSelection: string[],
    elementSelection: string[],
    interfaceState: {
        optionsBarState: OptionsBarState,
        editBarState: EditBarState,
        buffer: boolean
    }
}

type EditBarState = "slide" | "image" | "text" | "no-edit"

type OptionsBarState = "file" | "slide" | "element" | "viewmode"

export {
    type Editor,
    type EditBarState,
    type OptionsBarState
}