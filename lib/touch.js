//touch parameters
const touchParams = {
    pageX: 0,
    pageY: 0,
    offsetX: 0,
    offsetY: 0,
    translateX: 0,
    translateY: 0,
    translateX2: 0,
    translateY2: 0,
    scale: 1,
    initialScale: 1,
    initialScaleLength: void 0,
    finger: 1
}
let instance = void 0,
    dom = document.body,
    viewportHeight = void 0,
    viewportWidth = void 0,
    imageWidth = void 0,
    imageHeight = void 0,
    edgetop = void 0,
    edgebottom = void 0

let touchGestureAction = options => {
    instance = options.instance,
        dom = options.dom,
        viewportHeight = options.viewportHeight,
        viewportWidth = options.viewportWidth,
        imageWidth = options.width,
        imageHeight = options.height,
        edgetop = options.edgetop,
        edgebottom = options.edgebottom
    //touchstart
    dom.addEventListener("touchstart", touchStart, false)
    //touchmove
    dom.addEventListener("touchmove", touchMove, false)
    //touchend
    dom.addEventListener("touchend", touchEnd, false)
}
let cancelEvent = event => {
    event.stopPropagation();
    event.preventDefault();
}
let updateTouchState = (options) => {
    for (const prop in touchParams) {
        if (touchParams.hasOwnProperty(prop)) {
            if (options[prop] !== undefined && (options[prop] !== touchParams[prop])) touchParams[prop] = options[prop]
        }
    }
}
let touchGesture = touches => {
    const _LENGTH = touches.length
    touchParams.finger = _LENGTH
}
let reserveDecimal = (num, digit) => Math.floor(parseFloat(num) * Math.pow(10, digit)) / Math.pow(10, digit)
let Frointier = () => {
    let frointierX = void 0,
        frointierY = void 0
    if (touchParams.scale < 1) {
        initializeTouchState()
        touchTransform()
    }
    if (touchParams.scale === 1) {
        if (imageWidth > imageHeight) {
            frointierX = (imageWidth - imageHeight) / 2
            updateTouchState({
                translateY: touchParams.translateY + touchParams.offsetY,
            })
            if (touchParams.translateY !== 0) {
                updateTouchState({
                    translateY: 0,
                    offsetY: 0
                })
                touchTransform()
            }
            updateTouchState({
                translateX: touchParams.translateX + touchParams.offsetX,
            })
            if (touchParams.translateX > frointierX) {
                updateTouchState({
                    translateX: frointierX,
                    offsetX: 0
                })
                touchTransform()
            }
            if (touchParams.translateX < -frointierX) {
                updateTouchState({
                    translateX: -frointierX,
                    offsetX: 0
                })
                touchTransform()
            }
        } else {
            updateTouchState({
                translateX: touchParams.translateX + touchParams.offsetX
            })
            if (touchParams.translateX !== 0) {
                updateTouchState({
                    translateX: 0,
                    offsetX: 0
                })
                touchTransform()
            }
            updateTouchState({
                translateY: touchParams.translateY + touchParams.offsetY
            })
            if (touchParams.translateY > edgetop) {
                updateTouchState({
                    translateY: edgetop,
                    offsetY: 0,
                })
                touchTransform()
            }
            if (touchParams.translateY < edgebottom) {
                updateTouchState({
                    translateY: edgebottom,
                    offsetY: 0,
                })
                touchTransform()
            }
        }
    }
    if (touchParams.scale > 1) {
        if (imageWidth > imageHeight) {
            frointierX = imageWidth * (touchParams.scale - 1) / 2 + (imageWidth - imageHeight) / 2
            frointierY = imageHeight * (touchParams.scale - 1) / 2
            updateTouchState({
                translateY: touchParams.translateY + touchParams.offsetY,
            })
            if (touchParams.translateY > frointierY) {
                updateTouchState({
                    translateY: frointierY,
                    offsetY: 0
                })
                touchTransform()
            }
            if (touchParams.translateY < -frointierY) {
                updateTouchState({
                    translateY: -frointierY,
                    offsetY: 0
                })
                touchTransform()
            }
            updateTouchState({
                translateX: touchParams.translateX + touchParams.offsetX
            })
            if (touchParams.translateX > frointierX) {
                updateTouchState({
                    translateX: frointierX,
                    offsetX: 0
                })
                touchTransform()
            }
            if (touchParams.translateX < -frointierX) {
                updateTouchState({
                    translateX: -frointierX,
                    offsetX: 0
                })
                touchTransform()
            }
        } else {
            frointierX = imageWidth * (touchParams.scale - 1) / 2
            frointierY = imageHeight * (touchParams.scale - 1) / 2
            updateTouchState({
                translateX: touchParams.translateX + touchParams.offsetX
            })
            if (touchParams.translateX > frointierX) {
                updateTouchState({
                    translateX: frointierX,
                    offsetX: 0
                })
                touchTransform()
            }
            if (touchParams.translateX < -frointierX) {
                updateTouchState({
                    translateX: -frointierX,
                    offsetX: 0
                })
                touchTransform()
            }
            updateTouchState({
                translateY: touchParams.translateY + touchParams.offsetY
            })
            if (touchParams.translateY > frointierY) {
                updateTouchState({
                    translateY: (edgetop + frointierY),
                    offsetY: 0
                })
                touchTransform()
            }
            if (touchParams.translateY < -frointierY) {
                updateTouchState({
                    translateY: -(edgetop + frointierY),
                    offsetY: 0
                })
                touchTransform()
            }
        }
    }
}

