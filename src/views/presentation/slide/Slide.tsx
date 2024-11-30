import { CSSProperties, useEffect, useRef } from "react";
import { Position, type Slide } from "../../../store/types/PresentationTypes.ts";
import { SlideObject } from "../slide-object/SlideObject.tsx";
import { dispatch } from "../../../store/editor.ts";
import { clearElementSelection } from "../../../store/setSelection.ts";
import styles from './Slide.module.css'

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: Slide,
    scale: number,
    elementSelection?: string[]
}

let slideStart: Position = {
    x: 0,
    y: 0,
    angle: 0
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
    const slideRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let rect = slideRef.current?.getBoundingClientRect()
        if (rect) {
            slideStart.x = rect.x
            slideStart.y = rect.y
        }
    }, []) ///////////////////////////////////////////////////

    let slideStyles: CSSProperties = {}
    switch (slide.background.type) {
        case "solid":
            slideStyles = {
                backgroundColor: slide.background.color,
                width: `${SLIDE_WIDTH * scale}px`,
                height: `${SLIDE_HEIGHT * scale}px`,
            }
            break
        case "image":
            slideStyles = {
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

    const onClearElementSelection = (event: React.KeyboardEvent) => {
        console.log(event)
        // if (event) {
            // dispatch(clearElementSelection)
        // }
    }

    return (
        <div ref={slideRef} style={slideStyles} className={styles.slide} onKeyDown={onClearElementSelection}>
            {slide.objects.map(object => {
                return (
                    <SlideObject
                        key={object.id}
                        object={object}
                        scale={scale}
                        isSelected={isElementSelected(elementSelection, object.id)}
                    />
                )
            }
            )}
        </div>
    )
}

export {
    Slide,
    SLIDE_WIDTH,
    SLIDE_HEIGHT,
    slideStart
}
