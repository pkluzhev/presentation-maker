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
    const { setTextAlign } = useAppActions()

    const { changeVerticalScale } = useAppActions()
    const { changeHorizontalScale } = useAppActions()

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
                    <div className={styles.editBarMainContainer}>
                        <div className={styles.buttonWithDropdown}>
                            <div title={'Align left'} className={styles.buttonIconEditbar} onClick={() => { setTextAlign("left") }}><div className={styles.buttonAlignLeft}></div></div>
                        </div>
                        <div className={styles.buttonWithDropdown}>
                            <div title={'Align center'} className={styles.buttonIconEditbar} onClick={() => { setTextAlign("center") }}><div className={styles.buttonAlignCenter}></div></div>
                        </div>
                        <div className={styles.buttonWithDropdown}>
                            <div title={'Align right'} className={styles.buttonIconEditbar} onClick={() => { setTextAlign("right") }}><div className={styles.buttonAlignRight}></div></div>
                        </div>
                        <span> | </span>
                        <div className={styles.buttonWithDropdown}>
                            <div title={'Font family'} className={isFontDropdownActive ? styles.buttonIconEditbarActive : styles.buttonIconEditbar} onClick={() => { isFontDropdownActive ? setFontDropdownActive(false) : setFontDropdownActive(true) }}><div className={styles.buttonFont}></div></div>
                            {isFontDropdownActive &&
                                <div ref={fontMenuRef}>
                                    <DropdownMenu type={'fontFamily'} />
                                </div>
                            }
                        </div>
                        <div className={styles.buttonWithDropdown}>
                            <div title={'Font size'} className={isFontSizeDropdownActive ? styles.buttonIconEditbarActive : styles.buttonIconEditbar} onClick={() => { isFontSizeDropdownActive ? setFontSizeDropdownActive(false) : setFontSizeDropdownActive(true) }}><div className={styles.buttonSize}></div></div>
                            {isFontSizeDropdownActive &&
                                <div ref={fontSizeMenuRef}>
                                    <DropdownMenu type={'fontSize'} />
                                </div>
                            }
                        </div>
                        <div className={styles.buttonWithDropdown}>
                            <div title={'Font weight'} className={isFontWeightDropdownActive ? styles.buttonIconEditbarActive : styles.buttonIconEditbar} onClick={() => { isFontWeightDropdownActive ? setFontWeightDropdownActive(false) : setFontWeightDropdownActive(true) }}><div className={styles.buttonWeight}></div></div>
                            {isFontWeightDropdownActive &&
                                <div ref={fontWeightMenuRef}>
                                    <DropdownMenu type={'fontWeight'} />
                                </div>
                            }
                        </div>
                        <div className={styles.buttonsContainer}>
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
                        <span> | </span>
                        <Button className={styles.buttonEditbar} text={'Layer-Up'} onClick={() => { incSlideObjectLayer() }}></Button>
                        <Button className={styles.buttonEditbar} text={'Layer-Down'} onClick={() => { decSlideObjectLayer() }}></Button>
                    </div>
                </div>
            )
        case "image":
            return (
                <div className={styles.editBar}>
                    <div className={styles.editBarTitle}>Image — Edit mode</div>
                    <div className={styles.editBarMainContainer}>

                        <div className={styles.buttonWithDropdown}>
                            <div title={'Change vertical scale'} className={styles.buttonIconEditbar} onClick={() => {changeVerticalScale() }}><div className={styles.buttonVerticalScale}></div></div>
                        </div>
                        <div className={styles.buttonWithDropdown}>
                            <div title={'Change horizontal scale'} className={styles.buttonIconEditbar} onClick={() => {changeHorizontalScale() }}><div className={styles.buttonHorizontalScale}></div></div>
                        </div>
                        <Button
                            className={styles.selectButton}
                            text={'Change image'}
                            onClick={() => { openChangeImagePopup() }}
                        />
                        <span> | </span>
                        <Button className={styles.buttonEditbar} text={'Layer-Up'} onClick={() => { incSlideObjectLayer() }}></Button>
                        <Button className={styles.buttonEditbar} text={'Layer-Down'} onClick={() => { decSlideObjectLayer() }}></Button>
                    </div>
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