import { ActionType } from "../actions"

function addToSlideSelection(slideId: string) {
    return {
        type: ActionType.ADD_TO_SLIDE_SELECTION,
        payload: slideId
    }
}

function selectOneSlide(slideId: string) {
    return {
        type: ActionType.SELECT_ONE_SLIDE,
        payload: slideId
    }
}

function addToElementSelection(objectId: string) {
    return {
        type: ActionType.ADD_TO_ELEMENT_SELECTION,
        payload: objectId
    }
}

function selectOneElement(objectId: string) {
    return {
        type: ActionType.SELECT_ONE_ELEMENT,
        payload: objectId
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