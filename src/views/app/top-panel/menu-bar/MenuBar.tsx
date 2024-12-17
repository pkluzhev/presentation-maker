import { useAppActions } from "../../../hooks/useAppActions.ts";
import styles from './MenuBar.module.css'
import { Button } from '../../../../components/Button'

function MenuBar() {
    const {renderOptionsBar} = useAppActions()
    function openFileOptions() {
        renderOptionsBar("file")
    }
    function openSlideOptions() {
        renderOptionsBar("slide")
    }
    function openElementOptions() {
        renderOptionsBar("element")
    }
    function openViewModeOptions() {
        renderOptionsBar("viewmode")
    }
    return (
        <div className={styles.menuBar}>
            <Button className={styles.button} text={'File'} onClick={openFileOptions}/>
            <Button className={styles.button} text={'Slide'} onClick={openSlideOptions}/>
            <Button className={styles.button} text={'Element'} onClick={openElementOptions}/>
            <Button className={styles.button} text={'View mode'} onClick={openViewModeOptions}/>
        </div>
    )
}

export {
    MenuBar,
}