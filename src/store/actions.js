/**
 * Created by Alander on 2017/8/7.
 */
var axios = require('axios')
exports.actions = {
  doReg ({ commit, state }, payload) {
    axios.post('/api/reg.do', {
      user: payload.user
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  login ({ commit, state }, payload) {
    axios.post('/api/login.do', {
      user: payload.user
    })
      .then(res => {
        let token = res.data.token
        if (token) {
          window.localStorage.setItem('token', token)
          commit('login')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
