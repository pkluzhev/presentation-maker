import { ActionType } from "../actions"

function renamePresentation(newName: string) {
    return {
        type: ActionType.RENAME_PRESENTATION,
        payload: newName
    }
}

function createNewPresentation() {
    return {
        type: ActionType.CREATE_NEW_PRESENTATION,
    }
}

export {
    renamePresentation,
    createNewPresentation
}