<template>
  <div>
<!--没有图片-->
<van-cell :title="item.title" :lable="lable" v-if="item.cover.type===0" ></van-cell>
<!-- 一张图片 -->
<van-cell
:title="item.title"
v-else-if="item.cover.type === 1">
<van-image
width="100"
height='100'
:src='item.cover.images[0]'>
</van-image>
</van-cell>
<!-- 三张图片 -->
<van-cell :title="item.title"  v-else>
<template #label>
   <van-image
width="100"
height='100'
v-for="(i,index) in item.cover.images"
:key=index :src='i'>
</van-image>
<p>{{lable}}</p>
</template>

</van-cell>

  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    lable() {
      /*eslint-disable*/
      const { aut_name, comm_count, pubdate } = this.item
      return `${aut_name}${comm_count}评论 ${dayjs(pubdate).fromNow()}`
    }
  }
}
</script>

<style>

</style>
