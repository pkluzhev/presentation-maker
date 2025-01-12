import React, { useRef, useState } from "react";
import styles from './SavePopup.module.css'
import { useSavePopupTypeSelector, usePresentationSelector } from "../../../hooks/useAppSelector.ts";
import { useAppActions } from "../../../hooks/useAppActions.ts";
import { saveJSON } from "../../../../utils/saveJSON.ts";
import { Button } from '../../../../components/Button.tsx'

function SavePopup() {
    const stateSavePopupType = useSavePopupTypeSelector()
    const presentation = usePresentationSelector()

    const { closeSavePopup } = useAppActions()
    const { openJSON } = useAppActions()
    const { createNewPresentation } = useAppActions()

    const inputFileRef = useRef<HTMLInputElement>(null)

    const [savingQueryPassed, setSavingQueryPassed] = useState(false)

    function onCreateNewPresentation() {
        createNewPresentation()
        closeSavePopup()
    }

    function onHandleSaving() {
        saveJSON(presentation)
        setSavingQueryPassed(true)
    }

    function onHandleNotSaving() {
        setSavingQueryPassed(true)
        if (stateSavePopupType === "createNew") {
            onCreateNewPresentation()
        }
    }

    function onOpenPresentation() {
        if (inputFileRef) {
            inputFileRef.current?.click()
        }
    }

    function onUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file) {
            return
        }
        const reader = new FileReader();
        reader.onload = e => {
            if (typeof e.target?.result === "string") {
                const data = JSON.parse(e.target.result)
                if (!data) {
                    return
                }
                openJSON(data)
                closeSavePopup()
            }
        }
        reader.onerror = (e) => {
            console.error('Ошибка FileReader:', e);
        }
        reader.readAsText(file)
    }

    return (
        <div className={styles.background}>
            <div className={styles.popup}>
                <div className={styles.buttonContainer}>
                    <Button className={styles.button} text={'Cancel'} onClick={() => closeSavePopup()}></Button>
                </div>
                <input
                    ref={inputFileRef}
                    className={styles.hiddenInput}
                    type={"file"}
                    onChange={onUploadFile}
                />
                {!savingQueryPassed &&
                    <>
                        <div className={styles.title}>
                            Do you want to save your project to disk before chosen action?
                        </div>
                        <div className={styles.pageButtonContainer}>
                            <Button className={styles.button} text={'Yes, of course'} onClick={onHandleSaving}></Button>
                            <Button className={styles.button} text={'No'} onClick={onHandleNotSaving}></Button>
                        </div>
                    </>
                }
                {(savingQueryPassed && stateSavePopupType === "createNew") &&
                    <div className={styles.pageButtonContainer}>
                        <Button className={styles.button} text={'Create new project'} onClick={onCreateNewPresentation}></Button>
                    </div>
                }
                {(savingQueryPassed && stateSavePopupType === "open") &&
                    <div className={styles.pageButtonContainer}>
                        <Button className={styles.button} text={'Upload project from disk'} onClick={onOpenPresentation}></Button>
                    </div>
                }
            </div>
        </div>
    )
}

export {
    SavePopup
}