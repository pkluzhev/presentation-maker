import { type OptionsBarState } from '../../../../store/types/EditorTypes'
import { Button } from '../../../../components/Button'

import styles from './OptionsBar.module.css'

import { dispatch } from "../../../../store/editor";

import { addNewSlide } from '../../../../store/addNewSlide'
import { deleteSlides } from '../../../../store/deleteSlides'
import { addNewText } from '../../../../store/addNewText'
import { addNewImage } from '../../../../store/addNewImage'
import { deleteElements } from '../../../../store/deleteElements'

type OptionsBarProps = {
    type: OptionsBarState
}

function OptionsBar(props: OptionsBarProps) {
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
    switch (props.type) {
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
                    <Button className={styles.button} text={'Open'} onClick={() => { alert("Hello") }}></Button>
                    <Button className={styles.button} text={'Export as PDF'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Save'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Close'} onClick={() => { }}></Button>
                </div>
            )
    }
}

export {
    OptionsBar,
}