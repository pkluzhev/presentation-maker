// import * as React from "react";
import styles from './TopPanel.module.css'
import { MenuBar } from './menu-bar/MenuBar'
import { OptionsBar } from './options-bar/OptionsBar'
import { EditBar } from './edit-bar/EditBar'
import { type EditBarState } from './../../../store/types/EditorTypes'
import { type OptionsBarState } from './../../../store/types/EditorTypes'



type TopPanelProps = {
    optionsBarState: OptionsBarState,
    editBarState: EditBarState,
    buffer: boolean
}

function TopPanel(props: TopPanelProps) {
    return (
        <div className={styles.topPanel}>
            <div>
                <MenuBar />
                <OptionsBar type={props.optionsBarState} />
            </div>
            <EditBar type={props.editBarState} />
        </div>
    )
}

export {
    TopPanel
}