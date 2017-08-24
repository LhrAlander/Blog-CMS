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
    console.log(18, payload)
    axios.post('/api/login.do', payload.user)
      .then(res => {
        let token = res.data.token
        if (token) {
          console.log(token)
          window.localStorage.setItem('token', token)
          commit('login')
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  createType (commit, payload) {
    return function () {
      console.log('promise')
      axios.post('/api/createtype.do', payload)
    }
  }
}
