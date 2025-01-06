// import * as React from "react";
import { useAppActions } from "../../../../hooks/useAppActions.ts";
import styles from './MenuBar.module.css'
import { Button } from '../../../../../components/Button.tsx'
import { usePastSelector, useFutureSelector, useOptionsBarStateSelector } from "../../../../hooks/useAppSelector.ts";
import { Editor } from "../../../../../store/types/EditorTypes.ts";

function MenuBar() {
    const { renderOptionsBar } = useAppActions()
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

    const statePast = usePastSelector()
    const stateFuture = useFutureSelector()

    const { setPastEditor } = useAppActions()
    const { setFutureEditor } = useAppActions()


    function onUndo() {
        console.log('undo')
        console.log(statePast.length, ' ', stateFuture.length)

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

    const optionsBarState = useOptionsBarStateSelector()

    let fileButtonClassname: string = styles.button
    let slideButtonClassname: string = styles.button
    let elementButtonClassname: string = styles.button
    let viewmodeButtonClassname: string = styles.button

    switch (optionsBarState) {
        case "slide":
            slideButtonClassname = fileButtonClassname + ` ` + styles.button_active
            break
        case "element":
            elementButtonClassname = fileButtonClassname + ` ` + styles.button_active
            break
        case "viewmode":
            viewmodeButtonClassname = fileButtonClassname + ` ` + styles.button_active
            break
        default:
            fileButtonClassname = fileButtonClassname + ` ` + styles.button_active
            break
    }

    return (
        <div className={styles.menuBar}>
            <div>
                <button className={fileButtonClassname} onClick={openFileOptions}>File</button>
                <button className={slideButtonClassname} onClick={openSlideOptions}>Slide</button>
                <button className={elementButtonClassname} onClick={openElementOptions}>Element</button>
                <button className={viewmodeButtonClassname} onClick={openViewModeOptions}>View mode</button>
            </div>
            <div>
                <Button className={styles.button} text={' ← '} onClick={onUndo} />
                <Button className={styles.button} text={' → '} onClick={onRedo} />
            </div>
        </div>
    )
}

export {
    MenuBar,
}