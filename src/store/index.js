import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/auth'

Vue.use(Vuex)
// vuex本质就是一个仓库，用来存储数据
// vuex的数据是响应式的
// 如何修改vuex的数据:
// Vuex的数据是自产自销的，数据修改必须在vuex里修改
// mutations定义方法去修改，在外界调用这个方法
// mutations方法 建议是大写
// mutations方法可以接受到两个参数，一个是state一个是payload
// $store.commit('方法名字')

export default new Vuex.Store({
  state: {
    // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOUKEN')) || {}
    tokenObject: getToken() || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObject = payload
      // token存入本地存储中
      // 本地存储 操作需要用json格式字符串
      // localStorage.setItem('HEIMA_TOUTIAO_TOUKEN', JSON.stringify(payload))
      // storage.set('HEIMA_TOUTIAO_TOUKEN', payload)
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
