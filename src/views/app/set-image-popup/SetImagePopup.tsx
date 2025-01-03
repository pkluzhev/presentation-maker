import React from "react";
import styles from './SetImagePopup.module.css'
import { useIsChangeImagePopupActiveSelector, useIsSetSlideBackgroundImagePopupActiveSelector } from "../../hooks/useAppSelector.ts";
import { useAppActions } from "../../hooks/useAppActions.ts";
import { Button } from '../../../components/Button.tsx'

function onChangeImage(event: React.ChangeEvent<HTMLInputElement>, callbackFunction: Function) {
    const target = event.target as HTMLInputElement & {
        files: FileList
    }
    const reader = new FileReader()
    reader.onload = () => {
        if (typeof reader.result === "string") {
            callbackFunction(reader.result)
        }
    }
    reader.readAsDataURL(target.files[0])
}

function SetImagePopup() {
    const stateChangeImage = useIsChangeImagePopupActiveSelector()
    const stateSetSlideBackgroundImage = useIsSetSlideBackgroundImagePopupActiveSelector()

    const { closeSetImagePopup } = useAppActions()
    const { setSlideBackgroundImage } = useAppActions()
    const { changeImage } = useAppActions()

    function onUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
        if (stateChangeImage) {
            onChangeImage(event, changeImage)
        } else if (stateSetSlideBackgroundImage){
            onChangeImage(event, setSlideBackgroundImage)
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.popup}>
                <div className={styles.buttonContainer}>
                    <div className={styles.inputImage}>
                        <input
                            className={styles.hiddenInput}
                            type={"file"}
                            onChange={(e) => { onUploadImage(e) }}
                        />
                        Upload from disk
                    </div>
                    <Button className={styles.button} text={'Close'} onClick={() => closeSetImagePopup()}></Button>
                </div>


            </div>
        </div>
    )
}

export {
    SetImagePopup
}