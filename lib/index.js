import vueCropImageMobile from './components/crop-image-mobile.vue'

const cropImageMobile = {
    install(Vue, options) {
        Vue.component(vueCropImageMobile.name, vueCropImageMobile)
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(cropImageMobile);
}
export default cropImageMobile
