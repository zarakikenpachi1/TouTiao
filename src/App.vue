<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this)
  },
  methods: {
    // inbtn() {
    //   // this.$store.state.num += 1
    //   // console.log(this)
    //   // 不推荐
    //   this.$store.commit('SET_NUM', 10)
    // }
  }
}
</script>

<style scoped>
.nh {
  width: 300px;
  height: 100px;
  background-color: pink;
}
</style>
