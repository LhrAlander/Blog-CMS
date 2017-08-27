/**
 * Created by Alander on 2017/8/7.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
console.log(actions.actions)


export default new Vuex.Store({
  state,
  actions,
  mutations
})
