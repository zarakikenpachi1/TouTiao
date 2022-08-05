<template>
  <div>
    <!-- 头部标签 -->
    <van-nav-bar title="登录" />
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            round
            class="code-btn"
            size="mini"
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
      <div style="margin: 0.43rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'
import { login, getCodeApi } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCode: true
    }
  },
  methods: {
    // 加载提示
    loding() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      // 如果表单校验不通过。不会触发这个方法

      // res 是axios封装的对象，他把服务器端返回的数据放在res.data里面
      // res 是Promise的resolve的值
      // e 是Promise的reject的结果，axios封装的e，e.response.data是服务器端返回的数据，e.response.status是服务端返回的状态码

      // 解构赋值
      //  - 数组 const [a,b] = ['你好','hello'] 拥有命名权
      //  - 对象 const { name,age } = {name:'张三',age:18} 没有命名权
      //  - 对象的连续解构赋值 : 一层层的来const { friend:{ name } } = {name:'张三',friend:{ name:'李四' }}
      //  - 对象结构赋值当中的命名 const { friend:{ name:person } } = {name:'张三',friend:{ name:'李四' }}
      try {
        this.loding()
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        // console.log(data)
        this.$store.commit('SET_TOKEN', token) // vuex存token
        // 跳转页面
        this.$router.push('/my')
        this.$toast.success('登录成功')
      } catch (e) {
        // console.log(e)
        const status = e.response.status
        let message = '请重新刷新'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      // 验证表单手机号
      this.$refs.form.validate('mobile').then(async () => {
        try {
          // 显示加载
          this.loding()
          // 发送请求
          await getCodeApi(this.mobile)
          // 成功显示
          this.$toast.success('获取验证码成功')
          // 显示倒计时
          this.isShowCode = false
        } catch (error) {
          // console.log(error)
          const status = error.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = error.response.data.message
          }
          // 错误显示
          this.$toast.fail(message)
        }
      }) // 返回的是Promise
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #4493f8;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.van-button--info {
  background-color: #74b2fa;
}
.toutiao {
  font-size: 40px;
}

:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}

// &等同于 .code-btn.van-button--default.van-button--mini
.code-btn {
  &.van-button--default {
    color: #917b66;
    background-color: #eee;
  }
  &.van-button--mini {
    padding: 0 0.2rem;
  }
}
</style>
