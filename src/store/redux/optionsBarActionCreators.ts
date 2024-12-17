import { OptionsBarState } from "../types/EditorTypes"
import { ActionType } from "./actions"

function renderOptionsBar(newState: OptionsBarState) {
    return {
        type: ActionType.RENDER_OPTIONS_BAR,
        payload: newState
    }
}

export {
    renderOptionsBar,
}