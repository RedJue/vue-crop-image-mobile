import touchGestureAction from './touch'
import EXIF from 'exif-js'

const getViewportSize = () => {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
}

let canvas = void 0,
    ctx = void 0,
    width = void 0,
    height = void 0,
    edgetop = void 0,
    newImage = void 0,
    imageScale = void 0,
    edgebottom = void 0,
    Orientation = void 0,
    MAX_WIDTH = void 0,
    MAX_HEIGHT = void 0


const CropManage = {
    viewportHeight: getViewportSize().height,
    viewportWidth: getViewportSize().width,
    cropImageInit(instance) {
        CropManage.getImageBase64(instance)
    },
    cropImage(instance, cb) {
        let dWidth = 0,
            dHeight = 0,
            dx = 0,
            dy = 0,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext("2d"),
            //fix ios image vague
            pixelRatio = CropManage.getPixelRatio(ctx)
        dWidth = MAX_WIDTH * (1 / instance.scale)
        dHeight = MAX_WIDTH * (1 / instance.scale)
        dx = instance.offsetX - (width - dWidth) / 2
        dy = instance.offsetY - (height - dHeight) / 2
        canvas.width = dWidth * pixelRatio
        canvas.height = dHeight * pixelRatio
        ctx.scale(pixelRatio, pixelRatio)
        ctx.drawImage(instance.imageInstance.canvasImage, dx, dy, width, height);
        cb.call(null, URL.createObjectURL(CropManage.compressImage(canvas, instance)),CropManage.compressImage(canvas, instance))
    },
    getPixelRatio(context) {
        const backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1
        return (window.devicePixelRatio || 1) / backingStore
    },
    getImageBase64(instance) {
        const reader = new FileReader(),
            file = instance.imageFile
        file && reader.readAsDataURL(file)
        reader.onload = function (event) {
            CropManage.copyImageToCanvas(instance, event.target.result)
        }
    },
    getOrientationToFixRotate(instance) {
        EXIF.getData(instance.imageFile, function () {
            Orientation = EXIF.getTag(this, 'Orientation')
            EXIF.getAllTags(this)
            CropManage.rotateFit(instance)
        });
    },
    rotateFit(instance) {
        switch (Orientation) {
            case 6:
                // clockwise 90°
                canvas.width = height
                canvas.height = width
                ctx.translate(canvas.width / 2, canvas.height / 2)
                ctx.rotate(90 * Math.PI / 180.0)
                ctx.translate(-canvas.height / 2, -canvas.width / 2)
                ctx.drawImage(newImage, 0, 0)
                width = width ^ height
                height = height ^ width
                width = width ^ height
                break
            case 8:
                //anticlockwise 90°
                canvas.width = height
                canvas.height = width
                ctx.translate(canvas.width / 2, canvas.height / 2)
                ctx.rotate(270 * Math.PI / 180.0)
                ctx.translate(-canvas.height / 2, -canvas.width / 2)
                ctx.drawImage(newImage, 0, 0);
                width = width ^ height
                height = height ^ width
                width = width ^ height
                break
            case 3:
                // 180°
                canvas.width = width
                canvas.height = height
                ctx.translate(width / 2, height / 2)
                ctx.rotate(Math.PI)
                ctx.drawImage(newImage, -width / 2, -height / 2, width, height)
                break
            default:
                canvas.width = width
                canvas.height = height
                ctx.drawImage(newImage, 0, 0, width, height)
                break
        }
        CropManage.renderImage(instance)
    },
    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        let ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {
            type: mimeString
        });
    },
    //Compressed image quality
    compressImage(canvas, instance) {
        let dataURL = canvas.toDataURL('image/jpeg', 1)
        let blob = CropManage.dataURItoBlob(dataURL)
        if (instance.autoCompress) {
            if (blob.size > 2000 * 1024) {
                dataURL = canvas.toDataURL('image/jpeg', .3)
            } else if (blob.size > 1000 * 1024) {
                dataURL = canvas.toDataURL('image/jpeg', .5)
            } else {
                dataURL = canvas.toDataURL('image/jpeg', .8)
            }
        } else {
            dataURL = canvas.toDataURL('image/jpeg', instance.quality)
        }
        blob = CropManage.dataURItoBlob(dataURL)
        return blob
    },
    renderImage(instance) {
        if (width > height) {
            width *= MAX_WIDTH / height
            height = MAX_WIDTH
            imageScale = newImage.width / width
            edgetop = (MAX_HEIGHT - height) / 2
            edgebottom = -edgetop
        } else {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
            imageScale = newImage.height / height
            edgetop = (MAX_HEIGHT - width) / 2 + (height - MAX_HEIGHT) / 2
            edgebottom = -edgetop
        }
        width = Math.floor(width)
        height = Math.floor(height)
        instance.imageInstance.imageWidth = `${width}px`
        instance.imageInstance.imageHeight = `${height}px`
        instance.imageInstance.transform = "translate(0,0)"
        instance.imageInstance.canvasImage.src = URL.createObjectURL(CropManage.compressImage(canvas, instance))

        // add touch events
        touchGestureAction({
            dom: instance.corpView,
            instance: instance,
            viewportHeight: CropManage.viewportHeight,
            viewportWidth: CropManage.viewportWidth,
            width,
            height,
            edgetop,
            edgebottom
        })
    },
    copyImageToCanvas(instance, result) {
        newImage = new Image()
        newImage.onload = () => {
            canvas = document.createElement('canvas')
            ctx = canvas.getContext("2d")
            canvas.width = width
            canvas.height = height
            MAX_WIDTH = getViewportSize().width - 40
            MAX_HEIGHT = getViewportSize().height
            width = newImage.width
            height = newImage.height
            CropManage.getOrientationToFixRotate(instance)
        }
        newImage.src = result
    }

}
export default CropManage