import styles from './ResultImage.module.css'
import { importImageAsync } from '../../../thunk/importImageAsync'
import { useAppActions } from "../../../views/hooks/useAppActions.ts";

type ResultImageProps = {
    src: string
    alt: string,
    downloadLink: string,
    isSlideBackground: boolean,
    isImageObject: boolean,
}

function ResultImage(props: ResultImageProps) {
    const { setSlideBackgroundImage } = useAppActions()
    const { changeImage } = useAppActions()

    const onImportImage = () => {
        if (props.isImageObject) {
            importImageAsync(props.downloadLink, changeImage)
        }
        if (props.isSlideBackground) {
            importImageAsync(props.downloadLink, setSlideBackgroundImage)
        }
    }

    return (
        <div className={styles.resultUnitPreview} onClick={ onImportImage }>
            <img className={styles.resultImage} src={props.src} alt={props.alt} />
        </div>
    )
}

export {
    ResultImage
}