<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highLightsuggestions"
      :key="index"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getsearchSuggestionApi } from '@/api'
import { debounce } from 'lodash'
// 动态正则
// 字面量/aadd/ig
// new RegExp(变量,'ig')
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {
    // map:映射,返回一个新数组,新数组长度和原数组一样
    highLightsuggestions() {
      // 动态正则
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((item) =>
        item.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getsearchSuggestion()
      }
    }
  },
  methods: {
    // 防抖
    // 1，延迟执行  2，干掉上一次的定时器
    // 引入lodash来处理搜索建议+防抖，不需要手写定时器防抖处理函数
    getsearchSuggestion: debounce(async function () {
      try {
        const { data } = await getsearchSuggestionApi(this.keywords)
        // 用过滤的方法通过Boolean函数来去除数据中的假值
        this.suggestions = data.data.options.filter(Boolean)
      } catch {
        this.$toast.fail('获取搜建议失败')
      }
    }, 300)
  }
}
</script>

<style></style>
