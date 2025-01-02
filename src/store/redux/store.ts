import { legacy_createStore as createStore } from "redux";
import { undoableReducer } from "./undoableReducer";
import { editorReducer } from "./editorReducer";

const store = createStore(undoableReducer(editorReducer))

export {
    store
}