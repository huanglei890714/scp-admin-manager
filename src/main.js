import Vue from 'vue'
import ElementUI from 'element-ui'
import apis from '@/plugins/apis'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './common/request'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont/iconfont.css'

Vue.prototype.$utils = utils
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(apis)

new Vue({
    router,
    store,
    render: (h) => { return h(App) }
}).$mount('#app')
