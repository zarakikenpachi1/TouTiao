<template>
  <div>
    <!-- 顶部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round icon="search" class="search-btn">搜索</van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <AricList :id="item.id"></AricList>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>

    <!-- 频道弹层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPopup
        :channelList="channelList"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></ChannelPopup>
      <!-- $event 在自定义事件中，是子组件传过来的第一参数 -->
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel,
  delChannel,
  addChannel,
  setMyChannelsToLocal,
  getMyChannelByLocal
} from '@/api'
import AricList from './components/AricList.vue'
import ChannelPopup from './components/ChannelPopup.vue'
export default {
  name: 'Home',
  components: { AricList, ChannelPopup },
  data() {
    return {
      active: 0,
      channelList: [],
      show: false
    }
  },
  computed: {
    // token 判断是否登录
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    // 初始化channelList数据
    this.initGetMyChannel()
  },
  methods: {
    initGetMyChannel() {
      // 如果登录了，有token
      if (this.isLogin) {
        // 发送请求 获取数据
        this.getMyChannel()
      } else {
        // 如果没有登录
        // 获取本地存储的数据
        const myChannels = getMyChannelByLocal()
        // 如果本地有数据，将数据给channelList渲染页面
        if (myChannels) {
          this.channelList = myChannels
        } else {
          // 如果本地没有数据，调用默认
          this.getMyChannel()
        }
      }
    },
    // 默认接口数据
    async getMyChannel() {
      try {
        const { data } = await getMyChannel()
        // console.log(data)
        this.channelList = data.data.channels
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取列表失败，请重新刷新')
      }
    },
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })
      try {
        const newChannel = this.channelList.filter((ele) => ele.id !== id)
        // 如果有token，代表登陆
        if (this.isLogin) {
          // 删除服务器频道
          await delChannel(id)
        } else {
          // 否则存在本地
          setMyChannelsToLocal(newChannel)
        }

        // 同步视图删除频道
        this.channelList = newChannel
        this.$toast.success('删除频道成功')
      } catch (error) {
        this.$toast.fail('删除频道失败')
      }
    },
    addChannel(item) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidClick: true
      })
      try {
        // 如果有token代表登陆
        if (this.isLogin) {
          // 添加频道
          addChannel(item.id, this.channelList.length)
        } else {
          // 否则存在本地
          setMyChannelsToLocal([...this.channelList, item])
        }

        this.channelList.push(item)
        this.$toast.success('添加频道成功')
      } catch (error) {
        this.$toast.fail('添加频道失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 99;

  position: fixed;
  top: 92px;
  // opacity: 1;
  // background-color: #fff;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

:deep(.van-tabs__content) {
  padding-bottom: 100px;
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  overflow: auto;
}
</style>
