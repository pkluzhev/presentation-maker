import { Button } from '../../../../components/Button'
import styles from './MenuBar.module.css'

import { dispatch } from "../../../../store/editor";

import { renderOptionsBar } from '../../../../store/renderOptionsBar'


function MenuBar() {
    function openFileOptions() {
        dispatch(renderOptionsBar, "file")
    }
    function openSlideOptions() {
        dispatch(renderOptionsBar, "slide")
    }
    function openElementOptions() {
        dispatch(renderOptionsBar, "element")
    }
    function openViewModeOptions() {
        dispatch(renderOptionsBar, "viewmode")
    }
    return (
        <div className={styles.menuBar}>
            <Button className={styles.button} text={'File'} onClick={openFileOptions}></Button>
            <Button className={styles.button} text={'Slide'} onClick={openSlideOptions}></Button>
            <Button className={styles.button} text={'Element'} onClick={openElementOptions}></Button>
            <Button className={styles.button} text={'View mode'} onClick={openViewModeOptions}></Button>
        </div>
    )
}

export {
    MenuBar,
}