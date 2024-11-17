import { type Slide } from "../../../store/types/PresentationTypes.ts";
import { ImageObject } from "../slide-object/image-object/ImageObject.tsx";
import { TextObject } from "../slide-object/text-object/TextObject.tsx";
import { dispatch } from "../../../store/editor.ts";
// import { selectOneElement } from "../../../store/setSelection.ts";
import { clearElementSelection } from "../../../store/setSelection.ts";

import styles from './Slide.module.css'
import { CSSProperties } from "react";

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: Slide,
    scale: number,
    elementSelection?: string[]
}

function Slide({ slide, scale, elementSelection }: SlideProps) {
    
    const isElementSelected = (array: string[] | undefined, objectId: string): boolean | undefined => {
        let selected: boolean = false
        array?.forEach((element) => {
            if (element === objectId) {
                selected = true
            }
        })
        return selected
    }

    let slideStyles: CSSProperties = {}
    switch (slide.background.type) {
        case "solid":
            slideStyles = {
                position: "relative",
                backgroundColor: slide.background.color,
                width: `${SLIDE_WIDTH * scale}px`,
                height: `${SLIDE_HEIGHT * scale}px`,
            }
            break
        case "image":
            slideStyles = {
                position: "relative",
                backgroundImage: `url(${slide.background.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: `${SLIDE_WIDTH * scale}px`,
                height: `${SLIDE_HEIGHT * scale}px`,
            }
            break
        default:
            throw new Error(`Unknown background type on slide: ${slide.id}`)
    }

    const onClearElementSelection = (event: React.MouseEvent) => {
        if (event.altKey) {
            dispatch(clearElementSelection)
        }
    }
        
    return (
        <div style={slideStyles} className={styles.slide} onClick={ onClearElementSelection }>
            {slide.objects.map(object => {
                switch (object.type) {
                    case "text":
                        return <TextObject
                            key={object.id}
                            object={object}
                            scale={scale}
                            isSelected={isElementSelected(elementSelection, object.id)}
                        />
                    case "image":
                        return <ImageObject
                            key={object.id}
                            object={object}
                            scale={scale}
                            isSelected={isElementSelected(elementSelection, object.id)}
                        />
                    default:
                        throw new Error(`Unknown slide-object type: ${object}`)
                }
            }
            )}
        </div>
    )
}

export {
    Slide,
    SLIDE_WIDTH,
    SLIDE_HEIGHT
}