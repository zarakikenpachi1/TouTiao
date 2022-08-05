<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        shape="round"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchfocus"
      />
    </form>
    <!-- <searchSuggestion></searchSuggestion>
    <searchResult></searchResult>
    <searchHistory></searchHistory> -->
    <!-- 动态组件渲染 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
// 引入组件
import searchSuggestion from './components/searchSuggestion.vue'
import searchResult from './components/searchResult.vue'
import searchHistory from './components/searchHistory.vue'
export default {
  name: 'search',
  components: { searchSuggestion, searchResult, searchHistory },
  data() {
    return {
      keywords: '',
      isShowsearchResult: false
    }
  },
  computed: {
    componentName() {
      // 如果输入的时空字符串那么渲染搜索历史
      if (this.keywords === '') {
        return 'searchHistory'
      }
      if (this.isShowsearchResult) {
        // 用变量记录是否显示搜索结果
        return 'searchResult'
      }
      //   既不显示搜素历史，也不现实搜索结果，只渲染搜索建议
      return 'searchSuggestion'
    }
  },
  methods: {
    // 搜索
    onSearch() {
      console.log('正在搜索')
      this.isShowsearchResult = true
    },
    onSearchfocus() {
      // 如果keywords为''时,显示搜索历史
      // 如果keywords有值,显示搜索建议
      this.isShowsearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [tabindex='0'] {
    color: #fff;
  }
}
</style>
