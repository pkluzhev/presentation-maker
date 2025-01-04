import { type Editor } from "../types/EditorTypes";
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
                const previous = past[past.length - 1]
                console.log(previous.presentation.slides[0].objects[0].size)
                const newPast = past.slice(0, past.length - 1)
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                }
            case ActionType.REDO:
                const next = future[0]
                const newFuture = future.slice(1)
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                }
            default:
                const newPresent = editorReducer(present, action)
                if (present === newPresent) {
                    console.log('ничего не изменилось')
                    return state
                }
                if ((present.slideSelection !== newPresent.slideSelection 
                    || present.elementSelection !== newPresent.elementSelection
                    || present.interfaceState !== newPresent.interfaceState)
                    && present.presentation === newPresent.presentation) {
                    console.log('изменилось что-то, кроме презентации')
                    const newPresentModified = structuredClone(newPresent)
                    return {
                        ...state,
                        present: newPresentModified
                    }
                }
                // if (present.presentation === newPresent.presentation) {
                //     return {
                //         ...state,
                //     }
                // }
                console.log('изменилось что-то и презентация (запишем в Анду)')
                console.log(newPresent.presentation.slides[0].objects[0].size)
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