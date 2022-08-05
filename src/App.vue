<template>
  <div>
    <router-view></router-view>
    <!-- <h1>{{ $store.state.num }}</h1>
    <button @click="btn">点击</button> -->
  </div>
</template>

<script>
export default {
  // created() {
  //   console.log(this)
  // },
  // methods: {
  //   btn() {
  //     console.log(this)
  //     // 调用vuex里的commit方法（'方法名',payLoad接受的实参）
  //     this.$store.commit('SET_NUM', 2)
  //   }
  // }
}
</script>

<style scoped></style>
