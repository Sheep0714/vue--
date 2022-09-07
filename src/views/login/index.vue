<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="nav-bar" title="登录" />
    <!-- 表单 -->
    <!-- van-field: -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"> </span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标插槽 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"> </span>
        </template>
        <!-- 验证码插槽 -->
        <template #button>
          <van-button
            v-if="isShow"
            @click="sendCode"
            type="default"
            size:small
            round
            class="btn"
            native-type="button"
            ><span>获取验证码</span>
          </van-button>
          <van-count-down
            v-else
            format="ss秒"
            :time=" 60 * 1000,"
            @finish="isShow = ture"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
// 引入api
import { login, sendCodeApi } from '@/api'
// 引入vuex的方法
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShow: true
    }
  },
  methods: {
    ...mapMutations(['SetToken']),
    async onSubmit() {
      // loading
      // message:提示文案
      // forbidC1ick禁止点击
      // duration展示的时长.为B,一直展示
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        // 获取token并存入vuex
        this.SetToken(data.data)
        this.$router.push('/profile')
        // 成功提示
        this.$toast.success(data.message)
      } catch (error) {
        // 细分一下失败：提示用户手机号和验证码
        // 如果是手机号或者验证码错了，用户能知道
        // error:1.js抛的错2.axios封装的error对象

        // axios封装的error对象
        // error.response.data 后端返回的数据
        // error.response.status后端返回的状态码

        console.log(error)
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        const { data } = await sendCodeApi(this.mobile)
        // 显示倒计时
        this.isShow = false
        this.$toast.success(data.message)
      } catch (error) {
        console.log(error)
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 429)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// vue-cli提供了语法 :deep() 深度选择器修改组件样式
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: white;
  }
}
:deep(.form) {
  .van-cell__value {
    flex: 20;
  }
  .van-cell__title {
    flex: 1;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  background-color: #eee;
  height: 0.64rem;
  color: #a58594;
}
</style>
