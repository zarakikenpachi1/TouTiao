<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多文章了"
        :error.sync="error"
        error-text="文章加载失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in artciles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNewsAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'AricList',
  components: { ArticleItem },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      artciles: [],
      loading: false,
      pre_timestamp: '',
      finished: false,
      error: false,
      refreshing: false
    }
  },
  created() {
    this.getFirstPageArtcile()
  },
  methods: {
    async getFirstPageArtcile() {
      try {
        const { data } = await getNewsAPI(this.id, +new Date())
        // console.log(data)
        this.artciles = data.data.results
        // 时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch {
        this.$toast.fail('获取文章列表失败，请重新刷新页面')
      }
    },
    async loadNextPageArticle() {
      try {
        const { data } = await getNewsAPI(this.id, this.pre_timestamp)
        // 判断是否加载完成，没有更多内容
        if (data.data.pre_timestamp == null) {
          this.finished = true
        }
        // console.log(data)
        // 如果下拉刷新会自动变成true
        if (this.refreshing) {
          this.artciles.unshift(...data.data.results)
        } else {
          // 添加数据(解构)
          this.artciles.push(...data.data.results)
        }
        // 更新时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch {
        this.error = true
      } finally {
        // 默认变成true，手动更改为false
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style></style>
