import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/Front/Index'
import Login from 'components/Admin/Login'
import Register from 'components/Admin/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/reg',
      component: Register
    }
  ]
})
