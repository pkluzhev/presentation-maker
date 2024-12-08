import { ActionType } from "./actions"

function deleteElements() {
    return {
        type: ActionType.DELETE_ELEMENTS,
    }
}

function changeSlideObjectPosition() {
    return {
        type: ActionType.CHANGE_SLIDE_OBJECT_POSITION,
    }
}

function changeSlideObjectSize() {
    return {
        type: ActionType.CHANGE_SLIDE_OBJECT_SIZE,
    }
}

function incSlideObjectLayer() {
    return {
        type: ActionType.INC_SLIDE_OBJECT_LAYER,
    }
}

export {
    deleteElements,
    changeSlideObjectPosition,
    changeSlideObjectSize,
    incSlideObjectLayer,
}