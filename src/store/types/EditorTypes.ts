import { Presentation, TextObject, ImageObject } from "./PresentationTypes";

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
        isSetSlideBackgroundPopupActive: boolean,
        savePopupState: SavePopupState
    }
    elementBuffer: (TextObject | ImageObject)[]
}

type EditBarState = "slide" | "image" | "text" | "no-edit"

type OptionsBarState = "file" | "slide" | "element" | "viewmode"

type SavePopupState = {
    type: "createNew" | "open",
    isActive: boolean
}

export {
    type Editor,
    type EditBarState,
    type OptionsBarState,
    type SavePopupState,
}