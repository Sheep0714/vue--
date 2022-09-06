import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// 引入icon
import './assets/fonts/iconfont.css'
// 引入vant组件
import 'vant/lib/index.css'
// 引入rem适配
import 'amfe-flexible'
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
