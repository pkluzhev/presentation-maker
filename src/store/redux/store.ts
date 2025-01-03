import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { undoableReducer } from "./undoableReducer";
import { thunk } from 'redux-thunk'
import { editorReducer } from "./editorReducer";

const store = createStore(undoableReducer(editorReducer), applyMiddleware(thunk))

export {
    store
}