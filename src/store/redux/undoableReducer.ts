import { type Editor } from "../types/EditorTypes";
import { ImageObject, TextObject } from "../types/PresentationTypes";
import { ActionType, type EditorAction } from "./actions";

function undoableReducer(editorReducer: (editor: Editor | undefined, action: EditorAction) => Editor) {
    const undoStack: Editor[] = [];
    const redoStack: Editor[] = [];

    const initialState = {
        past: undoStack,
        present: editorReducer(undefined, { type: ActionType.DO_NOTHING }),
        future: redoStack
    }

    return function (state = initialState, action: EditorAction) {
        const { past, present, future } = state

        switch (action.type) {
            case ActionType.UNDO:
                // const previous: Editor = past[past.length - 1]
                const previous: Editor = structuredClone(past[past.length - 1])
                const bufferForPrevious: (TextObject | ImageObject)[] = structuredClone(present.elementBuffer)
                previous.elementBuffer = bufferForPrevious
                previous.interfaceState.optionsBarState = "file"
                previous.interfaceState.editBarState = "no-edit"
                previous.interfaceState.isPreviewActive = false
                previous.interfaceState.isChangeImagePopupActive = false
                previous.interfaceState.isSetSlideBackgroundImagePopupActive = false
                previous.interfaceState.isSavePopupActive = false
                const newPast = past.slice(0, past.length - 1)
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                }
            case ActionType.REDO:
                // const next = future[0]
                const next: Editor = structuredClone(future[0])
                const bufferForNext: (TextObject | ImageObject)[] = structuredClone(present.elementBuffer)
                next.elementBuffer = bufferForNext
                next.interfaceState.optionsBarState = "file"
                next.interfaceState.editBarState = "no-edit"
                next.interfaceState.isPreviewActive = false
                next.interfaceState.isChangeImagePopupActive = false
                next.interfaceState.isSetSlideBackgroundImagePopupActive = false
                next.interfaceState.isSavePopupActive = false
                const newFuture = future.slice(1)
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                }
            default:
                const newPresent = editorReducer(present, action)
                if (present === newPresent) {
                    // console.log('ничего не изменилось')
                    return state
                }
                if ((present.slideSelection !== newPresent.slideSelection 
                    || present.elementSelection !== newPresent.elementSelection
                    || present.interfaceState !== newPresent.interfaceState)
                    && present.presentation === newPresent.presentation) {
                    // console.log('изменилось что-то, кроме презентации')
                    const newPresentModified = structuredClone(newPresent)
                    return {
                        ...state,
                        present: newPresentModified
                    }
                }
                // console.log('изменилось что-то и презентация (запишем в Анду)')
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                }
        }
    }
}

export {
    undoableReducer,
}