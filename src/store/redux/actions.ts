import { type Editor } from "../types/EditorTypes"

enum ActionType {
    SET_EDITOR = 'setEditor',

    RENAME_PRESENTATION = 'renamePresentation',

    ADD_NEW_SLIDE = 'addNewSlide',
    DELETE_SLIDES = 'deleteSlides',
    SET_SLIDES_ORDER = 'setSlidesOrder',
    SET_SLIDE_BACKGROUND_COLOR = 'setSlideBackgroundColor',
    SET_SLIDE_BACKGROUND_IMAGE = 'setSlideBackgroundImage',

    DELETE_ELEMENTS = 'deleteElements',
    CHANGE_SLIDE_OBJECT_POSITION = 'changeSlideObjectPosition',
    CHANGE_SLIDE_OBJECT_SIZE = 'changeSlideObjectSize',
    INC_SLIDE_OBJECT_LAYER = 'incSlideObjectLayer',

    ADD_NEW_IMAGE = 'addNewImage',
    CHANGE_IMAGE = 'changeImage',

    ADD_NEW_TEXT = 'addNewText',
    CHANGE_TEXT_VALUE = 'changeTextValue',

    ADD_TO_SLIDE_SELECTION = 'addToSlideSelection',
    SELECT_ONE_SLIDE = 'selectOneSlide',
    ADD_TO_ELEMENT_SELECTION = 'addToElementSelection',
    SELECT_ONE_ELEMENT = 'selectOneElement',
    CLEAR_ELEMENT_SELECTION = 'clearElementSelection',
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: Editor,
}

type RenamePresentationAction = {
    type: ActionType.RENAME_PRESENTATION,
}

type AddNewSlideAction = {
    type: ActionType.ADD_NEW_SLIDE,
}

type DeleteSlidesAction = {
    type: ActionType.DELETE_SLIDES,
}

type SetSlidesOrderAction = {
    type: ActionType.SET_SLIDES_ORDER,
}

type SetSlideBackgroundColorAction = {
    type: ActionType.SET_SLIDE_BACKGROUND_COLOR,
}

type SetSlideBackgroundImageAction = {
    type: ActionType.SET_SLIDE_BACKGROUND_IMAGE,
}

type DeleteElementsAction = {
    type: ActionType.DELETE_ELEMENTS,
}

type ChangeSlideObjectPositionAction = {
    type: ActionType.CHANGE_SLIDE_OBJECT_POSITION,
}

type ChangeSlideObjectSizeAction = {
    type: ActionType.CHANGE_SLIDE_OBJECT_SIZE,
}

type IncSlideObjectLayerAction = {
    type: ActionType.INC_SLIDE_OBJECT_LAYER,
}

type AddNewImageAction = {
    type: ActionType.ADD_NEW_IMAGE,
}

type ChangeImageAction = {
    type: ActionType.CHANGE_IMAGE,
}

type AddNewTextAction = {
    type: ActionType.ADD_NEW_TEXT,
}

type ChangeTextValueAction = {
    type: ActionType.CHANGE_TEXT_VALUE,
}

type AddToSlideSelectionAction = {
    type: ActionType.ADD_TO_SLIDE_SELECTION,
}

type SelectOneSlideAction = {
    type: ActionType.SELECT_ONE_SLIDE,
}

type AddToElementSelectionAction = {
    type: ActionType.ADD_TO_ELEMENT_SELECTION,
}

type SelectOneElementAction = {
    type: ActionType.SELECT_ONE_ELEMENT,
}

type ClearElementSelectionAction = {
    type: ActionType.CLEAR_ELEMENT_SELECTION,
}

type EditorAction = SetEditorAction | RenamePresentationAction 
| AddNewSlideAction | DeleteSlidesAction | SetSlidesOrderAction | SetSlideBackgroundColorAction 
| SetSlideBackgroundImageAction | DeleteElementsAction | ChangeSlideObjectPositionAction | ChangeSlideObjectSizeAction
| IncSlideObjectLayerAction | AddNewImageAction | ChangeImageAction | AddNewTextAction | ChangeTextValueAction 
| AddToSlideSelectionAction | SelectOneSlideAction | AddToElementSelectionAction | SelectOneElementAction 
| ClearElementSelectionAction

export {
    ActionType,
    type EditorAction,
}