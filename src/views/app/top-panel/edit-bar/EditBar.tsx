import { type EditBarState } from '../../../../store/types/EditorTypes'
import { Button } from '../../../../components/Button'
import styles from './EditBar.module.css'

import { dispatch } from '../../../../store/editor'

import { setSlideBackgroundColor } from '../../../../store/setSlideBackgroundColor'
import { setSlideBackgroundImage } from '../../../../store/setSlideBackgroundImage'
import { changeImage } from '../../../../store/changeImage'
import { incSlideObjectLayer } from '../../../../store/incSlideObjectLayer'

type EditBarProps = {
    type: EditBarState
}

function onChangeImage(event: React.FormEvent<HTMLInputElement>, func: Function) {
    const target = event.target as HTMLInputElement & {
        files: FileList
    }
    const reader = new FileReader()
    reader.onload = () => {
        if (typeof reader.result === "string") {
            dispatch(func, reader.result)
        }
    }
    reader.readAsDataURL(target.files[0])
}

function EditBar(props: EditBarProps) {
    let selectedBackgroundColor: string = ""
    switch (props.type) {
        case "text":
            return (
                <div className={styles.editBar}>
                    <div className={styles.editBarTitle}>Editor mode (Text)</div>
                    <Button className={styles.button} text={'Font'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Size'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Weight'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Color'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Up to layer'} onClick={() => { dispatch(incSlideObjectLayer) }}></Button>
                    <Button className={styles.button} text={'Down to layer'} onClick={() => { }}></Button>
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
                    <Button className={styles.button} text={'Up to layer'} onClick={() => { }}></Button>
                    <Button className={styles.button} text={'Down to layer'} onClick={() => { }}></Button>
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
                            onClick={() => { dispatch(setSlideBackgroundColor, selectedBackgroundColor) }}
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