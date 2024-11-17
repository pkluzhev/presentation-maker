// import { createTypeReferenceDirectiveResolutionCache } from "typescript"

type Presentation = {
    title: string,
    slides: Array<Slide>
}

function changePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle,
    }
}

type Slide = {     
    id: string,
    background: Background,
    objects: Array<TextObject | ImageObject>
}

//добавить функцию генерации дефолтного слайда - возвращает слайд

//добавить функцию генерации скопированного слайда - возвращает слайд


function addSlide(presentation: Presentation, newSlide: Slide): Presentation {
    const newSlides = [...presentation.slides]
    newSlides.push(newSlide)
    return {
        ...presentation,
        slides: newSlides,
    }
}

function deleteSlide(presentation: Presentation, delSlideId: string): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.filter((slide) => slide.id !== delSlideId)
    }
}

function swapSlides(presentation: Presentation, slide1Id: string, slide2Id: string): Presentation {
    const slide1Index: number = presentation.slides.findIndex((slide) => slide.id === slide1Id)
    const slide2Index: number = presentation.slides.findIndex((slide) => slide.id === slide2Id)

    function swap(array: Slide[], index1: number, index2: number): Slide[] {
        let temp: Slide = array[index1]
        array[index1] = array[index2]
        array[index2] = temp
        // [array[index1], array[index2]] = [array[index2], array[index1]]
        return array
    };

    return {
        ...presentation,
        slides: swap(structuredClone(presentation).slides, slide1Index, slide2Index)
    }
}

// function swapSlides(slides: Slide[], slide1Id: string, slide2Id: string): Slide[] {
//     const slide1Index: number = slides.findIndex((slide) => slide.id === slide1Id)
//     const slide2Index: number = slides.findIndex((slide) => slide.id === slide2Id)

//     function swap(array: Slide[], index1: number, index2: number): Slide[] {
//         let temp: Slide = array[index1]
//         array[index1] = array[index2]
//         array[index2] = temp
//         // [array[index1], array[index2]] = [array[index2], array[index1]]
//         return array
//     };
//     console.log(slides)
//     return swap(structuredClone(slides), slide1Index, slide2Index)
// }

type TextObject = SlideObjectProperties & {
    type: "text",
    value: string,
    fontFamily: string,
    fontSize: number,
    fontWeight: number,
    fontColor: string
}

type ImageObject = SlideObjectProperties & {
    type: "image",
    src: string
}

type SlideObjectProperties = {
    id: string,
    position: Position,
    size: Size
}

type Position = {
    x: number,
    y: number,
    angle: number,
}

type Size = {
    width: number,
    height: number,
}

//добавить функцию генерации дефолтного текстового элемента - возвращает TextObject | ImageObject

//добавить функцию генерации дефолтной картинки - возвращает TextObject | ImageObject


function addSlideObject(presentation: Presentation, newElement: TextObject | ImageObject, currentSlideId: string): Presentation {
    const newSlides = presentation.slides.map((slide) => {
        if (slide.id !== currentSlideId) {
            return slide
        }
        return {
            ...slide,
            objects: [...slide.objects, newElement]
        }
    })

    return {
        ...presentation,
        slides: newSlides
    }
}

function removeSlideObject(presentation: Presentation, objectId: string): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            return {
                ...slide,
                objects: slide.objects.filter((object) => object.id !== objectId)
            }
        })
    }
}

function incSlideObjectLayer(presentation: Presentation, objectId: string, currentSlideId: string): Presentation {
    function incElem(array: Array<TextObject | ImageObject>, currIndex: number): Array<TextObject | ImageObject> {
        [array[currIndex], array[currIndex + 1]] = [array[currIndex + 1], array[currIndex]]
        return array
    };
    const newSlides = presentation.slides.map((slide) => {
        if (slide.id !== currentSlideId) {
            return slide;
        }
        const incSlideObjectIndex = slide.objects.findIndex((obj) => obj.id === objectId)
        if ((incSlideObjectIndex < 0) || (incSlideObjectIndex >= (slide.objects.length - 1))) {
            return slide;
        }
        return {
            ...slide,
            objects: incElem(structuredClone(slide.objects), incSlideObjectIndex)
        }
    })
    return {
        ...presentation,
        slides: newSlides
    }
}

function decSlideObjectLayer(presentation: Presentation, objectId: string, currentSlideId: string): Presentation {
    function decElem(array: Array<TextObject | ImageObject>, currIndex: number): Array<TextObject | ImageObject> {
        [array[currIndex - 1], array[currIndex]] = [array[currIndex], array[currIndex - 1]]
        return array
    };
    const newSlides = presentation.slides.map((slide) => {
        if (slide.id !== currentSlideId) {
            return slide;
        }
        const incSlideObjectIndex = slide.objects.findIndex((obj) => obj.id === objectId)
        if ((incSlideObjectIndex <= 0) || (incSlideObjectIndex > (slide.objects.length - 1))) {
            return slide;
        }
        return {
            ...slide,
            objects: decElem(structuredClone(slide.objects), incSlideObjectIndex)
        }
    })
    return {
        ...presentation,
        slides: newSlides
    }
}

function changeSlideObjectPosition(presentation: Presentation, newPosX: number, newPosY: number, newAngle: number, objectId: string, currentSlideId: string): Presentation {
    function modifyPosition(object: Position, newX: number, newY: number, newAngle: number): Position {
        object.x = newX
        object.y = newY
        object.angle = newAngle
        return object
    }
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                objects: slide.objects.map((object) => {
                    if (object.id !== objectId) {
                        return object
                    }
                    return {
                        ...object,
                        position: modifyPosition(structuredClone(object.position), newPosX, newPosY, newAngle)
                    }

                })
            }
        })
    }
}

