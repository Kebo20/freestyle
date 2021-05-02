import Vue from 'vue'
import Vuex from 'vuex'
import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    responsive: false,
    user: '',
    rol: '',
    token: '',
    api_url: 'https://freestyle-backend.gogazo.com',
    idCategory:'',
    search:'',

  },

  //setear estados
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
    },
    idCategory(state, idCategory) {
      state.idCategory = idCategory
    },
    search(state, search) {
      state.search = search
    }
    
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]

})


