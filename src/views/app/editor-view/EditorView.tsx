import styles from './EditorView.module.css'
import { useEffect } from 'react'
import { TopPanel } from '../editor-view/top-panel/TopPanel'
import { LeftPanel } from '../editor-view/left-panel/LeftPanel'
import { WorkSpace } from '../editor-view/workspace/WorkSpace'
import { PreviewPopup } from '../editor-view/preview-popup/PreviewPopup'
import { SetImagePopup } from '../editor-view/set-image-popup/SetImagePopup'
import { useAppActions } from "../../../views/hooks/useAppActions";
import { usePastSelector, useFutureSelector, useIsPreviewActiveSelector, useIsChangeImagePopupActiveSelector, useIsSetSlideBackgroundImagePopupActiveSelector } from "../../../views/hooks/useAppSelector";
import { Editor } from "../../../store/types/EditorTypes";

function EditorView() {
  const { clearElementSelection } = useAppActions()
  const { setPastEditor } = useAppActions()
  const { setFutureEditor } = useAppActions()

  const statePast = usePastSelector()
  const stateFuture = useFutureSelector()

  const statePreview = useIsPreviewActiveSelector()
  const stateChangeImagePopup = useIsChangeImagePopupActiveSelector()
  const stateSetSlideBackgroundImagePopup = useIsSetSlideBackgroundImagePopupActiveSelector()

  function onUndo() {
    console.log('undo')
    console.log(statePast, ' ', stateFuture)

    let newState: Editor
    if (statePast.length > 0) {
      newState = statePast[statePast.length - 1]
      setPastEditor(newState)
    }
  }

  function onRedo() {
    console.log('redo')
    console.log(statePast.length, ' ', stateFuture.length)

    let newState: Editor
    if (stateFuture.length > 0) {
      newState = stateFuture[stateFuture.length - 1]
      setFutureEditor(newState)
    }
  }

  useEffect(() => {
    function onHandleKeyboardEvents(event: KeyboardEvent) {
      if ((event.key === "Escape" || event.keyCode === 27) && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        clearElementSelection()
      }
      if ((event.ctrlKey || event.metaKey) && event.keyCode === 90) {
        onUndo()
      }
      if ((event.ctrlKey || event.metaKey) && event.keyCode === 89) {
        onRedo()
      }
    }
    window.addEventListener('keydown', onHandleKeyboardEvents);
    return () => window.removeEventListener('keydown', onHandleKeyboardEvents);
  }, []);

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