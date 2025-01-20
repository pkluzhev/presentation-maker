import { OptionsBarState, type Editor } from "../types/EditorTypes"
import { Position, Presentation, SlideObjectProperties, Scale } from "../types/PresentationTypes"

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
    OPEN_SET_BACKGROUND_POPUP = 'openSetBackgroundPopup',
    CLOSE_SET_BACKGROUND_POPUP = 'closeSetBackgroundPopup',
    OPEN_SAVE_POPUP = 'openSavePopup',
    CLOSE_SAVE_POPUP = 'closeSavePopup',

    OPEN_JSON = 'openJSON',

    RENAME_PRESENTATION = 'renamePresentation',
    CREATE_NEW_PRESENTATION = 'createNewPresentation',

    ADD_NEW_SLIDE = 'addNewSlide',
    DELETE_SLIDES = 'deleteSlides',
    SET_SLIDES_ORDER = 'setSlidesOrder',
    SET_SLIDE_BACKGROUND_COLOR = 'setSlideBackgroundColor',
    SET_SLIDE_BACKGROUND_GRADIENT = 'setSlideBackgroundGradient',
    SET_SLIDE_BACKGROUND_IMAGE = 'setSlideBackgroundImage',
    DUPLICATE_SLIDES = 'duplicateSlides',

    DELETE_ELEMENTS = 'deleteElements',
    CHANGE_SLIDE_OBJECT_POSITION = 'changeSlideObjectPosition',
    CHANGE_SLIDE_OBJECT_POSITION_AND_SIZE = 'changeSlideObjectPositionAndSize',
    INC_SLIDE_OBJECT_LAYER = 'incSlideObjectLayer',
    DEC_SLIDE_OBJECT_LAYER = 'decSlideObjectLayer',

    COPY_ELEMENTS = 'copyElements',
    PASTE_ELEMENTS = 'pasteElements',

    ADD_NEW_IMAGE = 'addNewImage',
    CHANGE_IMAGE = 'changeImage',
    CHANGE_HORIZONTAL_SCALE = 'changeHorizontalScale',
    CHANGE_VERTICAL_SCALE = 'changeVerticalScale',

    ADD_NEW_TEXT = 'addNewText',
    CHANGE_TEXT_VALUE = 'changeTextValue',
    SET_FONT_COLOR = 'setFontColor',
    SET_FONT_WEIGHT = 'setFontWeight',
    SET_FONT_SIZE = 'setFontSize',
    SET_FONT_FAMILY = 'setFontFamily',
    SET_TEXT_ALIGN = 'setTextAlign',

    ADD_TO_SLIDE_SELECTION = 'addToSlideSelection',
    SELECT_ONE_SLIDE = 'selectOneSlide',
    ADD_TO_ELEMENT_SELECTION = 'addToElementSelection',
    SELECT_ONE_ELEMENT = 'selectOneElement',
    CLEAR_ELEMENT_SELECTION = 'clearElementSelection',

    IMPORT_IMAGE_ASYNC = 'importImageAsync',
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

type OpenSetBackgroundPopupAction = {
    type: ActionType.OPEN_SET_BACKGROUND_POPUP,
}

type CloseSetBackgroundPopupAction = {
    type: ActionType.CLOSE_SET_BACKGROUND_POPUP,
}

type OpenSavePopupAction = {
    type: ActionType.OPEN_SAVE_POPUP,
    payload: "createNew" | "open"
}

type CloseSavePopupAction = {
    type: ActionType.CLOSE_SAVE_POPUP,
}

type RenamePresentationAction = {
    type: ActionType.RENAME_PRESENTATION,
    payload: string
}

type CreateNewPresentationAction = {
    type: ActionType.CREATE_NEW_PRESENTATION,
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

type SetSlideBackgroundGradientAction = {
    type: ActionType.SET_SLIDE_BACKGROUND_GRADIENT,
    payload: { color1: string, color2: string, tilt: number }
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

type ChangeSlideObjectPositionAction = {
    type: ActionType.CHANGE_SLIDE_OBJECT_POSITION,
    payload: Position
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
    payload: {elementId: string, newValue: string}
}

type SetFontColorAction = {
    type: ActionType.SET_FONT_COLOR,
    payload: string
}

type SetFontWeightAction = {
    type: ActionType.SET_FONT_WEIGHT,
    payload: number
}

type SetFontSizeAction = {
    type: ActionType.SET_FONT_SIZE,
    payload: number
}

type SetFontFamilyAction = {
    type: ActionType.SET_FONT_FAMILY,
    payload: string
}

type SetTextAlignAction = {
    type: ActionType.SET_TEXT_ALIGN,
    payload: "left" | "center" | "right",
}

type ChangeHorizontalScaleAction = {
    type: ActionType.CHANGE_HORIZONTAL_SCALE,
}

type ChangeVerticalScaleAction = {
    type: ActionType.CHANGE_VERTICAL_SCALE,
}

type openJSONAction = {
    type: ActionType.OPEN_JSON,
    payload: Presentation
}

type CopyElementsAction = {
    type: ActionType.COPY_ELEMENTS,
}

type PasteElementsAction = {
    type: ActionType.PASTE_ELEMENTS,
}

type EditorAction = UndoAction | RedoAction | EmptyAction | RenamePresentationAction
    | AddNewSlideAction | DeleteSlidesAction | SetSlidesOrderAction | SetSlideBackgroundColorAction
    | SetSlideBackgroundImageAction | DeleteElementsAction
    | IncSlideObjectLayerAction | DecSlideObjectLayerAction | AddNewImageAction | ChangeImageAction | AddNewTextAction 
    | ChangeTextValueAction
    | AddToSlideSelectionAction | SelectOneSlideAction | AddToElementSelectionAction | SelectOneElementAction
    | ClearElementSelectionAction | RenderOptionsBarAction | openJSONAction | ChangeSlideObjectPositionAndSizeAction
    | OpenPreviewPopupAction | ClosePreviewPopupAction | OpenChangeImagePopupAction
    | OpenSetSlideBackgroundImagePopupAction | CloseSetImagePopupAction | DuplicateSlidesAction | ChangeSlideObjectPositionAction 
    | CopyElementsAction | PasteElementsAction
    | SetFontColorAction | SetFontWeightAction | SetFontSizeAction | SetFontFamilyAction | CloseSetBackgroundPopupAction 
    | OpenSetBackgroundPopupAction | SetSlideBackgroundGradientAction
    | OpenSavePopupAction | CloseSavePopupAction | CreateNewPresentationAction | SetTextAlignAction | ChangeHorizontalScaleAction
    | ChangeVerticalScaleAction

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
    type openJSONAction,
    type ClearElementSelectionAction,
    type ChangeSlideObjectPositionAndSizeAction,
    type ChangeSlideObjectPositionAction,
    type DuplicateSlidesAction,
    type SetFontColorAction,
    type SetFontWeightAction,
    type SetFontSizeAction,
    type SetFontFamilyAction,
    type CopyElementsAction,
    type PasteElementsAction,
    type CloseSetBackgroundPopupAction,
    type OpenSetBackgroundPopupAction,
    type SetSlideBackgroundGradientAction,
    type OpenSavePopupAction,
    type CloseSavePopupAction,
    type CreateNewPresentationAction,
    type SetTextAlignAction,
    type ChangeHorizontalScaleAction,
    type ChangeVerticalScaleAction
}