import Vue from 'vue'
import App from './App.vue'
import router from './routes/index'
import qs from 'qs'
import {store} from './vuex/index.js'
import ElementUI from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import '@/styles/theme.scss'

Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueClipboard)
new Vue({
    el: '#app',
    store,
    render: h => h(App),
    router
})
