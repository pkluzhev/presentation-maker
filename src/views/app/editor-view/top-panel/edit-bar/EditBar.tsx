import { Button } from '../../../../../components/Button.tsx'
import styles from './EditBar.module.css'
import { useEditBarStateSelector } from "../../../../hooks/useAppSelector.ts";
import { useAppActions } from "../../../../hooks/useAppActions.ts";

function EditBar() {
    const editBarState = useEditBarStateSelector()

    const { setSlideBackgroundColor } = useAppActions()
    const { incSlideObjectLayer } = useAppActions()
    const { decSlideObjectLayer } = useAppActions()

    const { openChangeImagePopup } = useAppActions()
    const { openSetSlideBackgroundImagePopup } = useAppActions()

    let selectedBackgroundColor: string = "#000000"
    switch (editBarState) {
        case "text":
            return (
                <div className={styles.editBar}>
                    <div className={styles.editBarTitle}>Text — Edit mode</div>
                    <Button className={styles.buttonEditbar} text={'Font'} onClick={() => { }}></Button>
                    <Button className={styles.buttonEditbar} text={'Size'} onClick={() => { }}></Button>
                    <Button className={styles.buttonEditbar} text={'Weight'} onClick={() => { }}></Button>
                    <Button className={styles.buttonEditbar} text={'Color'} onClick={() => { }}></Button>
                    <Button className={styles.buttonEditbar} text={'Up to layer'} onClick={() => { incSlideObjectLayer() }}></Button>
                    <Button className={styles.buttonEditbar} text={'Down to layer'} onClick={() => { decSlideObjectLayer() }}></Button>
                </div>
            )
        case "image":
            return (
                <div className={styles.editBar}>
                    <div className={styles.editBarTitle}>Image — Edit mode</div>
                    <Button
                        className={styles.selectButton}
                        text={'Change image'}
                        onClick={() => { openChangeImagePopup() }}
                    />
                    <Button className={styles.buttonEditbar} text={'Up to layer'} onClick={() => { incSlideObjectLayer() }}></Button>
                    <Button className={styles.buttonEditbar} text={'Down to layer'} onClick={() => { decSlideObjectLayer() }}></Button>
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
                        <p className={styles.inputColorTitle}>Background color :</p>
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