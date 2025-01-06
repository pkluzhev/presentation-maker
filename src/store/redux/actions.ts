import { OptionsBarState, type Editor } from "../types/EditorTypes"
import { Presentation, SlideObjectProperties } from "../types/PresentationTypes"

enum ActionType {
    DO_NOTHING = '',

    UNDO = 'unDo',
    REDO = 'reDo',

    RENDER_OPTIONS_BAR = 'renderOptionsBar',
    OPEN_PREVIEW_POPUP = 'openPreviewPopup',
    CLOSE_PREVIEW_POPUP = 'closePreviewPopup',
    OPEN_CHANGE_IMAGE_POPUP = 'openChangeImagePopup',
    OPEN_SET_SLIDE_BG_IMAGE_POPUP = 'openSetSlideBackgroundImagePopup',
    CLOSE_SET_IMAGE_POPUP = 'closeSetImagePopup',

    OPEN_JSON = 'openJSON',
    SAVE_JSON = 'saveJSON',

    RENAME_PRESENTATION = 'renamePresentation',

    ADD_NEW_SLIDE = 'addNewSlide',
    DELETE_SLIDES = 'deleteSlides',
    SET_SLIDES_ORDER = 'setSlidesOrder',
    SET_SLIDE_BACKGROUND_COLOR = 'setSlideBackgroundColor',
    SET_SLIDE_BACKGROUND_IMAGE = 'setSlideBackgroundImage',
    DUPLICATE_SLIDES = 'duplicateSlides',

    DELETE_ELEMENTS = 'deleteElements',
    CHANGE_SLIDE_OBJECT_POSITION_AND_SIZE = 'changeSlideObjectPositionAndSize',
    INC_SLIDE_OBJECT_LAYER = 'incSlideObjectLayer',
    DEC_SLIDE_OBJECT_LAYER = 'decSlideObjectLayer',

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

type UndoAction = {
    type: ActionType.UNDO,
    payload: Editor,
}

type RedoAction = {
    type: ActionType.REDO,
    payload: Editor,
}

type EmptyAction = {
    type: ActionType.DO_NOTHING,
}

type AddToSlideSelectionAction = {
    type: ActionType.ADD_TO_SLIDE_SELECTION,
    payload: string
}

type SelectOneSlideAction = {
    type: ActionType.SELECT_ONE_SLIDE,
    payload: string
}

type AddToElementSelectionAction = {
    type: ActionType.ADD_TO_ELEMENT_SELECTION,
    payload: string
}

type SelectOneElementAction = {
    type: ActionType.SELECT_ONE_ELEMENT,
    payload: string
}

type ClearElementSelectionAction = {
    type: ActionType.CLEAR_ELEMENT_SELECTION,
}

type RenderOptionsBarAction = {
    type: ActionType.RENDER_OPTIONS_BAR,
    payload: OptionsBarState
}

type OpenPreviewPopupAction = {
    type: ActionType.OPEN_PREVIEW_POPUP,
}

type ClosePreviewPopupAction = {
    type: ActionType.CLOSE_PREVIEW_POPUP,
}

type OpenChangeImagePopupAction = {
    type: ActionType.OPEN_CHANGE_IMAGE_POPUP,
}

type OpenSetSlideBackgroundImagePopupAction = {
    type: ActionType.OPEN_SET_SLIDE_BG_IMAGE_POPUP,
}

type CloseSetImagePopupAction = {
    type: ActionType.CLOSE_SET_IMAGE_POPUP,
}

type RenamePresentationAction = {
    type: ActionType.RENAME_PRESENTATION,
    payload: string
}

type AddNewSlideAction = {
    type: ActionType.ADD_NEW_SLIDE,
}

type DeleteSlidesAction = {
    type: ActionType.DELETE_SLIDES,
}

type SetSlidesOrderAction = {
    type: ActionType.SET_SLIDES_ORDER,
    payload: { dragSlideId: string[], dropSlideId: string }
}

type SetSlideBackgroundColorAction = {
    type: ActionType.SET_SLIDE_BACKGROUND_COLOR,
    payload: string
}

type SetSlideBackgroundImageAction = {
    type: ActionType.SET_SLIDE_BACKGROUND_IMAGE,
    payload: string
}

type DuplicateSlidesAction = {
    type: ActionType.DUPLICATE_SLIDES,
}

type DeleteElementsAction = {
    type: ActionType.DELETE_ELEMENTS,
}

type ChangeSlideObjectPositionAndSizeAction = {
    type: ActionType.CHANGE_SLIDE_OBJECT_POSITION_AND_SIZE,
    payload: SlideObjectProperties
}

type IncSlideObjectLayerAction = {
    type: ActionType.INC_SLIDE_OBJECT_LAYER,
}

type DecSlideObjectLayerAction = {
    type: ActionType.DEC_SLIDE_OBJECT_LAYER,
}

type AddNewImageAction = {
    type: ActionType.ADD_NEW_IMAGE,
}

type ChangeImageAction = {
    type: ActionType.CHANGE_IMAGE,
    payload: string
}

type AddNewTextAction = {
    type: ActionType.ADD_NEW_TEXT,
}

type ChangeTextValueAction = {
    type: ActionType.CHANGE_TEXT_VALUE,
    payload: string
}

type saveJSONAction = {
    type: ActionType.SAVE_JSON,
}

type openJSONAction = {
    type: ActionType.OPEN_JSON,
    payload: Presentation
}

type EditorAction = UndoAction | RedoAction | EmptyAction | RenamePresentationAction
    | AddNewSlideAction | DeleteSlidesAction | SetSlidesOrderAction | SetSlideBackgroundColorAction
    | SetSlideBackgroundImageAction | DeleteElementsAction
    | IncSlideObjectLayerAction | DecSlideObjectLayerAction | AddNewImageAction | ChangeImageAction | AddNewTextAction | ChangeTextValueAction
    | AddToSlideSelectionAction | SelectOneSlideAction | AddToElementSelectionAction | SelectOneElementAction
    | ClearElementSelectionAction | RenderOptionsBarAction | saveJSONAction | openJSONAction | ChangeSlideObjectPositionAndSizeAction
    | OpenPreviewPopupAction | ClosePreviewPopupAction | OpenChangeImagePopupAction
    | OpenSetSlideBackgroundImagePopupAction | CloseSetImagePopupAction | DuplicateSlidesAction

export {
    ActionType,
    type UndoAction,
    type RedoAction,
    type EmptyAction,
    type EditorAction,
    type AddToSlideSelectionAction,
    type SelectOneSlideAction,
    type AddToElementSelectionAction,
    type SelectOneElementAction,
    type RenamePresentationAction,
    type SetSlidesOrderAction,
    type SetSlideBackgroundColorAction,
    type SetSlideBackgroundImageAction,
    type ChangeImageAction,
    type AddNewImageAction,
    type AddNewTextAction,
    type ChangeTextValueAction,
    type IncSlideObjectLayerAction,
    type DecSlideObjectLayerAction,
    type RenderOptionsBarAction,
    type OpenPreviewPopupAction,
    type ClosePreviewPopupAction,
    type OpenChangeImagePopupAction,
    type OpenSetSlideBackgroundImagePopupAction,
    type CloseSetImagePopupAction,
    type saveJSONAction,
    type openJSONAction,
    type ClearElementSelectionAction,
    type ChangeSlideObjectPositionAndSizeAction,
    type DuplicateSlidesAction,
}