import { type ImageObject } from "../../../../store/types/PresentationTypes.ts";
import styles from './ImageObject.module.css'
import { CSSProperties } from "react";


type ImageProps = {
    src: string
}

function ImageObject(props: ImageProps) {
    const imgStyles: CSSProperties = {
        backgroundImage: `url(${props.src})`,
    }
    return (
        <div
            style={imgStyles}
            className={styles.imageObject}
        />
    )
}

export {
    ImageObject
}