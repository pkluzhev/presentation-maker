import { type Editor } from "../types/EditorTypes";

import { ActionType, type EditorAction } from "./actions";

import { defaultEditor } from "../test-data";

import { renderOptionsBar } from "../callbacks/renderOptionsBar";
import { openPreviewPopup } from "../callbacks/openPreviewPopup";
import { closePreviewPopup } from "../callbacks/closePreviewPopup";
import { openChangeImagePopup } from "../callbacks/openChangeImagePopup";
import { openSetSlideBackgroundImagePopup } from "../callbacks/openSetSlideBackgroundImagePopup";
import { closeSetImagePopup } from "../callbacks/closeSetImagePopup";
import { closeSetBackgroundPopup } from "../callbacks/closeSetBackgroundPopup";
import { openSetBackgroundPopup } from "../callbacks/openSetBackgroundPopup";
import { openSavePopup } from "../callbacks/openSavePopup";
import { closeSavePopup } from "../callbacks/closeSavePopup";

import { renamePresentation } from "../callbacks/renamePresentation";
import { createNewPresentation } from "../callbacks/createNewPresentation";
import { addNewSlide } from "../callbacks/addNewSlide";
import { deleteSlides } from "../callbacks/deleteSlides";
import { setSlidesOrder } from "../callbacks/setSlidesOrder";
import { setSlideBackgroundColor } from "../callbacks/setSlideBackgroundColor";
import { setSlideBackgroundImage } from "../callbacks/setSlideBackgroundImage";
import { setSlideBackgroundGradient } from "../callbacks/setSlideBackgroundGradient";

import { duplicateSlides } from "../callbacks/duplicateSlides";

import { deleteElements } from "../callbacks/deleteElements";
import { incSlideObjectLayer } from "../callbacks/incSlideObjectLayer";
import { changeSlideObjectPosition } from "../callbacks/changeSlideObjectPosition";
import { changeSlideObjectPositionAndSize } from "../callbacks/changeSlideObjectPositionAndSize";
import { addNewImage } from "../callbacks/addNewImage";
import { changeImage } from "../callbacks/changeImage";
import { addNewText } from "../callbacks/addNewText";
import { changeTextValue } from "../callbacks/changeTextValue";
import { setFontColor } from "../callbacks/setFontColor";
import { setFontWeight } from "../callbacks/setFontWeight";
import { setFontSize } from "../callbacks/setFontSize";
import { setFontFamily } from "../callbacks/setFontFamily";

import { addToSlideSelection } from "../callbacks/addToSlideSelection";
import { selectOneSlide } from "../callbacks/selectOneSlide";
import { addToElementSelection } from "../callbacks/addToElementSelection";
import { selectOneElement } from "../callbacks/selectOneElement";
import { clearElementSelection } from "../callbacks/clearElementSelection";
import { decSlideObjectLayer } from "../callbacks/decSlideObjectLayer";

import { openJSON } from "../callbacks/openJSON";

import { copyElements } from "../callbacks/copyElements";
import { pasteElements } from "../callbacks/pasteElements";

function editorReducer(editor: Editor = defaultEditor, action: EditorAction): Editor {
    switch (action.type) {
        case ActionType.ADD_TO_SLIDE_SELECTION:
            return addToSlideSelection(editor, action)
        case ActionType.SELECT_ONE_SLIDE:
            return selectOneSlide(editor, action)
        case ActionType.ADD_TO_ELEMENT_SELECTION:
            return addToElementSelection(editor, action)
        case ActionType.SELECT_ONE_ELEMENT:
            return selectOneElement(editor, action)
        case ActionType.CLEAR_ELEMENT_SELECTION:
            return clearElementSelection(editor)
        case ActionType.RENDER_OPTIONS_BAR:
            return renderOptionsBar(editor, action)
        case ActionType.OPEN_PREVIEW_POPUP:
            return openPreviewPopup(editor)
        case ActionType.CLOSE_PREVIEW_POPUP:
            return closePreviewPopup(editor)
        case ActionType.OPEN_CHANGE_IMAGE_POPUP:
            return openChangeImagePopup(editor)
        case ActionType.OPEN_SET_SLIDE_BG_IMAGE_POPUP:
            return openSetSlideBackgroundImagePopup(editor)
        case ActionType.CLOSE_SET_IMAGE_POPUP:
            return closeSetImagePopup(editor)
        case ActionType.OPEN_SET_BACKGROUND_POPUP:
            return openSetBackgroundPopup(editor)
        case ActionType.CLOSE_SET_BACKGROUND_POPUP:
            return closeSetBackgroundPopup(editor)
        case ActionType.OPEN_SAVE_POPUP:
            return openSavePopup(editor, action)
        case ActionType.CLOSE_SAVE_POPUP:
            return closeSavePopup(editor)
        case ActionType.RENAME_PRESENTATION:
            return renamePresentation(editor, action)
        case ActionType.CREATE_NEW_PRESENTATION:
            return createNewPresentation(editor)
        case ActionType.ADD_NEW_SLIDE:
            return addNewSlide(editor)
        case ActionType.DELETE_SLIDES:
            return deleteSlides(editor)
        case ActionType.SET_SLIDES_ORDER:
            return setSlidesOrder(editor, action)
        case ActionType.SET_SLIDE_BACKGROUND_COLOR:
            return setSlideBackgroundColor(editor, action)
        case ActionType.SET_SLIDE_BACKGROUND_GRADIENT:
            return setSlideBackgroundGradient(editor, action)
        case ActionType.SET_SLIDE_BACKGROUND_IMAGE:
            return setSlideBackgroundImage(editor, action)
        case ActionType.DUPLICATE_SLIDES:
            return duplicateSlides(editor)
        case ActionType.DELETE_ELEMENTS:
            return deleteElements(editor)
        case ActionType.CHANGE_SLIDE_OBJECT_POSITION:
            return changeSlideObjectPosition(editor, action)
        case ActionType.CHANGE_SLIDE_OBJECT_POSITION_AND_SIZE:
            return changeSlideObjectPositionAndSize(editor, action)
        case ActionType.ADD_NEW_IMAGE:
            return addNewImage(editor)
        case ActionType.ADD_NEW_TEXT:
            return addNewText(editor)
        case ActionType.CHANGE_TEXT_VALUE:
            return changeTextValue(editor, action)
        case ActionType.INC_SLIDE_OBJECT_LAYER:
            return incSlideObjectLayer(editor)
        case ActionType.DEC_SLIDE_OBJECT_LAYER:
            return decSlideObjectLayer(editor)
        case ActionType.CHANGE_IMAGE:
            return changeImage(editor, action)
        case ActionType.ADD_NEW_TEXT:
            return addNewText(editor)
        case ActionType.OPEN_JSON:
            return openJSON(editor, action)
        case ActionType.COPY_ELEMENTS:
            return copyElements(editor)
        case ActionType.PASTE_ELEMENTS:
            return pasteElements(editor)
        case ActionType.SET_FONT_COLOR:
            return setFontColor(editor, action)
        case ActionType.SET_FONT_WEIGHT:
            return setFontWeight(editor, action)
        case ActionType.SET_FONT_SIZE:
            return setFontSize(editor, action)
        case ActionType.SET_FONT_FAMILY:
            return setFontFamily(editor, action)
        default:
            return editor
    }
}

export {
    editorReducer,
}