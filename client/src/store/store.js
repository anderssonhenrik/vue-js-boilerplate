import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token // Update state parameter token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user // Update state parameter user
    }
  },
  actions: { // invoked from view (vue) components
    setToken ({commit}, token) {
      commit('setToken', token) // Call mutation 'setToken' an pass it a token
    },
    setUser ({commit}, user) {
      commit('setUser', user) // Call mutation 'setUser' an pass it a user
    }
  }

})
