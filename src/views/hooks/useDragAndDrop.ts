import { CSSProperties, PointerEventHandler, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { type Position, type Size, type SlideObjectProperties } from "../../store/types/PresentationTypes.ts";
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "../../views/presentation/slide/Slide.tsx";
import { useAppActions } from "../hooks/useAppActions.ts";
import { ImageObject, TextObject } from "../../store/types/PresentationTypes.ts";

type ResizeAttribute = null | 'LT' | 'LM' | 'LB' | 'RT' | 'RM' | 'RB' | 'MB' | 'MT'

const useDragAndDrop = (
  object: TextObject | ImageObject, 
  isSelected: boolean, 
  slideStart: RefObject<Position>, 
  alignmentsRef: RefObject<{ objectId: string, x: number, y: number, width: number, height: number }[]>,
) => {
  const { selectOneElement } = useAppActions()
  const { addToElementSelection } = useAppActions()

  const { changeSlideObjectPosition } = useAppActions()
  const { changeSlideObjectPositionAndSize } = useAppActions()

  const elementFinalData = useRef<SlideObjectProperties>({
    id: object.id,
    position: object.position,
    size: object.size
  })

  let delta: Position = {
    x: 0,
    y: 0
  }

  const dragElementRef = useRef<HTMLDivElement>(null)
  const startPointerPosInsideElem = useRef<Position>()
  const [dragging, setDragging] = useState(false);

  const [verticalCenterAlignment, setVerticalCenterAlignment] = useState(false);

  const [objectVerticalAlignment, setObjectVerticalAlignment] = useState<boolean>();
  const [objectHorizontalAlignment, setObjectHorizontalAlignment] = useState<boolean>();

  const [objectVerticalCenterAlignment, setObjectVerticalCenterAlignment] = useState<boolean>();
  const [objectHorizontalCenterAlignment, setObjectHorizontalCenterAlignment] = useState<boolean>();

  const [verticalAlignPos, setVerticalAlignPos] = useState<CSSProperties>({})
  const [horizontalAlignPos, setHorizontalAlignPos] = useState<CSSProperties>({})

  const [verticalCenterObjectAlignPos, setVerticalCenterObjectAlignPos] = useState<CSSProperties>({})
  const [horizontalCenterObjectAlignPos, setHorizontalCenterObjectAlignPos] = useState<CSSProperties>({})

  const [resizingType, setResizingType] = useState<ResizeAttribute>(null);

  const startPos = useRef<Position>()
  const startSize = useRef<Size>()
  const startPosition = useRef<Position>()
  const resizeAttribute = useRef<ResizeAttribute>()

  const handleDragStart = useCallback<PointerEventHandler>((event) => {
    if (!isSelected && event.ctrlKey) {
      addToElementSelection(object.id)
      return
    }
    selectOneElement(object.id)
    if (!dragElementRef.current) return
    const dragElementRect = dragElementRef.current?.getBoundingClientRect();
    startPointerPosInsideElem.current = {
      x: dragElementRect.left - event.pageX,
      y: dragElementRect.top - event.pageY
    }
    setDragging(true)
  }, [])

  const handleDragMove = useCallback((event: PointerEvent) => {
    if (!dragElementRef.current || !startPointerPosInsideElem.current
      || !slideStart.current || !elementFinalData.current
      || !alignmentsRef.current) return

    elementFinalData.current.position.x = event.pageX + startPointerPosInsideElem.current.x - slideStart.current.x
    elementFinalData.current.position.y = event.pageY + startPointerPosInsideElem.current.y - slideStart.current.y
    dragElementRef.current.style.left = elementFinalData.current.position.x + 'px'
    dragElementRef.current.style.top = elementFinalData.current.position.y + 'px'
    if (elementFinalData.current.position.x <= 0) {
      dragElementRef.current.style.left = 0 + 'px'
      elementFinalData.current.position.x = 0
    }
    if (elementFinalData.current.position.x + object.size.width >= SLIDE_WIDTH) {
      dragElementRef.current.style.left = (SLIDE_WIDTH - object.size.width - 2) + 'px'
      elementFinalData.current.position.x = SLIDE_WIDTH - object.size.width - 2
    }
    if (elementFinalData.current.position.y <= 0) {
      dragElementRef.current.style.top = 0 + 'px'
      elementFinalData.current.position.y = 0
    }
    if (elementFinalData.current.position.y + object.size.height >= SLIDE_HEIGHT - 2) {
      dragElementRef.current.style.top = (SLIDE_HEIGHT - object.size.height - 2) + 'px'
      elementFinalData.current.position.y = SLIDE_HEIGHT - object.size.height - 2
    }
    if ((elementFinalData.current.position.x + object.size.width / 2) >= (SLIDE_WIDTH / 2 - 5)
      && (elementFinalData.current.position.x + object.size.width / 2) <= (SLIDE_WIDTH / 2 + 5)) {
      dragElementRef.current.style.left = (SLIDE_WIDTH / 2 - object.size.width / 2) + 'px'
      elementFinalData.current.position.x = SLIDE_WIDTH / 2 - object.size.width / 2
      setVerticalCenterAlignment(true)
    } else {
      setVerticalCenterAlignment(false)
    }
    setObjectVerticalAlignment(false)
    setObjectVerticalCenterAlignment(false)
    alignmentsRef.current.forEach((elem) => {
      if (elem.objectId !== object.id) {
        if (elementFinalData.current.position.x >= (elem.x - 5)
          && elementFinalData.current.position.x <= (elem.x + 5)
          && dragElementRef.current) {
          dragElementRef.current.style.left = elem.x + 'px'
          elementFinalData.current.position.x = elem.x
          setObjectVerticalAlignment(true)
          setVerticalAlignPos({ left: elem.x + 'px' })
          return
        }
        if (elementFinalData.current.position.x + elementFinalData.current.size.width >= (elem.x + elem.width - 5)
          && elementFinalData.current.position.x + elementFinalData.current.size.width <= (elem.x + elem.width + 5)
          && dragElementRef.current) {
          dragElementRef.current.style.left = elem.x + elem.width - elementFinalData.current.size.width + 'px'
          elementFinalData.current.position.x = elem.x + elem.width - elementFinalData.current.size.width
          setObjectVerticalAlignment(true)
          setVerticalAlignPos({ left: elem.x + elem.width + 'px' })
          return
        }
        if (elementFinalData.current.position.x + elementFinalData.current.size.width / 2 >= (elem.x + elem.width / 2 - 5)
          && elementFinalData.current.position.x + elementFinalData.current.size.width / 2 <= (elem.x + elem.width / 2 + 5)
          && dragElementRef.current) {
          dragElementRef.current.style.left = elem.x + elem.width / 2 - elementFinalData.current.size.width / 2 + 'px'
          elementFinalData.current.position.x = elem.x + elem.width / 2 - elementFinalData.current.size.width / 2
          setObjectVerticalCenterAlignment(true)
          setVerticalCenterObjectAlignPos({ left: elem.x + elem.width / 2 + 'px' })
          return
        }
      }
    })

    setObjectHorizontalAlignment(false)
    setObjectHorizontalCenterAlignment(false)
    alignmentsRef.current.forEach((elem) => {
      if (elem.objectId !== object.id) {
        if (elementFinalData.current.position.y >= (elem.y - 5)
          && elementFinalData.current.position.y <= (elem.y + 5)
          && dragElementRef.current) {
          dragElementRef.current.style.top = elem.y + 'px'
          elementFinalData.current.position.y = elem.y
          setObjectHorizontalAlignment(true)
          setHorizontalAlignPos({ top: elem.y + 'px' })
          return
        }
        if (elementFinalData.current.position.y + elementFinalData.current.size.height >= (elem.y + elem.height - 5)
          && elementFinalData.current.position.y + elementFinalData.current.size.height <= (elem.y + elem.height + 5)
          && dragElementRef.current) {
          dragElementRef.current.style.top = elem.y + elem.height - elementFinalData.current.size.height + 'px'
          elementFinalData.current.position.y = elem.y + elem.height - elementFinalData.current.size.height
          setObjectHorizontalAlignment(true)
          setHorizontalAlignPos({ top: elem.y + elem.height + 'px' })
          return
        }
        if (elementFinalData.current.position.y + elementFinalData.current.size.height / 2 >= (elem.y + elem.height / 2 - 5)
          && elementFinalData.current.position.y + elementFinalData.current.size.height / 2 <= (elem.y + elem.height / 2 + 5)
          && dragElementRef.current) {
          dragElementRef.current.style.top = elem.y + elem.height / 2 - elementFinalData.current.size.height / 2 + 'px'
          elementFinalData.current.position.y = elem.y + elem.height / 2 - elementFinalData.current.size.height / 2
          setObjectHorizontalCenterAlignment(true)
          setHorizontalCenterObjectAlignPos({ top: elem.y + elem.height / 2 + 'px' })
          return
        }
      }
    })
  }, [])

  const handleDragEnd = useCallback(() => {
    setDragging(false)
    setVerticalCenterAlignment(false)
    setObjectVerticalAlignment(false)
    setObjectHorizontalAlignment(false)

    setObjectVerticalCenterAlignment(false)
    setObjectHorizontalCenterAlignment(false)

    setVerticalAlignPos({})
    setHorizontalAlignPos({})

    setVerticalCenterObjectAlignPos({})
    setHorizontalCenterObjectAlignPos({})

    changeSlideObjectPosition(elementFinalData.current.position)
  }, [])

  const handleResizeStart = useCallback((event: any, type: ResizeAttribute) => {
    if (!type || !dragElementRef.current) return
    startPos.current = {
      x: event.pageX,
      y: event.pageY
    }
    const resizeElementRect = dragElementRef.current.getBoundingClientRect();
    startSize.current = {
      width: resizeElementRect?.width,
      height: resizeElementRect?.height,
    }
    startPosition.current = {
      x: resizeElementRect?.x,
      y: resizeElementRect?.y,
    }
    resizeAttribute.current = type
    setResizingType(type)
  }, [])

  const handleResizeMove = useCallback((event: PointerEvent) => {
    if (!dragElementRef.current || !startPos.current || !startSize.current || !startPosition.current || !slideStart.current) return
    let endPos: Position = {
      x: event.pageX,
      y: event.pageY
    }
    if (endPos.x < slideStart.current.x) {
      endPos.x = slideStart.current.x
    }
    if (endPos.x > slideStart.current.x + SLIDE_WIDTH) {
      endPos.x = slideStart.current.x + SLIDE_WIDTH
    }
    if (endPos.y < slideStart.current.y) {
      endPos.y = slideStart.current.y
    }
    if (endPos.y > slideStart.current.y + SLIDE_HEIGHT) {
      endPos.y = slideStart.current.y + SLIDE_HEIGHT
    }
    delta.x = endPos.x - startPos.current.x
    delta.y = endPos.y - startPos.current.y
    switch (resizeAttribute.current) {
      case 'RB':
        elementFinalData.current.size.width = startSize.current.width + delta.x
        elementFinalData.current.size.height = startSize.current.height + delta.y
        if (elementFinalData.current.size.width < 24) {
          elementFinalData.current.size.width = 24
        }
        if (elementFinalData.current.size.height < 24) {
          elementFinalData.current.size.height = 24
        }
        break
      case 'RM':
        elementFinalData.current.size.width = startSize.current.width + delta.x
        if (elementFinalData.current.size.width < 24) {
          elementFinalData.current.size.width = 24
        }
        break
      case 'RT':
        elementFinalData.current.size.width = startSize.current.width + delta.x
        elementFinalData.current.size.height = startSize.current.height - delta.y
        if (elementFinalData.current.size.width < 24) {
          elementFinalData.current.size.width = 24
          delta.x = startPos.current.x - elementFinalData.current.size.width
        }
        if (elementFinalData.current.size.height < 24) {
          elementFinalData.current.size.height = 24
          elementFinalData.current.position.y = startPosition.current?.y - slideStart.current.y + startSize.current.height - elementFinalData.current.size.height
        } else {
          elementFinalData.current.position.y = startPosition.current?.y - slideStart.current.y + delta.y
        }
        break
      case 'MT':
        elementFinalData.current.size.height = startSize.current.height - delta.y
        if (elementFinalData.current.size.height < 24) {
          elementFinalData.current.size.height = 24
          elementFinalData.current.position.y = startPosition.current?.y - slideStart.current.y + startSize.current.height - elementFinalData.current.size.height
        } else {
          elementFinalData.current.position.y = startPosition.current?.y - slideStart.current.y + delta.y
        }
        break
      case 'LT':
        elementFinalData.current.size.width = startSize.current.width - delta.x
        elementFinalData.current.size.height = startSize.current.height - delta.y
        if (elementFinalData.current.size.width < 24) {
          elementFinalData.current.size.width = 24
          elementFinalData.current.position.x = startPosition.current?.x - slideStart.current.x + startSize.current.width - elementFinalData.current.size.width
        } else {
          elementFinalData.current.position.x = startPosition.current?.x - slideStart.current.x + delta.x
        }
        if (elementFinalData.current.size.height < 24) {
          elementFinalData.current.size.height = 24
          elementFinalData.current.position.y = startPosition.current?.y - slideStart.current.y + startSize.current.height - elementFinalData.current.size.height
        } else {
          elementFinalData.current.position.y = startPosition.current?.y - slideStart.current.y + delta.y
        }
        break
      case 'LM':
        elementFinalData.current.size.width = startSize.current.width - delta.x
        if (elementFinalData.current.size.width < 24) {
          elementFinalData.current.size.width = 24
          elementFinalData.current.position.x = startPosition.current?.x - slideStart.current.x + startSize.current.width - elementFinalData.current.size.width
        } else {
          elementFinalData.current.position.x = startPosition.current?.x - slideStart.current.x + delta.x
        }
        break
      case 'LB':
        elementFinalData.current.size.width = startSize.current.width - delta.x
        elementFinalData.current.size.height = startSize.current.height + delta.y
        if (elementFinalData.current.size.width < 24) {
          elementFinalData.current.size.width = 24
          elementFinalData.current.position.x = startPosition.current?.x - slideStart.current.x + startSize.current.width - elementFinalData.current.size.width
        } else {
          elementFinalData.current.position.x = startPosition.current?.x - slideStart.current.x + delta.x
        }
        if (elementFinalData.current.size.height < 24) {
          elementFinalData.current.size.height = 24
        }
        break
      case 'MB':
        elementFinalData.current.size.height = startSize.current.height + delta.y
        if (elementFinalData.current.size.height < 24) {
          elementFinalData.current.size.height = 24
        }
        break
      default:
        break
    }
    dragElementRef.current.style.top = elementFinalData.current.position.y + 'px'
    dragElementRef.current.style.left = elementFinalData.current.position.x + 'px'
    dragElementRef.current.style.width = elementFinalData.current.size.width + 'px'
    dragElementRef.current.style.height = elementFinalData.current.size.height + 'px'
  }, [])

  const handleResizeEnd = useCallback(() => {
    resizeAttribute.current = null
    setResizingType(null)
    setDragging(false)
    changeSlideObjectPositionAndSize(elementFinalData.current)
  }, [])

  useEffect(() => {
    if (resizingType !== null) {
      window.addEventListener('pointermove', handleResizeMove)
      window.addEventListener('pointerup', handleResizeEnd)
      return () => {
        window.removeEventListener('pointermove', handleResizeMove)
        window.removeEventListener('pointerup', handleResizeEnd)
      }
    }
    if (dragging) {
      window.addEventListener('pointermove', handleDragMove)
      window.addEventListener('pointerup', handleDragEnd)
      return () => {
        window.removeEventListener('pointermove', handleDragMove)
        window.removeEventListener('pointerup', handleDragEnd)
      }
    }
  }, [dragging, handleDragMove, handleDragEnd, handleResizeMove, handleResizeEnd])

  return {
    dragElementRef,
    verticalCenterAlignment,
    objectVerticalAlignment,
    objectHorizontalAlignment,
    objectVerticalCenterAlignment,
    objectHorizontalCenterAlignment,
    verticalAlignPos,
    horizontalAlignPos,
    verticalCenterObjectAlignPos,
    horizontalCenterObjectAlignPos,
    handleDragStart,
    handleResizeStart,
  }
}

export {
  useDragAndDrop,
} 
