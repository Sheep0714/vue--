<template>
  <div>
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
      <!-- vue测试 -->
      <!-- <h1>
      {{ count }}
      {{ $store.state.count }}
    </h1>
    <h1>
      {{ bigNum }}
      {{ $store.getters.bigNum }}
    </h1> -->
      <!-- <button @click="increment">count++</button> -->
      <!-- <button @click="SetConst(10)">count++</button> -->
    </transition>
  </div>
</template>

<script>
// mapState->将vuex里面statel映射到computed
// 使用
// 引入mapState:是一个函数，返回一个对象
// 参数：[映射的属性]
// mapGetters-->将vuex里面getters映射到computed
// /mapMutations->将vuex的mutations方法映射到methods
// import { mapState, mapGetters, mapMutations } from 'vuex'
// console.log(mapState(['count']))
export default {
  data() {
    return {}
  },
  methods: {
    // increment() {
    //   this.$store.commit('SetConst', 10)
    // }
    // ...mapMutations(['SetConst'])
  },
  computed: {
    // count() {
    //   return this.$store.state.count
    // }
    // ...mapState(['count']),
    // ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped></style>
