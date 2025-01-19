import { CSSProperties, useEffect, useRef } from "react";
import { type Slide, type Position } from "../../../store/types/PresentationTypes.ts";
import { SlideObject } from "../slide-object/SlideObject.tsx";
import styles from './Slide.module.css'

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: Slide,
    scale: number,
    elementSelection: string[],
}

function Slide({ slide, scale, elementSelection }: SlideProps) {
    const isElementSelected = (array: string[] | undefined, objectId: string): boolean => {
        return array?.includes(objectId) || false
    }

    const slideRef = useRef<HTMLDivElement>(null)
    const slideStartRef = useRef<Position>({ x: 0, y: 0 })

    const alignmentsRef = useRef<{ objectId: string, x: number, y: number, width: number, height: number }[]>([])

    const getAlignments = (slideElement: Slide): { objectId: string, x: number, y: number, width: number, height: number }[] => {
        let alignmentsData: { objectId: string, x: number, y: number, width: number, height: number }[] = []

        slideElement.objects.forEach((elem) => {
            const newElemData: { objectId: string, x: number, y: number, width: number, height: number } = {
                objectId: elem.id,
                x: elem.position.x,
                y: elem.position.y,
                width: elem.size.width,
                height: elem.size.height,
            }
            alignmentsData.push(newElemData)
        })
        return alignmentsData
    }
    alignmentsRef.current = getAlignments(slide)

    useEffect(() => {
        let rect = slideRef.current?.getBoundingClientRect()
        if (rect) {
            slideStartRef.current.x = rect.x
            slideStartRef.current.y = rect.y
        }
    }, [])

    let slideStyles: CSSProperties = {}
    if (scale < 1) {
        slideStyles.overflow = 'hidden'
    }
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
        case "gradient":
            slideStyles = {
                background: `linear-gradient(${slide.background.angle}deg, ${slide.background.colorOne}, ${slide.background.colorTwo})`,
                width: `${SLIDE_WIDTH * scale}px`,
                height: `${SLIDE_HEIGHT * scale}px`,
            }
            break
        default:
            throw new Error(`Unknown background type on slide: ${slide.id}`)
    }

    return (
        <div ref={slideRef} style={slideStyles} className={styles.slide}>
            {slide.objects.map(object => {
                return (
                    <SlideObject
                        key={object.id}
                        object={object}
                        scale={scale}
                        isSelected={isElementSelected(elementSelection, object.id)}
                        slideStart={slideStartRef}
                        alignmentsRef={alignmentsRef}
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
}
