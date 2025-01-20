import { CSSProperties } from "react";
import { Scale, type ImageObject } from "../../../../store/types/PresentationTypes.ts";
import styles from './ImageObject.module.css'

type ImageProps = {
    src: string,
    scale: Scale
}

function ImageObject(props: ImageProps) {
    const imageStyles: CSSProperties = {
            transform: `scale(${props.scale.x}, ${props.scale.y})`,
        }
    return (
        <div className={styles.imageContainer}>
            <img style={imageStyles} draggable={false} src={props.src} className={styles.imageObject} />
        </div>
    )
}

export {
    ImageObject
}