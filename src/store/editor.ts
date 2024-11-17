import { Editor } from './types/EditorTypes.ts'
import { editor } from './test-data.ts'

let _editor: Editor = editor
let _handler: Function

function getEditor() {
    return _editor
}

function setEditor(newEditor: Editor) {
    _editor = newEditor
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)

    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Function): void {
    _handler = handler
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}