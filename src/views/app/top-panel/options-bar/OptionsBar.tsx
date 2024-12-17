import { Button } from '../../../../components/Button'

import styles from './OptionsBar.module.css'

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppActions } from "../../../hooks/useAppActions.ts";

function OptionsBar() {

    const optionsBarState = useAppSelector((editor => editor.interfaceState.optionsBarState))

    const {addNewSlide} = useAppActions()
    const {deleteSlides} = useAppActions()
    const {addNewText} = useAppActions()
    const {addNewImage} = useAppActions()
    const {deleteElements} = useAppActions()
    const {saveJSON} = useAppActions()
    const {openJSON} = useAppActions()

    
    function onAddNewSlide() {
        addNewSlide()
    }
    function onDeleteSlides() {
        deleteSlides()
    }
    function onAddNewText() {
        addNewText()
    }
    function onAddNewImage() {
        addNewImage()
    }
    function onDeleteElements() {
        deleteElements()
    }
    function onSavePresentation() {
        saveJSON()
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
                openJSON(data)
            }
        }
        reader.onerror = (e) => {
            console.error('Ошибка FileReader:', e); 
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