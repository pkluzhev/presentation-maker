import { ActionType } from "./actions"

function renamePresentation() {
    return {
        type: ActionType.RENAME_PRESENTATION,
    }
}

export {
    renamePresentation
}