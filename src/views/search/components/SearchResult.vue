<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getRequests"
      :finished="finish"
      finished-text="没有啦~"
      :error.sync="error"
      error-text="请求失败,刷新"
    >
      <van-cell
        :title="item.title"
        v-for="item in results"
        :key="item.art_id"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultApi } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      per_page: 10,
      results: [],
      finish: false,
      error: false
    }
  },
  methods: {
    async getRequests() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        const {
          data: { data }
        } = await getResultApi(this.page++, this.per_page, this.keywords)
        // console.log(data)
        if (data.results.length === 0) {
          this.finish = true
        }
        // 把获取的数据加在渲染数组的后面
        this.results.push(...data.results)
        // this.results = [...this.results, ...data.results]
      } catch (error) {
        this.error = true
      } finally {
        // 成功和失败都需要把loading的状态改为false
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
