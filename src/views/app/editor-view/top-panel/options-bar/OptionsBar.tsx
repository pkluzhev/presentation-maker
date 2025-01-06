import { Button } from '../../../../../components/Button.tsx'
import styles from './OptionsBar.module.css'
import { useOptionsBarStateSelector, usePresentationSelector } from "../../../../hooks/useAppSelector.ts";
import { useAppActions } from "../../../../hooks/useAppActions.ts";
import React from "react";
import { NavLink } from "react-router";
import { saveToLocalStorage } from "../../../../../store/callbacks/saveToLocalStorage.ts";

function OptionsBar() {
    const optionsBarState = useOptionsBarStateSelector()
    const presentation = usePresentationSelector()

    const { addNewSlide } = useAppActions()
    const { deleteSlides } = useAppActions()
    const { duplicateSlides } = useAppActions()
    const { addNewText } = useAppActions()
    const { addNewImage } = useAppActions()
    const { deleteElements } = useAppActions()
    const { saveJSON } = useAppActions()
    const { openJSON } = useAppActions()

    const { openPreviewPopup } = useAppActions()

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
    function onOpenPreviewPopup() {
        openPreviewPopup()
    }
    function onDuplicateSlides() {
        duplicateSlides()
    }
    function onSavePresentationToLocalStorage() {
        saveToLocalStorage(presentation)
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
                    <Button className={styles.button} text={'Dublicate'} onClick={onDuplicateSlides}></Button>
                </div>
            )
        case "element":
            return (
                <div className={styles.optionsBar}>
                    <Button className={styles.button} text={'Add new text'} onClick={onAddNewText}></Button>
                    <Button className={styles.button} text={'Add new image'} onClick={onAddNewImage}></Button>
                    <Button className={styles.button} text={'Delete'} onClick={onDeleteElements}></Button>
                </div>
            )
        case "viewmode":
            return (
                <div className={styles.optionsBar}>
                    <NavLink to="/player">
                        <Button className={styles.button} text={'Start'} onClick={() => {}}></Button>
                    </NavLink>
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
                            onChange={onOpenPresentation}
                        />
                        Open
                    </div>
                    <Button className={styles.button} text={'Export as PDF'} onClick={onOpenPreviewPopup}></Button>
                    <Button className={styles.button} text={'Save'} onClick={onSavePresentationToLocalStorage}></Button>
                    <Button className={styles.button} text={'Save to disk'} onClick={onSavePresentation}></Button>
                    <Button className={styles.button} text={'Close'} onClick={() => { }}></Button>
                </div>
            )
    }
}

export {
    OptionsBar,
}