function changeSlideObjectSize(presentation: Presentation, newWidth: number, newHeight: number, objectId: string, currentSlideId: string): Presentation {
    function modifySize(object: Size, width: number, height: number): Size {
        object.width = width
        object.height = height
        return object
    }
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                objects: slide.objects.map((object) => {
                    if (object.id !== objectId) {
                        return object
                    }
                    return {
                        ...object,
                        size: modifySize(structuredClone(object.size), newWidth, newHeight)
                    }

                })
            }
        })
    }
}

function changeSlideObjectTextValue(presentation: Presentation, newValue: string, objectId: string, currentSlideId: string): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                objects: slide.objects.map((object) => {
                    if (object.id !== objectId) {
                        return object
                    }
                    return {
                        ...object,
                        value: newValue
                    }
                })
            }
        })
    }
}

function changeSlideObjectFontSize(presentation: Presentation, newFontSize: number, objectId: string, currentSlideId: string): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                objects: slide.objects.map((object) => {
                    if (object.id !== objectId) {
                        return object
                    }
                    return {
                        ...object,
                        fontSize: newFontSize
                    }
                })
            }
        })
    }
}

function changeSlideObjectFontFamily(presentation: Presentation, newFontFamily: string, objectId: string, currentSlideId: string): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                objects: slide.objects.map((object) => {
                    if (object.id !== objectId) {
                        return object
                    }
                    return {
                        ...object,
                        fontFamily: newFontFamily
                    }
                })
            }
        })
    }
}

function changeSlideObjectFontWeight(presentation: Presentation, newFontWeight: number, objectId: string, currentSlideId: string): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                objects: slide.objects.map((object) => {
                    if (object.id !== objectId) {
                        return object
                    }
                    return {
                        ...object,
                        fontWeight: newFontWeight
                    }
                })
            }
        })
    }
}

function changeSlideObjectFontColor(presentation: Presentation, newFontColor: string, objectId: string, currentSlideId: string): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                objects: slide.objects.map((object) => {
                    if (object.id !== objectId) {
                        return object
                    }
                    return {
                        ...object,
                        fontColor: newFontColor
                    }
                })
            }
        })
    }
}

function changeSlideObjectImageSrc(presentation: Presentation, newSrc: string, objectId: string, currentSlideId: string): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                objects: slide.objects.map((object) => {
                    if (object.id !== objectId) {
                        return object
                    }
                    return {
                        ...object,
                        src: newSrc
                    }
                })
            }
        })
    }
}

type Background = {
    type: SolidBackground | ImageBackground
}

type SolidBackground = {
    type: "solid",
    color: string
}

type ImageBackground = {
    type: "image",
    src: string,
}

function setSlideBackgroundType(presentation: Presentation, backgroundType: string, currentSlideId: string, isForAll?: boolean): Presentation {
    function setBackground(background: string): Background {
        if (background === "solid") {
            return {
                type: { type: "solid", color: "#ffffff" }
            }
        } else {
            return {
                type: { type: "image", src: "path/to/default/image" }
            }
        }
    }
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (!isForAll && slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                background: setBackground(backgroundType)
            }
        })
    }
}

function setSlideBackgroundColor(presentation: Presentation, backgroundColor: string, currentSlideId: string, isForAll?: boolean): Presentation {
    function setBackground(colorStr: string): Background {
        return {
            type: {
                type: "solid",
                color: colorStr
            }
        }
    }
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (!isForAll && slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                background: setBackground(backgroundColor)
            }
        })
    }
}

function setSlideBackgroundImage(presentation: Presentation, imageSrc: string, currentSlideId: string, isForAll?: boolean): Presentation {
    function setBackground(imageStr: string): Background {
        return {
            type: {
                type: "image",
                src: imageStr
            }
        }
    }
    return {
        ...presentation,
        slides: presentation.slides.map((slide) => {
            if (!isForAll && slide.id !== currentSlideId) {
                return slide
            }
            return {
                ...slide,
                background: setBackground(imageSrc)
            }
        })
    }
}

const defaultImageElement: ImageObject = {
    type: "image",
    src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QlQaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAlgDIAMBIgACEQEDEQH/xAAdAAEBAAMBAQEBAQAAAAAAAAAACQYHCAQFAgoD/8QAPxABAAAFAQMKAggEBgMBAAAAAAECAwQGBQcRVggSGSE3dZGSs9MxQQkTFyJRYZXSFBUWQiQyUmJxgTaCoXL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A6zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=",
    id: "",
    position: {
        x: 0,
        y: 0,
        angle: 0
    },
    size: {
        width: 0,
        height: 0
    }
}

export {
    type Presentation,
    type Slide,
    type TextObject,
    type ImageObject,
    type Background,
    type SolidBackground,
    type ImageBackground,
    type Position,

    changePresentationTitle,
    addSlide,
    deleteSlide,
    swapSlides,
    addSlideObject,
    removeSlideObject,
    incSlideObjectLayer,
    decSlideObjectLayer,
    changeSlideObjectPosition,
    changeSlideObjectSize,
    changeSlideObjectTextValue,
    changeSlideObjectFontSize,
    changeSlideObjectFontFamily,
    changeSlideObjectFontWeight,
    changeSlideObjectFontColor,
    changeSlideObjectImageSrc,
    setSlideBackgroundType,
    setSlideBackgroundColor,
    setSlideBackgroundImage,

    defaultImageElement
}