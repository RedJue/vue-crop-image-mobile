import Vue from 'vue'
import App from './App'
import cropImageMobile from "../lib";
Vue.use(cropImageMobile)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
