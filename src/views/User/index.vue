<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="个人信息"
      class="navbar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 用户信息 -->
    <!-- 更换头像,添加input事件file属性,原生中hidden可以直接隐藏.accept显示file的后缀名来选取文件的类型 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <!-- 在点击事中使用$refs.file来进行调用 -->
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <input
        type="file"
        hidden
        accept=".jpg"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <van-popup
      class="avator-prop"
      v-model="isShowAvator"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <UpdateAvator
        @update-avator="userInfo.photo = $event"
        :photo="photo"
        v-if="isShowAvator"
      ></UpdateAvator>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import { resolveToBase64 } from '@/utils/index'
import UpdateAvator from './componets/UpdateAvator.vue'

export default {
  name: 'User',
  components: { UpdateAvator },
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photo: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data)
      } catch (e) {
        console.log('用户信息获取失败,请刷新')
      }
    },
    async selectPhoto(e) {
      // console.log('弹出层')
      console.log(e)
      // 获取file对象-->e.target
      const file = e.target.files[0]
      // const url = window.URL.createObjectURL(file)
      // console.dir(url)

      const url = await resolveToBase64(file)
      // 传递url
      this.photo = url
      // 清空value可以让用户展示同一张图片
      e.target.value = ''
      // 展示弹层组件
      this.isShowAvator = true
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   this.photo = e.target.result}
    }
  }
}
// 用户选择图片后如何显示图片?
// 1. 获取file对象  --> e.target.files
// 2. 把file对象转成img的src可识别的格式
//    - objectUrl  --> URL.createObjectUrl(file对象)
// - 缺点: 内存泄露  因为跟document绑定在一起
// - 优点: 写法简单
//    - Base64   --> FileReader(读文件对象)
// - fr.readAsDataURL(file)
// - fr.onload = (e)=>{  e.target.result  }
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-prop {
  background-color: #000;
}
</style>
