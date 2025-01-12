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

function setSlidesOrder(draggableSlides: { dragSlideId: string[], dropSlideId: string }) {
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

function duplicateSlides() {
    return {
        type: ActionType.DUPLICATE_SLIDES,
    }
}

function setSlideBackgroundGradient(color1: string, color2: string, tilt: number) {
    return {
        type: ActionType.SET_SLIDE_BACKGROUND_GRADIENT,
        payload: { color1, color2, tilt }
    }
}

export {
    addNewSlide,
    deleteSlides,
    setSlidesOrder,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    duplicateSlides,
    setSlideBackgroundGradient
}