<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <div class="login" v-if="isLogin">登录后的盒子</div>
      <div class="loginout" v-else>未登录的盒子</div>
    </header>
    <!-- 中间区域 -->
    <main>中间</main>
    <!-- 底部区域 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObject.token
    }
  },
  methods: {
    logout() {
      // 清除token
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
