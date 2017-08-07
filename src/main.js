import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './assets/css/base.css'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
console.log(store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})


