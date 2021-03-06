import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import App from './App.vue'
import router from './router'
import store from './store'
import './fontAwesome'
import './plugins/element.js'
import { WalletApi } from './api'
import '@/directives'

Vue.component(VueQrcode.name, VueQrcode)
Vue.config.productionTip = false

const walletApi = new WalletApi()
const isSocketReady = setInterval(checkSocketStatus, 1)

function checkSocketStatus() {
  runApp()
}
function runApp() {
  clearInterval(isSocketReady)
  store.$walletApi = walletApi

  const vm = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')

  window.vm = vm
}
