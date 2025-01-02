import * as EditorActionCreators from './editorActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as PresentationActionCreators from './presentationActionCreators'
import * as SlideActionCreators from './slideActionCreators'
import * as ElementActionCreators from './elementActionCreators'
import * as ImageActionCreators from './imageActionCreators'
import * as TextActionCreators from './textActionCreators'
import * as OptionsBarActionCreators from './optionsBarActionCreators'

export default {
    ...EditorActionCreators,
    ...SelectionActionCreators,
    ...PresentationActionCreators,
    ...SlideActionCreators,
    ...ElementActionCreators,
    ...ImageActionCreators,
    ...TextActionCreators,
    ...OptionsBarActionCreators,
}