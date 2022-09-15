<template>
  <div>
    <!-- 搜索历史的标题 -->
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" @click="isEdit = true" v-if="!isEdit" />
        <div v-else>
          <span @click="$store.commit('SetHistories', [])">全部删除</span>
          &nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索历史 -->
    <van-cell
      :title="item"
      v-for="(item, index) in histories"
      :key="index"
      @click="!isEdit && $emit('changeKeywords', item)"
    >
      <van-icon
        name="close"
        v-show="isEdit"
        @click="
          $store.commit(
            'SetHistories',
            histories.filter((i) => item !== i)
          )
        "
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  }
}
</script>

<style></style>
