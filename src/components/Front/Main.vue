<template>
  <section class="main-container">
    <div class="waterfall">
      <article-card v-for="article in mainContent" :title="article.title" :time="article.createTime"
                    :article="article.markedCnt" :tags="article.types"></article-card>
    </div>
  </section>
</template>

<script>
  import ArticleCard from './elements/ArticleCard'
  import displayArticle from 'api/displayArticle'
  export default {
    data () {
     return {
       mainContent: [],
       tag: '',
       page: '',
       limit: 10,
       totalNum: 0
     }
    },
    components: {
      ArticleCard
    },
    mounted () {
      this.tag = this.$route.params.tagName || 'all'
      this.page = this.$route.params.pageNum || 1
      displayArticle.getDisplayArticles({
        tag: this.tag,
        page: this.page,
        limit: this.limit
      })
        .then (res => {
          let data = res.data
          if (data.code == 1) {
            this.totalNum = data.length
            this.mainContent = data.articles
          }
        })
        .catch (err => {
            console.error(err)
        })
    }
  }
</script>

<style scoped>
  .main-container {
    margin: 20px 0 0;
    padding: 0 30px 40px;
    background-color: #ebecee;
  }

  .waterfall {
    columns: 390px;
  }


</style>
