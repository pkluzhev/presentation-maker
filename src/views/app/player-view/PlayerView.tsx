import styles from './PlayerView.module.css'
import { useEffect, useState } from 'react'
import { useSlidesSelector } from "../../hooks/useAppSelector";
import { Slide, SLIDE_WIDTH, SLIDE_HEIGHT } from "../../presentation/slide/Slide.tsx";
import { Button } from '../../../components/Button.tsx'
import { NavLink } from "react-router";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function PlayerView() {
  const slides = useSlidesSelector()
  const [currentSlide, setCurrentSlide] = useState(1)
  const fullScreenHandler = useFullScreenHandle();

  const onSetPreviousPage = () => {
    if (currentSlide > 1) {
      let newNum: number = currentSlide - 1
      setCurrentSlide(newNum)
    }
  }
  const onSetNextPage = () => {
    if (currentSlide < slides.length) {
      let newNum: number = currentSlide + 1
      setCurrentSlide(newNum)
    }
  }

  const setScale = () => {
    let scale: number = 1.1
    if (fullScreenHandler.active) {
      const screenWidth = window.screen.width
      const screenHeight = window.screen.height
      const scaleX: number = screenWidth / SLIDE_WIDTH
      const scaleY: number = screenHeight / SLIDE_HEIGHT

      scale = Math.min(scaleX, scaleY)
    }
    return scale
  }

  useEffect(() => {
    function onHandleKeyboardEvents(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        onSetNextPage()
      }
      if (event.key === "ArrowLeft") {
        onSetPreviousPage()
      }
    }
    window.addEventListener('keydown', onHandleKeyboardEvents);
    return () => window.removeEventListener('keydown', onHandleKeyboardEvents);
  }, [currentSlide]);

  return (
    <>
      <div className={styles.buttonContainer}>
        <Button className={styles.button} text={'Open on full screen'} onClick={fullScreenHandler.enter}></Button>
        <NavLink to="/">
          <Button className={styles.button} text={'Back to editor'} onClick={() => { }}></Button>
        </NavLink>
      </div>
      {slides.length > 0 &&
        <>
          <FullScreen handle={fullScreenHandler}>
            <div className={styles.slideContainer}>
              <Slide
                key={crypto.randomUUID()}
                slide={slides[currentSlide - 1]}
                scale={setScale()}
              />
              <div className={styles.slideContainerGuard} />
            </div>
          </FullScreen>
          <div className={styles.buttonContainer}>
            <Button className={styles.button} text={'Previous'} onClick={onSetPreviousPage}></Button>
            <div className={styles.slideNum}>{currentSlide}</div>
            <Button className={styles.button} text={'Next'} onClick={onSetNextPage}></Button>
          </div>
        </>
      }
    </>
  )
}

export default PlayerView