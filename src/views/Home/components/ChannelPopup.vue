<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit-btn"
        @click="isShow = !isShow"
        >{{ isShow ? '编辑' : '完成' }}</van-button
      >
    </van-cell>

    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in channelList"
        :key="item.id"
        :text="item.name"
        :class="['icon-item', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="!isShow && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in commendChannel"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="commend-item"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels as getAllChannelsApi } from '@/api'
export default {
  data() {
    return {
      isShow: true,
      allChannels: []
    }
  },
  props: {
    channelList: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsApi()
      // console.log(data)
      this.allChannels = data.data.channels
    },
    changeActive(index, item) {
      if (this.isShow) {
        // 关闭弹窗
        this.$parent.$parent.show = false
        // 切换tab
        this.$emit('change-active', index)
      } else {
        // 删除我的频道
        if (item.name === '推荐') return
        // 在父组件删除
        this.$emit('del-channel', item.id)
      }
    }
  },
  computed: {
    commendChannel() {
      // 筛选所有频道，如果是true就放入，如果是false就删除
      return this.allChannels.filter((Aele) => {
        // 如果有一样的就返回该值，！取反，返回false，如果没有就返回undivided，！取反，返回true
        return !this.channelList.find((Mele) => Mele.id === Aele.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;
  .edit-btn {
    width: 104px;
    height: 48px;
    border-color: red;
    color: red;
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .commend-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
    }
    :deep(.van-grid-item__icon) {
      font-size: 40px;
    }
  }
  :deep(.icon-item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(20%, -40%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 9;
    }
  }
}
</style>
