<template>
  <div>
<Articleitem v-for="item in results" :key="item.art_id" :item='item'></Articleitem>
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
      results: []
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data: { data } } = await getArticles(this.id, +new Date())
        this.results = data.results
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
    }

  }
}
</script>

<style>

</style>
