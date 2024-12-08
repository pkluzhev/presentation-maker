import { ActionType } from "./actions"

function addNewImage() {
    return {
        type: ActionType.ADD_NEW_IMAGE,
    }
}

function changeImage() {
    return {
        type: ActionType.CHANGE_IMAGE,
    }
}

export {
    addNewImage,
    changeImage,
}