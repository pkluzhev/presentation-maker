import { useState } from "react";
import styles from './SetBackgroundPopup.module.css'
import { useAppActions } from "../../../hooks/useAppActions.ts";
import { Button } from '../../../../components/Button.tsx'

function SetBackgroundPopup() {
    const { closeSetBackgroundPopup } = useAppActions()

    const { setSlideBackgroundColor } = useAppActions()
    const { setSlideBackgroundGradient } = useAppActions()

    const [isSolid, setSolid] = useState(true)
    const [isGradient, setGradient] = useState(false)

    const [tilt, setTilt] = useState(0)
    const [selectedColor1, setSelectedColor1] = useState('#000000')
    const [selectedColor2, setSelectedColor2] = useState('#000000')

    function onSetBackgroundColor() {
        if (isSolid) {
            setSlideBackgroundColor(selectedColor1)
        }
        if (isGradient) {
            setSlideBackgroundGradient(selectedColor1, selectedColor2, tilt)
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.popup}>
                <div className={styles.buttonContainer}>
                    <Button className={styles.button} text={'Close'} onClick={() => closeSetBackgroundPopup()}></Button>
                </div>
                <div className={styles.titleContainer}>
                    Slide background color - Edit mode
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputTitle}>
                            Choose type :
                        </div>
                        <Button className={isSolid ? styles.buttonActive : styles.button} text={'Solid'} onClick={() => { setSolid(true); setGradient(false); setTilt(0) }}></Button>
                        <Button className={isGradient ? styles.buttonActive : styles.button} text={'Gradient'} onClick={() => { setGradient(true); setSolid(false); setTilt(0) }}></Button>
                    </div>
                    {isSolid &&
                        <div className={styles.inputContainer}>
                            <div className={styles.inputTitle}>
                                Choose background color :
                            </div>
                            <input
                                className={styles.inputColor}
                                type={'color'}
                                onChange={(event) => { setSelectedColor1((event.target as HTMLInputElement).value) }}
                            />
                        </div>
                    }
                    {isGradient &&
                        <>
                            <div className={styles.inputContainer}>
                                <div className={styles.inputTitle}>
                                    Choose first color :
                                </div>
                                <input
                                    className={styles.inputColor}
                                    type={'color'}
                                    onChange={(event) => { setSelectedColor1((event.target as HTMLInputElement).value) }}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <div className={styles.inputTitle}>
                                    Choose second color :
                                </div>
                                <input
                                    className={styles.inputColor}
                                    type={'color'}
                                    onChange={(event) => { setSelectedColor2((event.target as HTMLInputElement).value) }}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <div className={styles.inputTitle}>
                                    Choose tilt (degrees) :
                                </div>
                                <input
                                    type='number'
                                    className={styles.inputTilt}
                                    defaultValue={tilt}
                                    onChange={(event) => { setTilt(Number((event.target as HTMLInputElement).value)) }}
                                />
                            </div>
                        </>
                    }
                    <div className={styles.applyButtonContainer}>
                        <Button className={styles.button} text={'Apply color'} onClick={onSetBackgroundColor}></Button>
                    </div>
                </div>

            </div>
        </div >
    )
}

export {
    SetBackgroundPopup
}