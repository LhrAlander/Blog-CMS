import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './assets/css/base.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery'
import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})


