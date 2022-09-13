<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @Load:触底的时候敏发load事件 -->
    <!-- offset:滚动条和底部距离多少的时候触发load事件，默认值是300px -->
    <!-- immediate-check:初渲染的时候是否执况load事件，默认值是true· -->
    <!-- Loading为true,Load事件不会被触发 -->
    <!-- Loading为false的时候Load事件会被触发 -->
    <!-- Loading会Load事件执行后，被van-List组件自动设置ture,要手动的改为false -->
    <!-- finished:布尔值.false:load事件会被触发true:load不会被触发，并且显示finished-text的文本 -->

    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageList">
      <van-list
        @load="getNextPageList"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有啦~"
        :error.sync="error"
        error-text="请求失败,刷新"
      >
        <Articleitem
          v-for="item in results"
          :key="item.art_id"
          :item="item"
        ></Articleitem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import Articleitem from './Articleitem.vue'
export default {
  name: 'Articlelist',
  components: {
    Articleitem
  },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      results: [],
      loading: false,
      refreshLoading: false,
      finished: false,
      preTime: '',
      error: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const {
          data: { data }
        } = await getArticles(this.id, +new Date())
        this.results = data.results
        // 保存下一页的时间戳，用于分页
        this.preTime = data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageList() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        // 1.发送请求
        const {
          data: { data }
        } = await getArticles(this.id, this.preTime)
        console.log(data)
        if (!data.pre_timestamp) {
          this.finished = true
        }
        // 2.获取的新数据加入articles
        // 下拉后refreshLoading为true
        if (this.refreshLoading) {
          // 如果是下拉刷新，将数据放最前
          this.results.unshift(...data.results)
        } else {
          // 如果是下滑加载，将数据放在最后
          this.results.push(...data.results)
        }
        // 3.更新时间戳，让下一次调用函数传入的时间戳为当前的
        this.preTime = data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally语句在try和catch中都会执行
        // 4.更改loading的状态
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  // &表示当前元素的父级
  //::-webkit-scrollbar 滚动槽
  //:: -webkit-scrollbar-thumb 滚动条
  &::-webkit-scrollbar-thumb {
    background-color: deeppink;
  }
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }

}
</style>
