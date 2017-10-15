import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery'
import 'bootstrap/dist/js/bootstrap.min'
import './assets/css/base.css'
import './assets/css/articleDisplay.css'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})


