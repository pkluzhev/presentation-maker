import { SlideObjectProperties, type Position, type Size } from "../../types/PresentationTypes"
import { ActionType } from "../actions"

function deleteElements() {
    return {
        type: ActionType.DELETE_ELEMENTS,
    }
}

// function changeSlideObjectPosition(newPosition: Position) {
//     return {
//         type: ActionType.CHANGE_SLIDE_OBJECT_POSITION,
//         payload: newPosition
//     }
// }

// function changeSlideObjectSize(newSize: Size) {
//     return {
//         type: ActionType.CHANGE_SLIDE_OBJECT_SIZE,
//         payload: newSize
//     }
// }

function changeSlideObjectPositionAndSize(newData: SlideObjectProperties) {
    return {
        type: ActionType.CHANGE_SLIDE_OBJECT_POSITION_AND_SIZE,
        payload: newData
    }
}

function incSlideObjectLayer() {
    return {
        type: ActionType.INC_SLIDE_OBJECT_LAYER,
    }
}

function decSlideObjectLayer() {
    return {
        type: ActionType.DEC_SLIDE_OBJECT_LAYER,
    }
}

export {
    deleteElements,
    // changeSlideObjectPosition,
    // changeSlideObjectSize,
    incSlideObjectLayer,
    decSlideObjectLayer,
    changeSlideObjectPositionAndSize
}