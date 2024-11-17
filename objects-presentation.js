"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePresentationTitle = changePresentationTitle;
exports.addSlide = addSlide;
exports.deleteSlide = deleteSlide;
exports.swapSlides = swapSlides;
exports.addSlideObject = addSlideObject;
exports.removeSlideObject = removeSlideObject;
exports.incSlideObjectLayer = incSlideObjectLayer;
exports.decSlideObjectLayer = decSlideObjectLayer;
exports.changeSlideObjectPosition = changeSlideObjectPosition;
exports.changeSlideObjectSize = changeSlideObjectSize;
exports.changeSlideObjectTextValue = changeSlideObjectTextValue;
exports.changeSlideObjectFontSize = changeSlideObjectFontSize;
exports.changeSlideObjectFontFamily = changeSlideObjectFontFamily;
exports.changeSlideObjectFontWeight = changeSlideObjectFontWeight;
exports.changeSlideObjectFontColor = changeSlideObjectFontColor;
exports.changeSlideObjectImageSrc = changeSlideObjectImageSrc;
exports.setSlideBackgroundType = setSlideBackgroundType;
exports.setSlideBackgroundColor = setSlideBackgroundColor;
exports.setSlideBackgroundImage = setSlideBackgroundImage;
function changePresentationTitle(presentation, newTitle) {
    return __assign(__assign({}, presentation), { title: newTitle });
}
//добавить функцию генерации дефолтного слайда - возвращает слайд
//добавить функцию генерации скопированного слайда - возвращает слайд
function addSlide(presentation, newSlide) {
    var newSlides = __spreadArray([], presentation.slides, true);
    newSlides.push(newSlide);
    return __assign(__assign({}, presentation), { slides: newSlides });
}
function deleteSlide(presentation, delSlideId) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.filter(function (slide) { return slide.id !== delSlideId; }) });
}
function swapSlides(presentation, slide1Id, slide2Id) {
    var slide1Index = presentation.slides.findIndex(function (slide) { return slide.id === slide1Id; });
    var slide2Index = presentation.slides.findIndex(function (slide) { return slide.id === slide2Id; });
    function swap(array, index1, index2) {
        var _a;
        _a = [array[index2], array[index1]], array[index1] = _a[0], array[index2] = _a[1];
        return array;
    }
    ;
    return __assign(__assign({}, presentation), { slides: swap(structuredClone(presentation).slides, slide1Index, slide2Index) });
}
//добавить функцию генерации дефолтного текстового элемента - возвращает TextObject | ImageObject
//добавить функцию генерации дефолтной картинки - возвращает TextObject | ImageObject
function addSlideObject(presentation, newElement, currentSlideId) {
    var newSlides = presentation.slides.map(function (slide) {
        if (slide.id !== currentSlideId) {
            return slide;
        }
        return __assign(__assign({}, slide), { objects: __spreadArray(__spreadArray([], slide.objects, true), [newElement], false) });
    });
    return __assign(__assign({}, presentation), { slides: newSlides });
}
function removeSlideObject(presentation, objectId) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            return __assign(__assign({}, slide), { objects: slide.objects.filter(function (object) { return object.id !== objectId; }) });
        }) });
}
function incSlideObjectLayer(presentation, objectId, currentSlideId) {
    function incElem(array, currIndex) {
        var _a;
        _a = [array[currIndex + 1], array[currIndex]], array[currIndex] = _a[0], array[currIndex + 1] = _a[1];
        return array;
    }
    ;
    var newSlides = presentation.slides.map(function (slide) {
        if (slide.id !== currentSlideId) {
            return slide;
        }
        var incSlideObjectIndex = slide.objects.findIndex(function (obj) { return obj.id === objectId; });
        if ((incSlideObjectIndex < 0) || (incSlideObjectIndex >= (slide.objects.length - 1))) {
            return slide;
        }
        return __assign(__assign({}, slide), { objects: incElem(structuredClone(slide.objects), incSlideObjectIndex) });
    });
    return __assign(__assign({}, presentation), { slides: newSlides });
}
function decSlideObjectLayer(presentation, objectId, currentSlideId) {
    function decElem(array, currIndex) {
        var _a;
        _a = [array[currIndex], array[currIndex - 1]], array[currIndex - 1] = _a[0], array[currIndex] = _a[1];
        return array;
    }
    ;
    var newSlides = presentation.slides.map(function (slide) {
        if (slide.id !== currentSlideId) {
            return slide;
        }
        var incSlideObjectIndex = slide.objects.findIndex(function (obj) { return obj.id === objectId; });
        if ((incSlideObjectIndex <= 0) || (incSlideObjectIndex > (slide.objects.length - 1))) {
            return slide;
        }
        return __assign(__assign({}, slide), { objects: decElem(structuredClone(slide.objects), incSlideObjectIndex) });
    });
    return __assign(__assign({}, presentation), { slides: newSlides });
}
function changeSlideObjectPosition(presentation, newPosX, newPosY, newAngle, objectId, currentSlideId) {
    function modifyPosition(object, newX, newY, newAngle) {
        object.x = newX;
        object.y = newY;
        object.angle = newAngle;
        return object;
    }
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { objects: slide.objects.map(function (object) {
                    if (object.id !== objectId) {
                        return object;
                    }
                    return __assign(__assign({}, object), { position: modifyPosition(structuredClone(object.position), newPosX, newPosY, newAngle) });
                }) });
        }) });
}
function changeSlideObjectSize(presentation, newWidth, newHeight, objectId, currentSlideId) {
    function modifySize(object, width, height) {
        object.width = width;
        object.height = height;
        return object;
    }
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { objects: slide.objects.map(function (object) {
                    if (object.id !== objectId) {
                        return object;
                    }
                    return __assign(__assign({}, object), { size: modifySize(structuredClone(object.size), newWidth, newHeight) });
                }) });
        }) });
}
function changeSlideObjectTextValue(presentation, newValue, objectId, currentSlideId) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { objects: slide.objects.map(function (object) {
                    if (object.id !== objectId) {
                        return object;
                    }
                    return __assign(__assign({}, object), { value: newValue });
                }) });
        }) });
}
function changeSlideObjectFontSize(presentation, newFontSize, objectId, currentSlideId) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { objects: slide.objects.map(function (object) {
                    if (object.id !== objectId) {
                        return object;
                    }
                    return __assign(__assign({}, object), { fontSize: newFontSize });
                }) });
        }) });
}
function changeSlideObjectFontFamily(presentation, newFontFamily, objectId, currentSlideId) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { objects: slide.objects.map(function (object) {
                    if (object.id !== objectId) {
                        return object;
                    }
                    return __assign(__assign({}, object), { fontFamily: newFontFamily });
                }) });
        }) });
}
function changeSlideObjectFontWeight(presentation, newFontWeight, objectId, currentSlideId) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { objects: slide.objects.map(function (object) {
                    if (object.id !== objectId) {
                        return object;
                    }
                    return __assign(__assign({}, object), { fontWeight: newFontWeight });
                }) });
        }) });
}
function changeSlideObjectFontColor(presentation, newFontColor, objectId, currentSlideId) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { objects: slide.objects.map(function (object) {
                    if (object.id !== objectId) {
                        return object;
                    }
                    return __assign(__assign({}, object), { fontColor: newFontColor });
                }) });
        }) });
}
function changeSlideObjectImageSrc(presentation, newSrc, objectId, currentSlideId) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { objects: slide.objects.map(function (object) {
                    if (object.id !== objectId) {
                        return object;
                    }
                    return __assign(__assign({}, object), { src: newSrc });
                }) });
        }) });
}
function setSlideBackgroundType(presentation, backgroundType, currentSlideId, isForAll) {
    function setBackground(background) {
        if (background === "solid") {
            return {
                type: { type: "solid", color: "#ffffff" }
            };
        }
        else {
            return {
                type: { type: "image", src: "path/to/default/image" }
            };
        }
    }
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (!isForAll && slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { background: setBackground(backgroundType) });
        }) });
}
function setSlideBackgroundColor(presentation, backgroundColor, currentSlideId, isForAll) {
    function setBackground(colorStr) {
        return {
            type: {
                type: "solid",
                color: colorStr
            }
        };
    }
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (!isForAll && slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { background: setBackground(backgroundColor) });
        }) });
}
function setSlideBackgroundImage(presentation, imageSrc, currentSlideId, isForAll) {
    function setBackground(imageStr) {
        return {
            type: {
                type: "image",
                src: imageStr
            }
        };
    }
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            if (!isForAll && slide.id !== currentSlideId) {
                return slide;
            }
            return __assign(__assign({}, slide), { background: setBackground(imageSrc) });
        }) });
}
