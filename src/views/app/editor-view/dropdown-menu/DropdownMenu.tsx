import styles from './DropdownMenu.module.css'
import { useAppActions } from "../../../hooks/useAppActions.ts";
import { FONT_LIST, FONT_WEIGHT_LIST, FONT_SIZE_LIST } from "../../../../assets/EditorTextProps.tsx";

type DropdownMenuProps = {
    type: "fontWeight" | "fontSize" | "fontFamily" | "gradientTilt",
}

function DropdownMenu(props: DropdownMenuProps) {
    const { setFontWeight } = useAppActions()
    const { setFontSize } = useAppActions()
    const { setFontFamily } = useAppActions()

    let listItems

    switch (props.type) {
        case "fontFamily":
            listItems = FONT_LIST.map(item =>
                <li className={styles.listItem} key={crypto.randomUUID()} onClick={() => { setFontFamily(item) }}>{item}</li>
            )
            break;
        case "fontWeight":
            listItems = FONT_WEIGHT_LIST.map(item =>
                <li className={styles.listItem} key={crypto.randomUUID()} onClick={() => { setFontWeight(item) }}>{item}</li>
            )
            break;
        case "fontSize":
            listItems = FONT_SIZE_LIST.map(item =>
                <li className={styles.listItem} key={crypto.randomUUID()} onClick={() => { setFontSize(item) }}>{item}</li>
            )
            break;
        default:
            return <></>;
    }
    return (
        <nav className={styles.dropdownContainer}>
            <ul className={styles.dropdownList}>{listItems}</ul>
        </nav>
    )
}

export {
    DropdownMenu,
}