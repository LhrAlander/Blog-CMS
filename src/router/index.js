import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/Front/Index'
import Login from 'components/Admin/Login'
import Register from 'components/Admin/Register'
import Admin from 'components/Admin/Admin'
import Article from 'components/Admin/Article'
import Type from 'components/Admin/Type'

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
    },
    {
      path: '/admin',
      component: Admin,
      children:[
        {
          path: '/',
          component: Article
        },
        {
          path: 'article',
          component: Article
        },
        {
          path: 'type',
          component: Type
        }
      ]
    }
  ]
})
