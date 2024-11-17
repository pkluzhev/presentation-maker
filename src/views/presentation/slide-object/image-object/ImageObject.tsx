import { type ImageObject } from "../../../../store/types/PresentationTypes.ts";
import styles from './ImageObject.module.css'

type ImageProps = {
    src: string
}

function ImageObject(props: ImageProps) {
    return (
        <img
            className={styles.imageObject}
            src={props.src}
        />
    )
}

export {
    ImageObject
}