// import {Presentation} from "./objects-presentation"

// import {changePresentationTitle} from "./objects-presentation"

// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: []
// // }
// // const presentationWithNewTitle: Presentation = changePresentationTitle(presentation, "title2")
// // console.log(JSON.stringify(presentation))
// // console.log(JSON.stringify(presentationWithNewTitle))


// import {Slide} from "./objects-presentation"

// import {addSlide} from "./objects-presentation"

// // //min
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: []
// // }
// // const newSlide: Slide = {
// //     id: "3",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const newPresentation = addSlide(presentation, newSlide)
// // console.log(JSON.stringify(presentation))
// // console.log(JSON.stringify(newPresentation))

// // //max
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1, Slide1, Slide1]
// // }
// // const newSlide: Slide = {
// //     id: "4",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const newPresentation = addSlide(presentation, newSlide)
// // console.log(JSON.stringify(presentation))
// // console.log(JSON.stringify(newPresentation))

// import {deleteSlide} from "./objects-presentation"

// // //min
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: []
// // }
// // const newPresentation = deleteSlide(presentation, "2")
// // console.log(JSON.stringify(presentation))
// // console.log(JSON.stringify(newPresentation))

// // //max
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const Slide2: Slide = {
// //     id: "2",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const Slide3: Slide = {
// //     id: "3",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1, Slide2, Slide3]
// // }
// // const newPresentation: Presentation = deleteSlide(presentation, "2")
// // console.log(JSON.stringify(presentation))
// // console.log(JSON.stringify(newPresentation))

// import {swapSlides} from "./objects-presentation"

// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const Slide2: Slide = {
// //     id: "2",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const Slide3: Slide = {
// //     id: "3",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1, Slide2, Slide3]
// // }
// // const newPresentation: Presentation = swapSlides(presentation, "1", "3")
// // console.log(JSON.stringify(presentation))
// // console.log(JSON.stringify(newPresentation))

// import {TextObject} from "./objects-presentation"

// import {ImageObject} from "./objects-presentation"

// import {SlideObjectProperties} from "./objects-presentation"

// import {Position} from "./objects-presentation"

// import {Size} from "./objects-presentation"

// import {addSlideObject} from "./objects-presentation"

// // //min
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const Elem3: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "1",
// //     index: 1,
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = addSlideObject(presentation, Elem3, "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// // //max
// // const Elem1: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "1",
// //     index: 1,
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Elem2: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "2",
// //     index: 1,
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Elem3: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "3",
// //     index: 1,
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem1, Elem2]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = addSlideObject(presentation, Elem3, "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {removeSlideObject} from "./objects-presentation"

// // //min
// // const Elem: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "1",
// //     index: 1,
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = removeSlideObject(presentation, "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// // //max
// // const Elem1: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "1",
// //     index: 1,
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Elem2: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "2",
// //     index: 1,
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Elem3: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "3",
// //     index: 1,
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem1, Elem2, Elem3]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = removeSlideObject(presentation, "2")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {incSlideObjectLayer} from "./objects-presentation"

// const Elem1: ImageObject = {
//     type: "image",
//     src: "path/to",
//     id: "1",
//     position: {
//         x: 0,
//         y: 0,
//         angle: 0
//     },
//     size: {
//         width: 1,
//         height: 1
//     }
// }
// const Elem2: ImageObject = {
//     type: "image",
//     src: "path/to",
//     id: "2",
//     position: {
//         x: 0,
//         y: 0,
//         angle: 0
//     },
//     size: {
//         width: 1,
//         height: 1
//     }
// }
// const Elem3: ImageObject = {
//     type: "image",
//     src: "path/to",
//     id: "3",
//     position: {
//         x: 0,
//         y: 0,
//         angle: 0
//     },
//     size: {
//         width: 1,
//         height: 1
//     }
// }
// const Slide1: Slide = {
//     id: "1",
//     background: {
//         type: {
//             type: "solid",
//             color: "#ffffff"
//         }
//     },
//     objects: [Elem1, Elem2, Elem3]
// }
// const presentation: Presentation = {
//     title: "title1",
//     slides: [Slide1]
// }
// const newPresentation: Presentation = incSlideObjectLayer(presentation, "1", "1")
// console.log(JSON.stringify(presentation.slides[0].objects))
// console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {decSlideObjectLayer} from "./objects-presentation"

// // const Elem1: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "1",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Elem2: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "2",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Elem3: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "3",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem1, Elem2, Elem3]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = decSlideObjectLayer(presentation, "3", "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {changeSlideObjectPosition} from "./objects-presentation"

// // const Elem: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "3",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = changeSlideObjectPosition(presentation, 3, 3, 3, "3", "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {changeSlideObjectSize} from "./objects-presentation"

// // const Elem: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "3",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = changeSlideObjectSize(presentation, 10, 10, "3", "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {changeSlideObjectTextValue} from "./objects-presentation"

// // const Elem: TextObject = {
// //     type: "text",
// //     value: "11111",
// //     fontFamily: "Times",
// //     fontSize: 5,
// //     fontWeight: 400,
// //     fontColor: "#000000",
// //     id: "3",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = changeSlideObjectTextValue(presentation, "22222", "3", "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {changeSlideObjectFontSize} from "./objects-presentation"

// // const Elem: TextObject = {
// //     type: "text",
// //     value: "111",
// //     fontFamily: "Times",
// //     fontSize: 5,
// //     fontWeight: 400,
// //     fontColor: "#000000",
// //     id: "3",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = changeSlideObjectFontSize(presentation, 10, "3", "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {changeSlideObjectFontFamily} from "./objects-presentation"

// // const Elem: TextObject = {
// //     type: "text",
// //     value: "111",
// //     fontFamily: "Times",
// //     fontSize: 5,
// //     fontWeight: 400,
// //     fontColor: "#000000",
// //     id: "3",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = changeSlideObjectFontFamily(presentation, "Arial", "3", "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {changeSlideObjectFontWeight} from "./objects-presentation"

// // const Elem: TextObject = {
// //     type: "text",
// //     value: "111",
// //     fontFamily: "Times",
// //     fontSize: 5,
// //     fontWeight: 400,
// //     fontColor: "#000000",
// //     id: "3",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = changeSlideObjectFontWeight(presentation, 700, "3", "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {changeSlideObjectFontColor} from "./objects-presentation"

// // const Elem: TextObject = {
// //     type: "text",
// //     value: "111",
// //     fontFamily: "Times",
// //     fontSize: 5,
// //     fontWeight: 400,
// //     fontColor: "#000000",
// //     id: "3",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = changeSlideObjectFontColor(presentation, "#ffffff", "3", "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {changeSlideObjectImageSrc} from "./objects-presentation"

// // const Elem: ImageObject = {
// //     type: "image",
// //     src: "path/to",
// //     id: "3",
// //     position: {
// //         x: 0,
// //         y: 0,
// //         angle: 0
// //     },
// //     size: {
// //         width: 1,
// //         height: 1
// //     }
// // }
// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: [Elem]
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1]
// // }
// // const newPresentation: Presentation = changeSlideObjectImageSrc(presentation, "new/path/to", "3", "1")
// // console.log(JSON.stringify(presentation.slides[0].objects))
// // console.log(JSON.stringify(newPresentation.slides[0].objects))

// import {setSlideBackgroundType} from "./objects-presentation"

// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const Slide2: Slide = {
// //     id: "2",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1, Slide2]
// // }
// // const newPresentation: Presentation = setSlideBackgroundType(presentation, "image", "1", true)
// // console.log(JSON.stringify(presentation.slides))
// // console.log(JSON.stringify(newPresentation.slides))

// import {setSlideBackgroundColor} from "./objects-presentation"

// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#ffffff"
// //         }
// //     },
// //     objects: []
// // }
// // const Slide2: Slide = {
// //     id: "2",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#999999"
// //         }
// //     },
// //     objects: []
// // }
// // const Slide3: Slide = {
// //     id: "3",
// //     background: {
// //         type: {
// //             type: "solid",
// //             color: "#555555"
// //         }
// //     },
// //     objects: []
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1, Slide2, Slide3]
// // }
// // const newPresentation: Presentation = setSlideBackgroundColor(presentation, "#000000", "2", true)
// // console.log(JSON.stringify(presentation.slides))
// // console.log(JSON.stringify(newPresentation.slides))

// import {setSlideBackgroundImage} from "./objects-presentation"

// // const Slide1: Slide = {
// //     id: "1",
// //     background: {
// //         type: {
// //             type: "image",
// //             src: "path1"
// //         }
// //     },
// //     objects: []
// // }
// // const Slide2: Slide = {
// //     id: "2",
// //     background: {
// //         type: {
// //             type: "image",
// //             src: "path2"
// //         }
// //     },
// //     objects: []
// // }
// // const Slide3: Slide = {
// //     id: "3",
// //     background: {
// //         type: {
// //             type: "image",
// //             src: "path3"
// //         }
// //     },
// //     objects: []
// // }
// // const presentation: Presentation = {
// //     title: "title1",
// //     slides: [Slide1, Slide2, Slide3]
// // }
// // const newPresentation: Presentation = setSlideBackgroundImage(presentation, "new/path/to", "1", false)
// // console.log(JSON.stringify(presentation.slides))
// // console.log(JSON.stringify(newPresentation.slides))