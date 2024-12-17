import { MenuBar } from './menu-bar/MenuBar'
import { OptionsBar } from './options-bar/OptionsBar'
import { EditBar } from './edit-bar/EditBar'
import styles from './TopPanel.module.css'

function TopPanel() {
    return (
        <div className={styles.topPanel}>
            <div>
                <MenuBar />
                <OptionsBar />
            </div>
            <EditBar />
        </div>
    )
}

export {
    TopPanel
}