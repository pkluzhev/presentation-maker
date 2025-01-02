import { ActionType } from "../actions"

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

function setSlidesOrder(draggableSlides: { dragSlideId: string, dropSlideId: string }) {
    return {
        type: ActionType.SET_SLIDES_ORDER,
        payload: draggableSlides
    }
}

function setSlideBackgroundColor(backgroundColor: string) {
    return {
        type: ActionType.SET_SLIDE_BACKGROUND_COLOR,
        payload: backgroundColor
    }
}

function setSlideBackgroundImage(backgroundImage: string) {
    return {
        type: ActionType.SET_SLIDE_BACKGROUND_IMAGE,
        payload: backgroundImage
    }
}

export {
    addNewSlide,
    deleteSlides,
    setSlidesOrder,
    setSlideBackgroundColor,
    setSlideBackgroundImage
}