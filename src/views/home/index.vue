<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" size="small" round block>搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道及文章展示 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章详情 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <span class="toutiao toutiao-gengduo" @click="isShow = true"> </span>
    </van-tabs>
    <van-popup
      v-model="isShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        v-if="isShow"
        @changeActive="changeActive"
        :myChannels="channels"
        @delChannel="delChannel"
        @addChannel="addChannel"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelApi, delChannelApi, addChannelApi } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  created() {
    // this.getChannel()

    this.initChannles()
  },
  methods: {
    ...mapMutations(['SetMyChannels']),
    initChannles() {
      if (this.isLogin) {
        // 1.如果你登录了
        // channels应该发请求获取用户自己的频道
        // 调用获取默认频道接口
        this.getChannel()
      } else {
        // 2.如果你末登录
        const myChannels = this.$store.state.myChannels
        // 本地存储没有数据，发送请求，获取默认的频道数据
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          // 本地存储里有数据channels用本地数据
          this.channels = myChannels
        }
      }
    },
    // 发送请求获取默认频道
    async getChannel() {
      try {
        const { data } = await getChannelApi()
        // console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        // console.log(error)
        if (error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    changeActive(index) {
      this.active = index
      this.isShow = false
    },
    async delChannel(id) {
      const newChannels = this.channels.filter((item) => {
        return item.id !== id
      })
      try {
        if (this.isLogin) {
          await delChannelApi(id)
        } else {
          this.SetMyChannels(newChannels)
        }
        this.channels = newChannels
        this.$toast.success('删除频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('删除频道失败')
        } else {
          throw error
        }
      }
    },
    async addChannel(item) {
      try {
        if (this.isLogin) {
          // 先发送添加频道请求
          await addChannelApi(item.id, this.channels.length)
        } else {
          // 存入本地
          this.SetMyChannels([...this.channels, item])
        }
        // 请求成功后再添加进渲染页面的数组
        this.channels.push(item)
        this.$toast.success('添加频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('添加频道失败')
        } else {
          throw error
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style lang="less" scoped>
:deep(.navbar) {
  background-color: #3296fa;
  // inherit 继承
  // unset 不设置
  .van-nav-bar__title {
    max-width: 100%;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

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
.toutiao-gengduo {
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
</style>
