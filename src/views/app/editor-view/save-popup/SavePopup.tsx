import React from "react";
import styles from './SavePopup.module.css'
import { useIsChangeImagePopupActiveSelector, useIsSetSlideBackgroundImagePopupActiveSelector } from "../../../hooks/useAppSelector.ts";
import { useAppActions } from "../../../hooks/useAppActions.ts";
import { setBase64Image } from "../../../../utils/setBase64Image.ts";
import { Button } from '../../../../components/Button.tsx'
import { useUnsplashActions } from "../../../hooks/useUnsplashActions.ts";

function SavePopup() {
    const stateChangeImage = useIsChangeImagePopupActiveSelector()
    const stateSetSlideBackgroundImage = useIsSetSlideBackgroundImagePopupActiveSelector()

    const { closeSetImagePopup } = useAppActions()
    const { setSlideBackgroundImage } = useAppActions()
    const { changeImage } = useAppActions()

    return (
        <div className={styles.background}>
            <div className={styles.popup}>
                <div className={styles.buttonContainer}>
                    <Button className={styles.button} text={'Cancel'} onClick={() => closeSetImagePopup()}></Button>
                </div>
                <div className={styles.title}>
                    Do you want to save your project to disk before chosen action?
                </div>
                <div className={styles.pageButtonContainer}>
                    <Button className={styles.button} text={'Yes, of course'} onClick={()=>{}}></Button>
                    <Button className={styles.button} text={'No'} onClick={()=>{}}></Button>
                </div>
                
            </div>
        </div>
    )
}

export {
    SavePopup
}