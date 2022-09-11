<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登录状态的结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row class="two-row">
          <van-col span="12" class="userInfo">
            <van-image
              round
              width="1.5rem"
              height="1.5rem"
              :src="UesrInfo.photo"
            />
            <span class="phoneNum">{{ UesrInfo.name }}</span>
          </van-col>

          <van-col span="7"></van-col>
          <van-col span="5">
            <van-button size="mini" round class="edit-but">编辑资料</van-button>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条"
              ><template #icon>
                <div>{{ UesrInfo.art_count }}</div>
              </template></van-grid-item
            >
            <van-grid-item text="粉丝"
              ><template #icon>
                <div>{{ UesrInfo.fans_count }}</div>
              </template></van-grid-item
            >
            <van-grid-item text="关注"
              ><template #icon>
                <div>{{ UesrInfo.follow_count }}</div>
              </template></van-grid-item
            >
            <van-grid-item text="获赞"
              ><template #icon>
                <div>{{ UesrInfo.like_count }}</div>
              </template></van-grid-item
            >
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录状态的结构 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image round width="1.76rem" height="1.76rem" :src="mobileSrc" />
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid clickable :column-num="2">
        <van-grid-item text="收藏" to="/"
          ><template #icon>
            <div class="toutiao toutiao-shoucang"></div>
          </template>
        </van-grid-item>
        <van-grid-item text="历史" to="/"
          ><template #icon>
            <div class="toutiao toutiao-lishi"></div>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="小智同学" is-link></van-cell>
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <van-button block v-if="isLogin" @click="logout" style="color: red"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'
import { getUserInfoApi } from '@/api'
export default {
  created() {
    this.getUesrInfo()
  },
  data() {
    return {
      mobileSrc,
      UesrInfo: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出'
      })

      this.$store.commit('SetToken', {})
    },
    async getUesrInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoApi()
        console.log(data)
        this.UesrInfo = data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  height: 100vh;
  background-color: #f5f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('@/assets/images/banner.png') no-repeat 0 0 / cover;
  // background-size合写需要在background配置background-position
  // background-size: cover;
}
.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  > .two-row {
    display: flex;
    align-items: center;
    .userInfo {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .phoneNum {
        font-size: 30px;
        color: #fff;
      }
    }
    .edit-but {
      width: 1.6rem;
      height: 0.43667rem;
      color: #666;
    }
  }

  :deep(.grid) {
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
      color: #333;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
