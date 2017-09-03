import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(Router)

// 滚动条滚回顶部
const scrollBehavior =(to, from, savedPosition)=> {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

let router = new Router({
  mode:'history',
  scrollBehavior,
  routes
})


function isLoggedIn (){
  let token = localStorage.getItem('jwt')
  const payload = localStorage.getItem('expires')
  if (token) {
    return payload > Date.now()
  }
  return false
}

router.beforeEach((to, from, next) => {
  let matchedList = to.matched
  if (matchedList.some(record => record.meta.auth)) {
    if (isLoggedIn()) {
      next()
    }
    else {
      next({
        path: '/login'
      })
    }
  }
  else {
    if (isLoggedIn() && (to.fullPath == '/reg' || to.fullPath == '/login')) {
      next({
        path: '/admin'
      })
    }
    else {
      next()
    }
  }
})

export default router
