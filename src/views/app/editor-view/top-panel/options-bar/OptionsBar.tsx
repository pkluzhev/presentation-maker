import { Button } from '../../../../../components/Button.tsx'
import styles from './OptionsBar.module.css'
import { useOptionsBarStateSelector, usePresentationSelector } from "../../../../hooks/useAppSelector.ts";
import { useAppActions } from "../../../../hooks/useAppActions.ts";
import { NavLink } from "react-router";
import { saveToLocalStorage } from "../../../../../store/callbacks/saveToLocalStorage.ts";
import { saveJSON } from "../../../../../utils/saveJSON.ts";

function OptionsBar() {
    const optionsBarState = useOptionsBarStateSelector()
    const presentation = usePresentationSelector()

    const { addNewSlide } = useAppActions()
    const { deleteSlides } = useAppActions()
    const { duplicateSlides } = useAppActions()
    const { addNewText } = useAppActions()
    const { addNewImage } = useAppActions()
    const { deleteElements } = useAppActions()
    const { copyElements } = useAppActions()
    const { pasteElements } = useAppActions()

    const { openPreviewPopup } = useAppActions()
    const { openSavePopup } = useAppActions()


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
        saveJSON(presentation)
    }
    function onOpenPreviewPopup() {
        openPreviewPopup()
    }
    function onOpenCreateNewSavePopup() {
        openSavePopup("createNew")
    }
    function onOpenOpenSavePopup() {
        openSavePopup("open")
    }
    function onDuplicateSlides() {
        duplicateSlides()
    }
    function onSavePresentationToLocalStorage() {
        saveToLocalStorage(presentation)
    }
    function onCopyElements() {
        copyElements()
    }
    function onPasteElements() {
        pasteElements()
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
                    <Button className={styles.button} text={'Copy'} onClick={onCopyElements}></Button>
                    <Button className={styles.button} text={'Paste'} onClick={onPasteElements}></Button>

                </div>
            )
        case "viewmode":
            return (
                <div className={styles.optionsBar}>
                    <NavLink to="/player">
                        <Button className={styles.button} text={'Start'} onClick={() => { }}></Button>
                    </NavLink>
                </div>
            )
        default:
            return (
                <div className={styles.optionsBar}>
                    <Button className={styles.button} text={'Create new'} onClick={onOpenCreateNewSavePopup}></Button>
                    <div className={styles.inputFile} onClick={onOpenOpenSavePopup}>Open</div>
                    <Button className={styles.button} text={'Export as PDF'} onClick={onOpenPreviewPopup}></Button>
                    <Button className={styles.button} text={'Save'} onClick={onSavePresentationToLocalStorage}></Button>
                    <Button className={styles.button} text={'Save to disk'} onClick={onSavePresentation}></Button>
                </div>
            )
    }
}

export {
    OptionsBar,
}