import { type Editor } from "../types/EditorTypes";
import { ActionType, type EditorAction } from "./actions";
import { defaultEditor } from "../test-data";

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

function editorReducer(editor: Editor = defaultEditor, action: EditorAction): Editor {
    switch (action.type) {
        case ActionType.RENAME_PRESENTATION: 
            return renamePresentation(editor, action)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)
        case ActionType.SET_SELECTION: 
            return setSelection(editor, action)
        case ActionType.SET_EDITOR:
            return action.payload
        default:
            return editor
    }
}

export {
    editorReducer,
}