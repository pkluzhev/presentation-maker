import { ActionType } from "../actions"

function renamePresentation(newName: string) {
    return {
        type: ActionType.RENAME_PRESENTATION,
        payload: newName
    }
}

export {
    renamePresentation
}