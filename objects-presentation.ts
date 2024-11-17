// import { createTypeReferenceDirectiveResolutionCache } from "typescript"

// export type Presentation = {
//     title: string,
//     slides: Array<Slide>
// }

// export function changePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
//     return {
//         ...presentation,
//         title: newTitle,
//     }
// }

// export type ActiveSlideId = string

// export type ActiveElementId = string

// export type Selection = SlideSelection | ElementSelection

// export type SlideSelection = {
//     type: 'slide',
//     arrayOfId: string[]    //в массиве будут id слайдов
// }

// export type ElementSelection = {
//     type: 'element',
//     arrayOfId: string[]      //в массиве будут id элементов 
// }

// export type Slide = {     
//     id: string,
//     background: Background,
//     objects: Array<TextObject | ImageObject>
// }

// //добавить функцию генерации дефолтного слайда - возвращает слайд

// //добавить функцию генерации скопированного слайда - возвращает слайд


// export function addSlide(presentation: Presentation, newSlide: Slide): Presentation {
//     const newSlides = [...presentation.slides]
//     newSlides.push(newSlide)
//     return {
//         ...presentation,
//         slides: newSlides,
//     }
// }

// export function deleteSlide(presentation: Presentation, delSlideId: string): Presentation {
//     return {
//         ...presentation,
//         slides: presentation.slides.filter((slide) => slide.id !== delSlideId)
//     }
// }

// export function swapSlides(presentation: Presentation, slide1Id: string, slide2Id: string): Presentation {
//     const slide1Index: number = presentation.slides.findIndex((slide) => slide.id === slide1Id)
//     const slide2Index: number = presentation.slides.findIndex((slide) => slide.id === slide2Id)

//     function swap(array: Array<Slide>, index1: number, index2: number): Array<Slide> {
//         [array[index1], array[index2]] = [array[index2], array[index1]]
//         return array
//     };

//     return {
//         ...presentation,
//         slides: swap(structuredClone(presentation).slides, slide1Index, slide2Index)
//     }
// }

// export type TextObject = SlideObjectProperties & {
//     type: "text",
//     value: string,
//     fontFamily: string,
//     fontSize: number,
//     fontWeight: number,
//     fontColor: string
// }

// export type ImageObject = SlideObjectProperties & {
//     type: "image",
//     src: string
// }

// export type SlideObjectProperties = {
//     id: string,
//     position: Position,
//     size: Size
// }

// export type Position = {
//     x: number,
//     y: number,
//     angle: number,
// }

// export type Size = {
//     width: number,
//     height: number,
// }

// //добавить функцию генерации дефолтного текстового элемента - возвращает TextObject | ImageObject

// //добавить функцию генерации дефолтной картинки - возвращает TextObject | ImageObject


// export function addSlideObject(presentation: Presentation, newElement: TextObject | ImageObject, currentSlideId: ActiveSlideId): Presentation {
//     const newSlides = presentation.slides.map((slide) => {
//         if (slide.id !== currentSlideId) {
//             return slide
//         }
//         return {
//             ...slide,
//             objects: [...slide.objects, newElement]
//         }
//     })

//     return {
//         ...presentation,
//         slides: newSlides
//     }
// }