let getTransform = () => {
    const transforms = [],
        scale = touchParams.scale,
        translateX = (touchParams.translateX + touchParams.offsetX) / touchParams.scale,
        translateY = (touchParams.translateY + touchParams.offsetY) / touchParams.scale
    touchParams.translateX2 = reserveDecimal(translateX, 2)
    touchParams.translateY2 = reserveDecimal(translateY, 2)
    if (scale !== 1) {
        transforms.push(`scale(${scale},${scale})`)
    }
    if (translateX !== 0) {
        transforms.push(`translateX(${touchParams.translateX2}px)`)
    }
    if (translateY !== 0) {
        transforms.push(`translateY(${touchParams.translateY2}px)`)
    }
    return transforms.length ? transforms.join(' ') : 'none';
}
let touchTransform = () => {
    let transform = getTransform()
    instance.imageInstance.transform = transform
}
let initializeTouchState = () => {
    updateTouchState({
        scale: 1,
        translateX: 0,
        translateY: 0,
        offsetX: 0,
        offsetY: 0
    })
}
let getScale = (event, initial) => {
    if (touchParams.finger >= 2) {
        const x1 = event.touches[0].pageX,
            y1 = event.touches[0].pageY,
            x2 = event.touches[1].pageX,
            y2 = event.touches[1].pageY,
            offsetX = x1 - x2,
            offsetY = y1 - y2,
            extract = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2))
        return initial ?
            updateTouchState({
                initialScaleLength: extract
            })
            : extract / touchParams.initialScaleLength
    }
    return 1
}
let updatedForCropImage = () => {
    instance.offsetX = touchParams.translateX2
    instance.offsetY = touchParams.translateY2
    instance.scale = touchParams.scale
}
let touchStart = event => {
    const touches = event.touches
    cancelEvent(event)
    touchGesture(touches)
    getScale(event, true)
    touchParams.finger < 2 && updateTouchState({
        pageX: touches[0].pageX,
        pageY: touches[0].pageY,
    })
    updateTouchState({
        initialScale: touchParams.scale
    })
}
let touchMove = event => {
    cancelEvent(event)
    const touch = event.touches[0],
        startX = touchParams.pageX,
        startY = touchParams.pageY,
        endX = touch.pageX,
        endY = touch.pageY,
        endScale = touchParams.initialScale * getScale(event),
        scale = reserveDecimal(endScale, 2)
    touchParams.finger < 2 && updateTouchState({
        offsetX: endX - startX,
        offsetY: endY - startY
    })
    updateTouchState({
        scale: scale > 10 ? 10 : scale
    })
    touchTransform()
}
let touchEnd = event => {
    cancelEvent(event)
    updateTouchState({
        translateX: touchParams.translateX + touchParams.offsetX
    })
    Frointier()
    updatedForCropImage()
}
export default touchGestureAction