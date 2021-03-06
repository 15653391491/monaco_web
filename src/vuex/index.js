import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import home from './modules/home'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  mutations: {},
  modules: {
    user, home
  }
})