<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="from" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRoules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRoulese"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma1"></span>
        </template>
        <template #button>
          <van-button
            round
            size="mini"
            class="coude_btn"
            v-if="isShowCode"
            native-type="button"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="60 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRoules, codeRoulese } from './rules'
import { login, getCode } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRoules,
      codeRoulese,
      isShowCode: true
    }
  },
  methods: {
    // 封装加载提示
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      try {
        this.loading()
        // 解构数据
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        this.$store.commit('SET_TOKEN', token)
        // 跳转到profile页面
        this.$router.push('/profile')
        this.$toast.success('登录成功')
        // console.log(data)
        // console.log('submit', values)
      } catch (e) {
        // 细分失败
        // this.$toast.fail('登录失败')
        const status = e.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      this.$refs.form.validate('mobile').then(async () => {
        this.loading()
        try {
          await getCode(this.mobile)
          this.$toast.success('获取验证成功')
          // 显示倒计时
          this.isShowCode = false
        } catch (e) {
          const status = e.response.status
          let message = '手机好不正确'
          console.log(e)
          if (status === 429) {
            message = e.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.toutiao {
  font-size: 40px;
}
// 穿透 :deep()
:deep(.from) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}
.coude_btn {
  background-color: #eeeeee;
  padding: 0 0.2rem;
  color: #a9929b;
}
</style>
