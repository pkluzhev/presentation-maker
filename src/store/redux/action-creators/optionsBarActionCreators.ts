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

function openChangeImagePopup() {
    return {
        type: ActionType.OPEN_CHANGE_IMAGE_POPUP,
    }
}

function openSetSlideBackgroundImagePopup() {
    return {
        type: ActionType.OPEN_SET_SLIDE_BG_IMAGE_POPUP,
    }
}

function closeSetImagePopup() {
    return {
        type: ActionType.CLOSE_SET_IMAGE_POPUP,
    }
}

function closeSetBackgroundPopup() {
    return {
        type: ActionType.CLOSE_SET_BACKGROUND_POPUP,
    }
}

function openSetBackgroundPopup() {
    return {
        type: ActionType.OPEN_SET_BACKGROUND_POPUP,
    }
}

function openSavePopup(newType: "createNew" | "open") {
    return {
        type: ActionType.OPEN_SAVE_POPUP,
        payload: newType
    }
}

function closeSavePopup() {
    return {
        type: ActionType.CLOSE_SAVE_POPUP,
    }
}


export {
    renderOptionsBar,
    openPreviewPopup,
    closePreviewPopup,
    openChangeImagePopup,
    openSetSlideBackgroundImagePopup,
    closeSetImagePopup,
    closeSetBackgroundPopup,
    openSetBackgroundPopup,
    openSavePopup,
    closeSavePopup,
}