import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { getToken, setToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // num: 0
    // JSON.parse(localStorage.getItem('TOUTIAO_TOKEN'))
    //  storage.get('TOUTIAO_TOKEN')
    tokenObj: getToken() || {}
  },
  getters: {},
  mutations: {
    // 方法名大写,state是上面的state(参数1),payLoad(参数2)外部传过来的实参
    // SET_NUM(state, payLoad) {
    //   state.num += payLoad
    // }
    // 存储token
    SET_TOKEN(state, payLoad) {
      state.tokenObj = payLoad // 将token存在vuex里
      // 将token存在本地存储中，防止页面刷新丢失
      // localStorage.setItem('TOUTIAO_TOKEN', JSON.stringify(payLoad))
      // storage.set('TOUTIAO_TOKEN', payLoad)
      setToken(payLoad)
    }
  },
  actions: {},
  modules: {}
})
// vuex的数据必须在vuex里修改
// mutations定义方法去修改，在外调用这个方法
// $store.commit('方法名')用于触发 mutations里的方法
