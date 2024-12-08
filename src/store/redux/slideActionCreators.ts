import { ActionType } from "./actions"

function addNewSlide() {
    return {
        type: ActionType.ADD_NEW_SLIDE,
    }
}

function deleteSlides() {
    return {
        type: ActionType.DELETE_SLIDES,
    }
}

function setSlidesOrder() {
    return {
        type: ActionType.SET_SLIDES_ORDER,
    }
}

function setSlideBackgroundColor() {
    return {
        type: ActionType.SET_SLIDE_BACKGROUND_COLOR,
    }
}

function setSlideBackgroundImage() {
    return {
        type: ActionType.SET_SLIDE_BACKGROUND_IMAGE,
    }
}

export {
    addNewSlide,
    deleteSlides,
    setSlidesOrder,
    setSlideBackgroundColor,
    setSlideBackgroundImage
}