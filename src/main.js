import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router.js'
import axios from 'axios'  // 安装axios后引入
Vue.prototype.$axios = axios  // 将axios挂载到原型上方便使用
Vue.config.productionTip = false



const eleRemote = window.require && window.require('electron') && window.require('electron').remote
Vue.prototype.$eleRemote = eleRemote

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
