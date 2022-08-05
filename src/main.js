import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入iconfont
import '@/assets/fonts/iconfont.css'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入rem适配
import 'amfe-flexible/index.min.js'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh'

Vue.prototype.dayjs = dayjs
Vue.prototype.relativeTime = relativeTime

Vue.use(Vant)
Vue.config.productionTip = false
// console.log(store)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
