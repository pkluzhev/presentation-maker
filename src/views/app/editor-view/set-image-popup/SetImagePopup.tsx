import React, { useState } from "react";
import styles from './SetImagePopup.module.css'
import { useIsChangeImagePopupActiveSelector, useIsSetSlideBackgroundImagePopupActiveSelector } from "../../../hooks/useAppSelector.ts";
import { useAppActions } from "../../../hooks/useAppActions.ts";
import { setBase64Image } from "../../../../utils/setBase64Image.ts";
import { Button } from '../../../../components/Button.tsx'
import { ResultImage } from './ResultImage.tsx'
import { useUnsplashActions } from "../../../hooks/useUnsplashActions.ts";

function SetImagePopup() {
    const stateChangeImage = useIsChangeImagePopupActiveSelector()
    const stateSetSlideBackgroundImage = useIsSetSlideBackgroundImagePopupActiveSelector()
    const { closeSetImagePopup } = useAppActions()
    const { setSlideBackgroundImage } = useAppActions()
    const { changeImage } = useAppActions()

    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const { responseData, getData } = useUnsplashActions(currentPage, searchValue);

    const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (stateChangeImage) {
            setBase64Image(event, changeImage)
        } else if (stateSetSlideBackgroundImage) {
            setBase64Image(event, setSlideBackgroundImage)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const handleButtonSearch = () => {
        if (searchValue != '') {
            let newPage: number = 1
            getData(newPage, searchValue)
            setCurrentPage(newPage)
        }
    }
   
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            let newPage: number = currentPage - 1
            getData(newPage, searchValue)
            setCurrentPage(newPage)
        }
    }
   
    const handleNextPage = () => {
        let newPage: number = currentPage + 1
        getData(newPage, searchValue)
        setCurrentPage(newPage)
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
                <div className={styles.inputContainer}>
                    <div className={styles.logo}></div>
                    <input
                        className={styles.inputField}
                        type="search"
                        placeholder="Enter your query"
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                    <Button className={styles.buttonSearch} text={'Search'} onClick={handleButtonSearch} />
                </div>
                <div className={styles.pageButtonContainer}>
                    <Button className={styles.button} text={'Previous page'} onClick={handlePreviousPage}></Button>
                    <Button className={styles.button} text={'Next page'} onClick={handleNextPage}></Button>
                </div>
                <div className={styles.resultContainer}>
                    {responseData.map((data: any, key: any) => <ResultImage
                        key={key}
                        src={data.urls.thumb}
                        alt={data.alt_description}
                        downloadLink={data.urls.regular}
                        isSlideBackground={stateSetSlideBackgroundImage }
                        isImageObject={stateChangeImage}
                    />)}
                </div>
            </div>
        </div>
    )
}

export {
    SetImagePopup
}