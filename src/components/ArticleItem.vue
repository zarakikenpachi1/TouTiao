<template>
  <!-- 没有图片 -->
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
  />

  <!-- 一张图片 -->
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    :label="label"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>

  <!-- 三张图片 -->
  <van-cell v-else :title="articleInfo.title" :label="label">
    <van-image
      v-for="(item, index) in articleInfo.cover.images"
      :key="index"
      width="50"
      height="50"
      :src="item"
      style="margin-left: 5px"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}条评论 ${this.time(art.pubdate)}`
    }
  },
  methods: {
    // 三年前
    time(time) {
      this.dayjs.extend(this.relativeTime)
      this.dayjs.locale('zh')
      const a = this.dayjs()
      const b = this.dayjs(time)
      return a.to(b)
    }
  }
}
</script>

<style></style>
