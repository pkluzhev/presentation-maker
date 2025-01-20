import { Scale } from "../../types/PresentationTypes"
import { ActionType } from "../actions"

function addNewImage() {
    return {
        type: ActionType.ADD_NEW_IMAGE,
    }
}

function changeImage(newImage: string) {
    return {
        type: ActionType.CHANGE_IMAGE,
        payload: newImage
    }
}

function changeVerticalScale() {
    return {
        type: ActionType.CHANGE_VERTICAL_SCALE,
    }
}

function changeHorizontalScale() {
    return {
        type: ActionType.CHANGE_HORIZONTAL_SCALE,
    }
}

export {
    addNewImage,
    changeImage,
    changeVerticalScale,
    changeHorizontalScale
}