import Index from 'components/Front/Index'
import Login from 'components/Admin/Login'
import Register from 'components/Admin/Register'
import Admin from 'components/Admin/Admin'
import Article from 'components/Admin/Article'
import Type from 'components/Admin/Type'
import CreateArticle from 'components/Admin/CreateArticle'

export default [
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
      meta: { auth: true },
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
        },
        {
          path: 'createArticle',
          component: CreateArticle
        }
      ]
    }
  ]
/**
 * Created by Alander on 2017/8/27.
 */
