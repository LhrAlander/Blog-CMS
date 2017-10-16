/**
 * Created by Alander on 2017/8/7.
 */
import router from '../router'
export default {
  login (state, payload) {
    localStorage.setItem('jwt',payload.token)
    localStorage.setItem('expires',payload.expires)
    state.token = payload.token
    router.push('/admin/article')
  },
  logout (state) {
    localStorage.clear()
    state.token = null
  },
  changeCurrentPage (state, page) {
    state.currentPage = page
  }
}
