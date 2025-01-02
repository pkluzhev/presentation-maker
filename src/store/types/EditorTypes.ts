import { Presentation, Slide, TextObject, ImageObject } from "./PresentationTypes";
// import { EditorAction, UndoableAction } from "../redux/actions";

type Editor = {
    presentation: Presentation,
    slideSelection: string[],
    elementSelection: string[],
    interfaceState: {
        optionsBarState: OptionsBarState,
        editBarState: EditBarState,
    }
    // slideBuffer: Slide[],
    // elementBuffer: TextObject[] | ImageObject[]
}

type EditBarState = "slide" | "image" | "text" | "no-edit"

type OptionsBarState = "file" | "slide" | "element" | "viewmode"

export {
    type Editor,
    type EditBarState,
    type OptionsBarState
}