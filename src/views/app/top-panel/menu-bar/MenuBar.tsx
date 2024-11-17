// import * as React from "react";

import styles from './MenuBar.module.css'
import { Button } from '../../../../components/Button'
import { renderOptionsBar } from '../../../../store/renderOptionsBar'
import { dispatch } from "../../../../store/editor";


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
            {/* <Button className={`${styles.button} ${type === 'file' ? 'selected' : ''}`} text={'File'} onClick={openFileOptions}></Button> */}
            <Button className={styles.button} text={'Slide'} onClick={openSlideOptions}></Button>
            <Button className={styles.button} text={'Element'} onClick={openElementOptions}></Button>
            <Button className={styles.button} text={'View mode'} onClick={openViewModeOptions}></Button>
        </div>
    )
}

export {
    MenuBar,
}