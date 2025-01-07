import { Presentation, Slide, TextObject, ImageObject } from "./PresentationTypes";

type Editor = {
    presentation: Presentation,
    slideSelection: string[],
    elementSelection: string[],
    interfaceState: {
        optionsBarState: OptionsBarState,
        editBarState: EditBarState,
        isPreviewActive: boolean,
        isChangeImagePopupActive: boolean,
        isSetSlideBackgroundImagePopupActive: boolean,
    }
    elementBuffer: (TextObject | ImageObject)[]
}

type EditBarState = "slide" | "image" | "text" | "no-edit"

type OptionsBarState = "file" | "slide" | "element" | "viewmode"

export {
    type Editor,
    type EditBarState,
    type OptionsBarState
}