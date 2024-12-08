import { Slide } from "../../presentation/slide/Slide.tsx";
import styles from './WorkSpace.module.css'
import { useAppSelector } from "../../hooks/useAppSelector.ts";


// type WorkSpaceProps = {
//     slides: Array<Slide>,
//     slideSelection: string[],
//     elementSelection: string[],
// }


  const editor = useAppSelector((editor => editor))
  const slides = editor.presentation.slides
  const slideSelection = editor.slideSelection
//   const elementSelection = editor.elementSelection


const SLIDE_WORKSPACE_SCALE = 1

function WorkSpace() { //(props: WorkSpaceProps) {
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
                //elementSelection={props.elementSelection}
            />
        </div>
    )
}

export {
    WorkSpace
}