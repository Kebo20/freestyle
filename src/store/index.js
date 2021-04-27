import Vue from 'vue'
import Vuex from 'vuex'
import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    responsive: false,
    user: '',
    rol: '',
    token: ''
  },
  mutations: {

    setResponsive(state, responsive) {
      state.responsive = responsive
    },
    rol(state, rol) {
      state.rol = rol
    },
    user(state, user) {
      state.user = user
    }
    ,
    token(state, token) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]

})
