import { ActionType } from "./actions"

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

export {
    addNewImage,
    changeImage,
}