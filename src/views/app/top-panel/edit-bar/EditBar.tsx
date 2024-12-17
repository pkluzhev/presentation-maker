import { Button } from '../../../../components/Button'
import styles from './EditBar.module.css'
import { useEditBarStateSelector } from "../../../hooks/useAppSelector";
import { useAppActions } from "../../../hooks/useAppActions.ts";

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

function EditBar() {
    const editBarState = useEditBarStateSelector()
    const { setSlideBackgroundColor } = useAppActions()
    const { setSlideBackgroundImage } = useAppActions()
    const { changeImage } = useAppActions()
    const { incSlideObjectLayer } = useAppActions()
    const { decSlideObjectLayer } = useAppActions()
    let selectedBackgroundColor: string = "#000000"
    switch (editBarState) {
        case "text":
            return (
                <div className={styles.editBar}>
                    <div className={styles.editBarTitle}>Editor mode (Text)</div>
                    <Button className={styles.button} text={'Font'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Size'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Weight'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Color'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Up to layer'} onClick={() => { incSlideObjectLayer() }}></Button>
                    <Button className={styles.button} text={'Down to layer'} onClick={() => { decSlideObjectLayer() }}></Button>
                </div>
            )
        case "image":
            return (
                <div className={styles.editBar}>
                    <div className={styles.editBarTitle}>Editor mode (Image)</div>
                    <div className={styles.inputImage}>
                        <input
                            className={styles.hiddenInput}
                            type={"file"}
                            onChange={(event) => { onChangeImage(event, changeImage) }}
                        />
                        Change image
                    </div>
                    <Button className={styles.button} text={'Up to layer'} onClick={() => { incSlideObjectLayer() }}></Button>
                    <Button className={styles.button} text={'Down to layer'} onClick={() => { decSlideObjectLayer() }}></Button>
                </div>
            )
        case "slide":
            return (
                <div className={styles.editBar}>
                    <div className={styles.editBarTitle}>Editor mode (Slide)</div>
                    <div className={styles.buttonsContainer}>
                        <div className={styles.inputImage}>
                            <input
                                className={styles.hiddenInput}
                                type={"file"}
                                onChange={(event) => { onChangeImage(event, setSlideBackgroundImage) }}
                            />
                            Set background image
                        </div>
                        <p className={styles.inputColorTitle}>Background color</p>
                        <input
                            className={styles.inputColor}
                            type={'color'}
                            onChange={(event) => {
                                selectedBackgroundColor = (event.target as HTMLInputElement).value
                            }}
                        />
                        <Button
                            className={styles.selectButton}
                            text={'Apply'}
                            onClick={() => { setSlideBackgroundColor(selectedBackgroundColor) }}
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