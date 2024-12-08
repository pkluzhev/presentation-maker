import { ActionType } from "./actions"

function addToSlideSelection() {
    return {
        type: ActionType.ADD_TO_SLIDE_SELECTION,
    }
}

function selectOneSlide() {
    return {
        type: ActionType.SELECT_ONE_SLIDE,
    }
}

function addToElementSelection() {
    return {
        type: ActionType.ADD_TO_ELEMENT_SELECTION,
    }
}

function selectOneElement() {
    return {
        type: ActionType.SELECT_ONE_ELEMENT,
    }
}

function clearElementSelection() {
    return {
        type: ActionType.CLEAR_ELEMENT_SELECTION,
    }
}

export {
    addToSlideSelection,
    selectOneSlide,
    addToElementSelection,
    selectOneElement,
    clearElementSelection
}