<template>
  <section class="main-container">
    <bread-crumbs :linked="breadCrumbs.linked"  :activeName="breadCrumbs.activeName"></bread-crumbs>
    <div class="waterfall">
      <article-card v-for="article in mainContent" :title="article.title" :time="article.createTime"
                    :article="article.markedCnt" :tags="article.types"
                    :articleId="article.articleId"
                    @readMore="readMore(article.articleId)"></article-card>
    </div>
  </section>
</template>

<script>
  import ArticleCard from './elements/ArticleCard'
  import displayArticle from 'api/displayArticle'
  import BreadCrumbs from './elements/BreadCrumbs'

  export default {
    data () {
     return {
       mainContent: [],
       tag: '',
       page: '',
       limit: 10,
       totalNum: 0,
       breadCrumbs: {
         linked: new Array(),
         activeName: "activeName"
       }
     }
    },
    components: {
      ArticleCard,
      BreadCrumbs
    },
    created () {
      this.initData()
    },
    watch: {
      $route() {
        this.initData()
      }
    },
    methods: {
      initData () {
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
              this.totalNum = data.articles.length
              this.mainContent = data.articles
              this.breadCrumbs.linked = null
              this.breadCrumbs.activeName = null
              if ('all' != this.tag) {
                this.breadCrumbs.linked = new Array()
                this.breadCrumbs.linked.push({
                  name: "Tag",
                  href: "/tags"
                })
                this.breadCrumbs.activeName = this.tag
              }
            }
          })
          .catch (err => {
            console.error(err)
          })
      },
      readMore (articleId) {
        console.log(articleId)
      }
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
