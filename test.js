"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// //min
// const Elem: ImageObject = {
//     type: "image",
//     src: "path/to",
//     id: "1",
//     index: 1,
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
//     objects: []
// }
// const presentation: Presentation = {
//     title: "title1",
//     slides: [Slide1]
// }
// const newPresentation: Presentation = removeSlideObject(presentation, "1")
// console.log(JSON.stringify(presentation.slides[0].objects))
// console.log(JSON.stringify(newPresentation.slides[0].objects))
// //max
// const Elem1: ImageObject = {
//     type: "image",
//     src: "path/to",
//     id: "1",
//     index: 1,
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
//     index: 1,
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
//     index: 1,
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
// const newPresentation: Presentation = removeSlideObject(presentation, "2")
// console.log(JSON.stringify(presentation.slides[0].objects))
// console.log(JSON.stringify(newPresentation.slides[0].objects))
var objects_presentation_1 = require("./objects-presentation");
var Elem1 = {
    type: "image",
    src: "path/to",
    id: "1",
    position: {
        x: 0,
        y: 0,
        angle: 0
    },
    size: {
        width: 1,
        height: 1
    }
};
var Elem2 = {
    type: "image",
    src: "path/to",
    id: "2",
    position: {
        x: 0,
        y: 0,
        angle: 0
    },
    size: {
        width: 1,
        height: 1
    }
};
var Elem3 = {
    type: "image",
    src: "path/to",
    id: "3",
    position: {
        x: 0,
        y: 0,
        angle: 0
    },
    size: {
        width: 1,
        height: 1
    }
};
var Slide1 = {
    id: "1",
    background: {
        type: {
            type: "solid",
            color: "#ffffff"
        }
    },
    objects: [Elem1, Elem2, Elem3]
};
var presentation = {
    title: "title1",
    slides: [Slide1]
};
var newPresentation = (0, objects_presentation_1.incSlideObjectLayer)(presentation, "1", "1");
console.log(JSON.stringify(presentation.slides[0].objects));
console.log(JSON.stringify(newPresentation.slides[0].objects));
// const Slide1: Slide = {
//     id: "1",
//     background: {
//         type: {
//             type: "image",
//             src: "path1"
//         }
//     },
//     objects: []
// }
// const Slide2: Slide = {
//     id: "2",
//     background: {
//         type: {
//             type: "image",
//             src: "path2"
//         }
//     },
//     objects: []
// }
// const Slide3: Slide = {
//     id: "3",
//     background: {
//         type: {
//             type: "image",
//             src: "path3"
//         }
//     },
//     objects: []
// }
// const presentation: Presentation = {
//     title: "title1",
//     slides: [Slide1, Slide2, Slide3]
// }
// const newPresentation: Presentation = setSlideBackgroundImage(presentation, "new/path/to", "1", false)
// console.log(JSON.stringify(presentation.slides))
// console.log(JSON.stringify(newPresentation.slides))
