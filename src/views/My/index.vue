<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <div class="login" v-if="isShow">登录的盒子</div>
      <div class="logout" v-else>未登录的盒子</div>
    </header>

    <!-- 中间共同区域 -->
    <main>中间相同部分</main>

    <!-- 底部退出区域 -->
    <footer>
      <button v-if="isShow" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isShow() {
      // 根据token
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      // 清除token 传入空对象{}
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
