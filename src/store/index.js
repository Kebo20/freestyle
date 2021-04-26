import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    responsive: false
  },
  mutations: {
   
    setResponsive(state, responsive) {
      state.responsive = responsive
    },
  },
  actions: {
  },
  modules: {
  }
})
