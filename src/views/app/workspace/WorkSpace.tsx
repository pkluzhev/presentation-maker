import { Slide } from "../../presentation/slide/Slide.tsx";
import styles from './WorkSpace.module.css'
import { useSlidesSelector, useSlideSelectionSelector } from "../../hooks/useAppSelector.ts";

const SLIDE_WORKSPACE_SCALE = 1

function WorkSpace() {
    const slides = useSlidesSelector()
    const slideSelection = useSlideSelectionSelector()

    if (slides.length <= 0) {
        return <></>
    }
    let currentSlideIndex: number = 0
    if (slideSelection.length > 0) {
        currentSlideIndex = slides.findIndex((slide) => {
            return slide.id === slideSelection[slideSelection.length - 1]
        })
    }
    if (currentSlideIndex === -1) {
        return <></>
    }
    return (
        <div className={styles.workSpace}>
            <Slide
                slide={slides[currentSlideIndex]}
                scale={SLIDE_WORKSPACE_SCALE}
            />
        </div>
    )
}

export {
    WorkSpace
}