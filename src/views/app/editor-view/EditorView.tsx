import styles from './EditorView.module.css'
import { useEffect } from 'react'
import { TopPanel } from '../editor-view/top-panel/TopPanel'
import { LeftPanel } from '../editor-view/left-panel/LeftPanel'
import { WorkSpace } from '../editor-view/workspace/WorkSpace'
import { PreviewPopup } from '../editor-view/preview-popup/PreviewPopup'
import { SetImagePopup } from '../editor-view/set-image-popup/SetImagePopup'
import { useAppActions } from "../../../views/hooks/useAppActions";

import {
  usePastSelector,
  useFutureSelector,
  useIsPreviewActiveSelector,
  useIsChangeImagePopupActiveSelector,
  useIsSetSlideBackgroundImagePopupActiveSelector,
  usePresentationSelector
} from "../../../views/hooks/useAppSelector";

import { Editor } from "../../../store/types/EditorTypes";
import { saveToLocalStorage } from "../../../store/callbacks/saveToLocalStorage.ts";

const EditorView = () => {
  const { clearElementSelection } = useAppActions()

  const statePast = usePastSelector()
  const stateFuture = useFutureSelector()

  const { setPastEditor } = useAppActions()
  const { setFutureEditor } = useAppActions()

  const statePreview = useIsPreviewActiveSelector()
  const stateChangeImagePopup = useIsChangeImagePopupActiveSelector()
  const stateSetSlideBackgroundImagePopup = useIsSetSlideBackgroundImagePopupActiveSelector()

  const presentation = usePresentationSelector()

  const onUndo = () => {
    if (statePast.length > 0) {
      let newState: Editor = statePast[statePast.length - 1]
      setPastEditor(newState)
    }
  }

  const onRedo = () => {
    if (stateFuture.length > 0) {
      let newState: Editor = stateFuture[stateFuture.length - 1]
      setFutureEditor(newState)
    }
  }

  function onSavePresentationToLocalStorage() {
    saveToLocalStorage(presentation)
  }

  const onHandleKeyboardEvents = (event: KeyboardEvent) => {
    if ((event.key === "Escape" || event.keyCode === 27) && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      clearElementSelection()
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 90) {
      onUndo()
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 89) {
      onRedo()
    }
    if ((event.shiftKey || event.metaKey) && event.keyCode === 83) {
      onSavePresentationToLocalStorage()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onHandleKeyboardEvents);

    return () => window.removeEventListener('keydown', onHandleKeyboardEvents);
  }, [onHandleKeyboardEvents]);

  return (
    <div className={styles.editorSpace}>
      <TopPanel />
      <div className={styles.mainSpace}>
        <LeftPanel />
        <WorkSpace />
      </div>
      {statePreview &&
        <PreviewPopup />
      }
      {(stateChangeImagePopup || stateSetSlideBackgroundImagePopup) &&
        <SetImagePopup />
      }
    </div>
  )
}

export default EditorView