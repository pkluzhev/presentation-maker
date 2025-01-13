import styles from './EditorView.module.css'
import { useEffect } from 'react'
import { TopPanel } from '../editor-view/top-panel/TopPanel'
import { LeftPanel } from '../editor-view/left-panel/LeftPanel'
import { WorkSpace } from '../editor-view/workspace/WorkSpace'
import { PreviewPopup } from '../editor-view/preview-popup/PreviewPopup'
import { SetImagePopup } from '../editor-view/set-image-popup/SetImagePopup'
import { SavePopup } from '../editor-view/save-popup/SavePopup.tsx'
import { SetBackgroundPopup } from '../editor-view/set-background-popup/SetBackgroundPopup.tsx'
import { useAppActions } from "../../../views/hooks/useAppActions";

import {
  usePastSelector,
  useFutureSelector,
  useIsPreviewActiveSelector,
  useIsChangeImagePopupActiveSelector,
  useIsSetSlideBackgroundImagePopupActiveSelector,
  usePresentationSelector,
  useIsSavePopupActiveSelector,
  useIsSetBackgroundPopupActiveSelector
} from "../../../views/hooks/useAppSelector";

import { Editor } from "../../../store/types/EditorTypes";
import { saveToLocalStorage } from "../../../store/callbacks/saveToLocalStorage.ts";

const EditorView = () => {
  const { clearElementSelection } = useAppActions()
  const { copyElements } = useAppActions()
  const { pasteElements } = useAppActions()
  const { deleteElements } = useAppActions()

  const statePast = usePastSelector()
  const stateFuture = useFutureSelector()
  const { setPastEditor } = useAppActions()
  const { setFutureEditor } = useAppActions()

  const statePreview = useIsPreviewActiveSelector()
  const stateChangeImagePopup = useIsChangeImagePopupActiveSelector()
  const stateSetSlideBackgroundImagePopup = useIsSetSlideBackgroundImagePopupActiveSelector()
  const stateSetBackgroundPopup = useIsSetBackgroundPopupActiveSelector()

  const stateSavePopup = useIsSavePopupActiveSelector()

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

  const onHandleKeyboardEvents = (event: KeyboardEvent) => {
    if ((event.key === "Escape" || event.keyCode === 27) && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      clearElementSelection()         // esc (очистка селекшна с элементами)
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 90) {  // ctrl + Z (unDO)
      onUndo()
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 89) {  // ctrl + Y (reDO)
      onRedo()
    }
    if (event.altKey && event.keyCode === 83) {  // alt + S (сохранение в локалсторадж)
      saveToLocalStorage(presentation)
    }
    if (event.altKey && event.keyCode === 67) {  // alt + C (копирвоание элементов)
      copyElements()
    }
    if (event.altKey && event.keyCode === 86) {  // alt + V (вставка элементов)
      pasteElements()
    }
    if (event.altKey && event.keyCode === 46) {
      deleteElements()                              // alt + delete (удаление выбранных элементов)
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
      {(stateChangeImagePopup || stateSetSlideBackgroundImagePopup) &&
        <SetImagePopup />
      }
      {stateSavePopup &&
        <SavePopup />
      }
      {stateSetBackgroundPopup &&
        <SetBackgroundPopup />
      }
    </div>
  )
}

export default EditorView