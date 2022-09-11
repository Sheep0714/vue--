import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 封装本地存储，vuex-persistedstate
// vuex-persistedstate-->持久化state（npm网址中有详解）

// 下载
// yarn add  vuex-persistedstate@3.2.1

// 引入在store文件夹中的index下引入
// import createPersistedstate from 'vuex-persistedstate'

// 调用
// plugins:[createPersistedState({})]

// createPersistedstate里的配置项
// key:默认值是vuex
// storage:存储的方式，默认值是本地存储
// reducer:指定持久化哪些数据.函数，return一个对象，对象就作为存储的value
// -reducer默认传入参数state

// vuex声明变量
// -声明：在state里
// -取：$store.state.属性名

// vuex修改数据
// -自产自销
// -规范：函数命名采用大驼峰
// mutations:函数
// mutations里的函数的参数
// state:数据

// 触发mutations.里面的方法
// -this.$store.commit('mutation方法名字',接收传参)
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA-TOUTIAO',
      reducer({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  state: {
    tokenObj: {}
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SetToken(state, token) {
      state.tokenObj = token
    }
  }
})
