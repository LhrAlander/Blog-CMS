import Index from 'components/Front/Index'
import Login from 'components/Admin/Login'
import Register from 'components/Admin/Register'
import Admin from 'components/Admin/Admin'
import Article from 'components/Admin/Article'
import Type from 'components/Admin/Type'
import CreateArticle from 'components/Admin/CreateArticle'
import ModifyArticle from 'components/Admin/ModifyArticle'
import Blog from 'components/Front/Blog'
import About from 'components/Front/About'
import Main from 'components/Front/Main'

export default [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          component: Main
        },
        {
          path: 'index',
          component: Main
        },
        {
          path: 'blog',
          component: Blog
        },
        {
          path: 'about',
          component: About
        }
      ]
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
        },
        {
          path: 'modifyArticle/:articleId',
          component: ModifyArticle
        }
      ]
    }
  ]
