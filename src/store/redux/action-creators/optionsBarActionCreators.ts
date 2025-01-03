import { OptionsBarState } from "../../types/EditorTypes"
import { ActionType } from "../actions"

function renderOptionsBar(newState: OptionsBarState) {
    return {
        type: ActionType.RENDER_OPTIONS_BAR,
        payload: newState
    }
}

function openPreviewPopup() {
    return {
        type: ActionType.OPEN_PREVIEW_POPUP,
    }
}

function closePreviewPopup() {
    return {
        type: ActionType.CLOSE_PREVIEW_POPUP,
    }
}

export {
    renderOptionsBar,
    openPreviewPopup,
    closePreviewPopup
}