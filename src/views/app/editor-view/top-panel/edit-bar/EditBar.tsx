import { Button } from '../../../../../components/Button.tsx'
import { DropdownMenu } from '../../dropdown-menu/DropdownMenu'
import styles from './EditBar.module.css'
import { useEditBarStateSelector } from "../../../../hooks/useAppSelector.ts";
import { useAppActions } from "../../../../hooks/useAppActions.ts";
import { useRef, useState } from 'react';
import { useClickOutside } from "../../../../hooks/useClickOutside.ts";

function EditBar() {
    const editBarState = useEditBarStateSelector()

    const { incSlideObjectLayer } = useAppActions()
    const { decSlideObjectLayer } = useAppActions()

    const { setFontColor } = useAppActions()

    const { openChangeImagePopup } = useAppActions()
    const { openSetSlideBackgroundImagePopup } = useAppActions()
    const { openSetBackgroundPopup } = useAppActions()

    let selectedFontColor: string = "#000000"

    const [isFontDropdownActive, setFontDropdownActive] = useState(false)
    const [isFontWeightDropdownActive, setFontWeightDropdownActive] = useState(false)
    const [isFontSizeDropdownActive, setFontSizeDropdownActive] = useState(false)

    const fontMenuRef = useRef(null);
    const fontWeightMenuRef = useRef(null);
    const fontSizeMenuRef = useRef(null);

    useClickOutside(fontMenuRef, () => {
        setFontDropdownActive(false)
    });

    useClickOutside(fontSizeMenuRef, () => {
        setFontSizeDropdownActive(false)
    });

    useClickOutside(fontWeightMenuRef, () => {
        setFontWeightDropdownActive(false)
    });

    switch (editBarState) {
        case "text":
            return (
                <div className={styles.editBar}>
                    <div className={styles.editBarTitle}>Text — Edit mode</div>
                    <Button className={styles.buttonEditbar} text={'Layer-Up'} onClick={() => { incSlideObjectLayer() }}></Button>
                    <Button className={styles.buttonEditbar} text={'Layer-Down'} onClick={() => { decSlideObjectLayer() }}></Button>
                    <span> | </span>
                    <div className={styles.buttonWithDropdown}>
                        <Button className={isFontDropdownActive ? styles.buttonEditbarActive : styles.buttonEditbar} text={'Font'} onClick={() => { isFontDropdownActive ? setFontDropdownActive(false) : setFontDropdownActive(true) }}></Button>
                        {isFontDropdownActive &&
                            <div ref={fontMenuRef}>
                                <DropdownMenu type={'fontFamily'}/>
                            </div>
                        }
                    </div>
                    <div className={styles.buttonWithDropdown}>
                        <Button className={isFontSizeDropdownActive ? styles.buttonEditbarActive : styles.buttonEditbar} text={'Size'} onClick={() => { isFontSizeDropdownActive ? setFontSizeDropdownActive(false) : setFontSizeDropdownActive(true) }}></Button>
                        {isFontSizeDropdownActive &&
                            <div ref={fontSizeMenuRef}>
                                <DropdownMenu type={'fontSize'}/>
                            </div>
                        }
                    </div>
                    <div className={styles.buttonWithDropdown}>
                        <Button className={isFontWeightDropdownActive ? styles.buttonEditbarActive : styles.buttonEditbar} text={'Weight'} onClick={() => { isFontWeightDropdownActive ? setFontWeightDropdownActive(false) : setFontWeightDropdownActive(true) }}></Button>
                        {isFontWeightDropdownActive &&
                            <div ref={fontWeightMenuRef}>
                                <DropdownMenu type={'fontWeight'}/>
                            </div>
                        }
                    </div>
                    <div className={styles.buttonsContainer}>
                        <p className={styles.inputColorTitle}>Color :</p>
                        <input
                            className={styles.inputColor}
                            type={'color'}
                            onChange={(event) => {
                                selectedFontColor = (event.target as HTMLInputElement).value
                            }}
                        />
                        <Button
                            className={styles.selectButton}
                            text={'Set color'}
                            onClick={() => { setFontColor(selectedFontColor) }}
                        />
                    </div>
                </div>
            )
        case "image":
            return (
                <div className={styles.editBar}>
                    <div className={styles.editBarTitle}>Image — Edit mode</div>
                    <Button className={styles.buttonEditbar} text={'Layer-Up'} onClick={() => { incSlideObjectLayer() }}></Button>
                    <Button className={styles.buttonEditbar} text={'Layer-Down'} onClick={() => { decSlideObjectLayer() }}></Button>
                    <span> | </span>
                    <Button
                        className={styles.selectButton}
                        text={'Change image'}
                        onClick={() => { openChangeImagePopup() }}
                    />
                </div>
            )
        case "slide":
            return (
                <div className={styles.editBar}>
                    <div className={styles.editBarTitle}>Slide — Edit mode</div>
                    <div className={styles.buttonsContainer}>
                        <Button
                            className={styles.selectButton}
                            text={'Set background image'}
                            onClick={() => { openSetSlideBackgroundImagePopup() }}
                        />
                        <Button
                            className={styles.selectButton}
                            text={'Set background color'}
                            onClick={() => { openSetBackgroundPopup() }}
                        />
                    </div>
                </div>
            )
        default:
            return (
                <></>
            )
    }
}

export {
    EditBar,
}