<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResults = false"
        @cancel="$router.push('./')"
      />
    </form>
    <!-- 动态组件：父传子的参数绑定的每个子组件都可以接收 -->
    <component
      :keywords="keywords"
      :is="componentName"
      @changeKeywords="onSearch"
    ></component>
    <!-- @changeKeywords="keywords = $event" -->
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/SearchHistory'
import SearchSuggestion from '@/views/search/components/SearchSuggestion'
import SearchResult from '@/views/search/components/SearchResult'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },

  data() {
    return {
      keywords: '',
      isShowSearchResults: false
    }
  },
  computed: {
    // 搜索历史：搜索框的值空
    // 搜索建议：搜素框有值，并且不谊染搜素结果
    // 搜索结果：触发搜索时显示搜索结果（按下回车触发onSearch）
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return SearchHistory
      }
      if (this.isShowSearchResults) {
        return SearchResult
      }
      return SearchSuggestion
    }
  },
  methods: {
    ...mapMutations(['SetHistories']),
    onSearch(keywords) {
      this.keywords = keywords
      this.isShowSearchResults = true
      const distinctHistories = [...new Set([keywords, ...this.histories])]

      this.SetHistories(distinctHistories)
    }
  }
}
</script>

<style lang="less" scoped>
// cLass styLe属性的特殊
// vue自动帮你把class和style合并到组件的根节点
// 属性选择器
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
