import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import message from './modules/message'
import socket from './modules/socket'
import keepalive from './modules/keepalive.js'

import getters from './getters.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    message,
    socket,
    keepalive
  },
  getters
})
