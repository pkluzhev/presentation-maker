import { type OptionsBarState } from '../../../../store/types/EditorTypes'
import { Button } from '../../../../components/Button'

import styles from './OptionsBar.module.css'

import { dispatch } from "../../../../store/editor";

import { addNewSlide } from '../../../../store/addNewSlide'
import { deleteSlides } from '../../../../store/deleteSlides'
import { addNewText } from '../../../../store/addNewText'
import { addNewImage } from '../../../../store/addNewImage'
import { deleteElements } from '../../../../store/deleteElements'
import { saveJSON } from '../../../../store/saveJSON'
import { openJSON } from '../../../../store/openJSON'

import { useAppSelector } from "../../../hooks/useAppSelector";


// type OptionsBarProps = {
//     type: OptionsBarState
// }


  const editor = useAppSelector((editor => editor))
  const optionsBarState = editor.interfaceState.optionsBarState





function OptionsBar() { //(props: OptionsBarProps) {
    function onAddNewSlide() {
        dispatch(addNewSlide)
    }
    function onDeleteSlides() {
        dispatch(deleteSlides)
    }
    function onAddNewText() {
        dispatch(addNewText)
    }
    function onAddNewImage() {
        dispatch(addNewImage)
    }
    function onDeleteElements() {
        dispatch(deleteElements)
    }
    function onSavePresentation() {
        dispatch(saveJSON)
    }
    function onOpenPresentation(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file) {
            return
        }
        const reader = new FileReader();
        reader.onload = e => {
            if (typeof e.target?.result === "string") {
                const data = JSON.parse(e.target.result)
                if (!data) {
                    return
                }
                dispatch(openJSON, data)
            }
        }
        reader.onerror = (e) => {
            console.error('Ошибка FileReader:', e);    // Обработка ошибки
        }
        reader.readAsText(file)
    }
    switch (optionsBarState) {
        case "slide":
            return (
                <div className={styles.optionsBar}>
                    <Button className={styles.button} text={'Add new'} onClick={onAddNewSlide}></Button>
                    <Button className={styles.button} text={'Delete'} onClick={onDeleteSlides}></Button>
                    <Button className={styles.button} text={'Dublicate'} onClick={() => { }}></Button>
                </div>
            )
        case "element":
            return (
                <div className={styles.optionsBar}>
                    <Button className={styles.button} text={'Add new text'} onClick={onAddNewText}></Button>
                    <Button className={styles.button} text={'Add new image'} onClick={onAddNewImage}></Button>
                    <Button className={styles.button} text={'Delete'} onClick={onDeleteElements}></Button>
                    <Button className={styles.button} text={'Dublicate'} onClick={() => { }}></Button>
                </div>
            )
        case "viewmode":
            return (
                <div className={styles.optionsBar}>
                    <Button className={styles.button} text={'Start'} onClick={() => { }}></Button>
                </div>
            )
        default:
            return (
                <div className={styles.optionsBar}>
                    <Button className={styles.button} text={'Create new'} onClick={() => { }}></Button>
                    <div className={styles.inputFile}>
                        <input
                            className={styles.hiddenInput}
                            type={"file"}
                            onChange={ onOpenPresentation }
                        />
                        Open
                    </div>
                    <Button className={styles.button} text={'Export as PDF'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Save'} onClick={onSavePresentation}></Button>
                    <Button className={styles.button} text={'Close'} onClick={() => { }}></Button>
                </div>
            )
    }
}

export {
    OptionsBar,
}