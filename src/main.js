import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()


Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
