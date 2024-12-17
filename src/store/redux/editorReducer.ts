import { type Editor } from "../types/EditorTypes";
import { ActionType, type EditorAction } from "./actions";
import { defaultEditor } from "../test-data";

import { renderOptionsBar } from "../renderOptionsBar";
import { renamePresentation } from "../renamePresentation";

import { addNewSlide } from "../addNewSlide";
import { deleteSlides } from "../deleteSlides";
import { setSlidesOrder } from "../setSlidesOrder";
import { setSlideBackgroundColor } from "../setSlideBackgroundColor";
import { setSlideBackgroundImage } from "../setSlideBackgroundImage";

import { deleteElements } from "../deleteElements";
import { changeSlideObjectPosition } from "../changeSlideObjectPosition";
import { changeSlideObjectSize } from "../changeSlideObjectSize";
import { incSlideObjectLayer } from "../incSlideObjectLayer";

import { addNewImage } from "../addNewImage";
import { changeImage } from "../changeImage";

import { addNewText } from "../addNewText";
import { changeTextValue } from "../changeTextValue";

import { addToSlideSelection } from "../addToSlideSelection";
import { selectOneSlide } from "../selectOneSlide";
import { addToElementSelection } from "../addToElementSelection";
import { selectOneElement } from "../selectOneElement";
import { clearElementSelection } from "../clearElementSelection";
import { decSlideObjectLayer } from "../decSlideObjectLayer";

import { saveJSON } from "../saveJSON";
import { openJSON } from "../openJSON";


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
        case ActionType.RENAME_PRESENTATION:
            return renamePresentation(editor, action)
        case ActionType.ADD_NEW_SLIDE:
            return addNewSlide(editor)
        case ActionType.DELETE_SLIDES:
            return deleteSlides(editor)
        case ActionType.SET_SLIDES_ORDER:
            return setSlidesOrder(editor, action)
        case ActionType.SET_SLIDE_BACKGROUND_COLOR:
            return setSlideBackgroundColor(editor, action)
        case ActionType.SET_SLIDE_BACKGROUND_IMAGE:
            return setSlideBackgroundImage(editor, action)
        case ActionType.DELETE_ELEMENTS:
            return deleteElements(editor)
        case ActionType.CHANGE_SLIDE_OBJECT_POSITION:
            return changeSlideObjectPosition(editor, action)
        case ActionType.CHANGE_SLIDE_OBJECT_SIZE:
            return changeSlideObjectSize(editor, action)
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
        case ActionType.SAVE_JSON:
            return saveJSON(editor)
        case ActionType.OPEN_JSON:
            return openJSON(editor, action)
        // case ActionType.SET_EDITOR:
        //     return action.payload
        default:
            return editor
    }
}

export {
    editorReducer,
}