// export function removeSlideObject(presentation: Presentation, objectId: string): Presentation {
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             return {
//                 ...slide,
//                 objects: slide.objects.filter((object) => object.id !== objectId)
//             }
//         })
//     }
// }

// export function incSlideObjectLayer(presentation: Presentation, objectId: string, currentSlideId: ActiveSlideId): Presentation {
//     function incElem(array: Array<TextObject | ImageObject>, currIndex: number): Array<TextObject | ImageObject> {
//         [array[currIndex], array[currIndex + 1]] = [array[currIndex + 1], array[currIndex]]
//         return array
//     };
//     const newSlides = presentation.slides.map((slide) => {
//         if (slide.id !== currentSlideId) {
//             return slide;
//         }
//         const incSlideObjectIndex = slide.objects.findIndex((obj) => obj.id === objectId)
//         if ((incSlideObjectIndex < 0) || (incSlideObjectIndex >= (slide.objects.length - 1))) {
//             return slide;
//         }
//         return {
//             ...slide,
//             objects: incElem(structuredClone(slide.objects), incSlideObjectIndex)
//         }
//     })
//     return {
//         ...presentation,
//         slides: newSlides
//     }
// }

// export function decSlideObjectLayer(presentation: Presentation, objectId: string, currentSlideId: ActiveSlideId): Presentation {
//     function decElem(array: Array<TextObject | ImageObject>, currIndex: number): Array<TextObject | ImageObject> {
//         [array[currIndex - 1], array[currIndex]] = [array[currIndex], array[currIndex - 1]]
//         return array
//     };
//     const newSlides = presentation.slides.map((slide) => {
//         if (slide.id !== currentSlideId) {
//             return slide;
//         }
//         const incSlideObjectIndex = slide.objects.findIndex((obj) => obj.id === objectId)
//         if ((incSlideObjectIndex <= 0) || (incSlideObjectIndex > (slide.objects.length - 1))) {
//             return slide;
//         }
//         return {
//             ...slide,
//             objects: decElem(structuredClone(slide.objects), incSlideObjectIndex)
//         }
//     })
//     return {
//         ...presentation,
//         slides: newSlides
//     }
// }

// export function changeSlideObjectPosition(presentation: Presentation, newPosX: number, newPosY: number, newAngle: number, objectId: string, currentSlideId: ActiveSlideId): Presentation {
//     function modifyPosition(object: Position, newX: number, newY: number, newAngle: number): Position {
//         object.x = newX
//         object.y = newY
//         object.angle = newAngle
//         return object
//     }
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 objects: slide.objects.map((object) => {
//                     if (object.id !== objectId) {
//                         return object
//                     }
//                     return {
//                         ...object,
//                         position: modifyPosition(structuredClone(object.position), newPosX, newPosY, newAngle)
//                     }

//                 })
//             }
//         })
//     }
// }

// export function changeSlideObjectSize(presentation: Presentation, newWidth: number, newHeight: number, objectId: string, currentSlideId: ActiveSlideId): Presentation {
//     function modifySize(object: Size, width: number, height: number): Size {
//         object.width = width
//         object.height = height
//         return object
//     }
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 objects: slide.objects.map((object) => {
//                     if (object.id !== objectId) {
//                         return object
//                     }
//                     return {
//                         ...object,
//                         size: modifySize(structuredClone(object.size), newWidth, newHeight)
//                     }

//                 })
//             }
//         })
//     }
// }

// export function changeSlideObjectTextValue(presentation: Presentation, newValue: string, objectId: string, currentSlideId: ActiveSlideId): Presentation {
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 objects: slide.objects.map((object) => {
//                     if (object.id !== objectId) {
//                         return object
//                     }
//                     return {
//                         ...object,
//                         value: newValue
//                     }
//                 })
//             }
//         })
//     }
// }

// export function changeSlideObjectFontSize(presentation: Presentation, newFontSize: number, objectId: string, currentSlideId: ActiveSlideId): Presentation {
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 objects: slide.objects.map((object) => {
//                     if (object.id !== objectId) {
//                         return object
//                     }
//                     return {
//                         ...object,
//                         fontSize: newFontSize
//                     }
//                 })
//             }
//         })
//     }
// }

// export function changeSlideObjectFontFamily(presentation: Presentation, newFontFamily: string, objectId: string, currentSlideId: ActiveSlideId): Presentation {
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 objects: slide.objects.map((object) => {
//                     if (object.id !== objectId) {
//                         return object
//                     }
//                     return {
//                         ...object,
//                         fontFamily: newFontFamily
//                     }
//                 })
//             }
//         })
//     }
// }

// export function changeSlideObjectFontWeight(presentation: Presentation, newFontWeight: number, objectId: string, currentSlideId: ActiveSlideId): Presentation {
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 objects: slide.objects.map((object) => {
//                     if (object.id !== objectId) {
//                         return object
//                     }
//                     return {
//                         ...object,
//                         fontWeight: newFontWeight
//                     }
//                 })
//             }
//         })
//     }
// }

// export function changeSlideObjectFontColor(presentation: Presentation, newFontColor: string, objectId: string, currentSlideId: ActiveSlideId): Presentation {
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 objects: slide.objects.map((object) => {
//                     if (object.id !== objectId) {
//                         return object
//                     }
//                     return {
//                         ...object,
//                         fontColor: newFontColor
//                     }
//                 })
//             }
//         })
//     }
// }

// export function changeSlideObjectImageSrc(presentation: Presentation, newSrc: string, objectId: string, currentSlideId: ActiveSlideId): Presentation {
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 objects: slide.objects.map((object) => {
//                     if (object.id !== objectId) {
//                         return object
//                     }
//                     return {
//                         ...object,
//                         src: newSrc
//                     }
//                 })
//             }
//         })
//     }
// }

// export type Background = {
//     type: SolidBackground | ImageBackground
// }

// export type SolidBackground = {
//     type: "solid",
//     color: string
// }

// export type ImageBackground = {
//     type: "image",
//     src: string,
// }

// export function setSlideBackgroundType(presentation: Presentation, backgroundType: string, currentSlideId: ActiveSlideId, isForAll?: boolean): Presentation {
//     function setBackground(background: string): Background {
//         if (background === "solid") {
//             return {
//                 type: { type: "solid", color: "#ffffff" }
//             }
//         } else {
//             return {
//                 type: { type: "image", src: "path/to/default/image" }
//             }
//         }
//     }
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (!isForAll && slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 background: setBackground(backgroundType)
//             }
//         })
//     }
// }

// export function setSlideBackgroundColor(presentation: Presentation, backgroundColor: string, currentSlideId: ActiveSlideId, isForAll?: boolean): Presentation {
//     function setBackground(colorStr: string): Background {
//         return {
//             type: {
//                 type: "solid",
//                 color: colorStr
//             }
//         }
//     }
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (!isForAll && slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 background: setBackground(backgroundColor)
//             }
//         })
//     }
// }

// export function setSlideBackgroundImage(presentation: Presentation, imageSrc: string, currentSlideId: ActiveSlideId, isForAll?: boolean): Presentation {
//     function setBackground(imageStr: string): Background {
//         return {
//             type: {
//                 type: "image",
//                 src: imageStr
//             }
//         }
//     }
//     return {
//         ...presentation,
//         slides: presentation.slides.map((slide) => {
//             if (!isForAll && slide.id !== currentSlideId) {
//                 return slide
//             }
//             return {
//                 ...slide,
//                 background: setBackground(imageSrc)
//             }
//         })
//     }
// }