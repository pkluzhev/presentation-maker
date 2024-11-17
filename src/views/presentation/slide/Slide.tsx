import { type Slide } from "../../../store/types/PresentationTypes.ts";
import { ImageObject } from "../slide-object/image-object/ImageObject.tsx";
import { TextObject } from "../slide-object/text-object/TextObject.tsx";
import { dispatch } from "../../../store/editor.ts";
import { selectOneElement } from "../../../store/setSelection.ts";
import { addToElementSelection, clearElementSelection } from "../../../store/setSelection.ts";

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
    function isElementSelected(array: string[] | undefined, objectId: string): boolean | undefined {
        let selected: boolean = false
        array?.forEach((element) => {
            if (element === objectId) {
                selected = true
            }
        })
        return selected
    }

    let slideStyles: CSSProperties = {}
    switch (slide.background.type.type) {
        case "solid":
            slideStyles = {
                position: "relative",
                backgroundColor: slide.background.type.color,
                width: `${SLIDE_WIDTH * scale}px`,
                height: `${SLIDE_HEIGHT * scale}px`,
            }
            break
        case "image":
            slideStyles = {
                position: "relative",
                backgroundImage: `url(${slide.background.type.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: `${SLIDE_WIDTH * scale}px`,
                height: `${SLIDE_HEIGHT * scale}px`,
            }
            break
        default:
            throw new Error(`Unknown background type: ${slide.background.type}`)
    }

    // const MouseDownHandler = (object: ImageObject | TextObject, event: React.MouseEvent) => {
    //     if (!isElementSelected(elementSelection, object.id)) {
    //         if (event.ctrlKey) {
    //             dispatch(addToElementSelection, object.id)
    //         } else {
    //             dispatch(selectOneElement, object.id)
    //         }
    //         console.log(event.pageX)
    //         console.log(event.pageY)
    //     }
    // }

    const onClickHandler = (event: React.MouseEvent) => {
        if (event.altKey) {
            dispatch(clearElementSelection)
        }
    }
        
    return (
        <div style={slideStyles} className={styles.slide} onClick={ onClickHandler }>
            {slide.objects.map(object => {
                switch (object.type) {
                    //оборачивать в компонент Selectable-resizeble-moveable-object
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