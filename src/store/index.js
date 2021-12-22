import Vue from 'vue'
import Vuex from 'vuex'

/// Imports dos módulos
import login from './modules/login'
import procedures from './modules/procedures'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teste: false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    procedures
  }
})
