<template>
  <section class="main-container">
    <bread-crumbs :linked="breadCrumbs.linked"  :activeName="breadCrumbs.activeName"></bread-crumbs>
    <div class="row">
      <div class="col-md-4">
        <ul class="left" ref="left">
          <li>
            <article-card v-for="article in leftContent" :title="article.title" :time="article.createTime"
            :article="article.markedCnt" :tags="article.types"
            :articleId="article.articleId"
            @readMore="readMore(article.articleId)"></article-card>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <ul class="middle" ref="middle">
          <li>
            <article-card v-for="article in middleContent" :title="article.title" :time="article.createTime"
                          :article="article.markedCnt" :tags="article.types"
                          :articleId="article.articleId"
                          @readMore="readMore(article.articleId)"></article-card>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <ul class="right" ref="right">
          <li>
            <article-card v-for="article in rightContent" :title="article.title" :time="article.createTime"
                          :article="article.markedCnt" :tags="article.types"
                          :articleId="article.articleId"
                          @readMore="readMore(article.articleId)"></article-card>
          </li>
        </ul>
      </div>
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li :class="{disabled: this.page == 1}" @click="toPreviousPage">
          <span href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        <li v-for="item in pageNum"  :class="{active: page == item}" @click="toPage(item)">
          <span> {{  item }}</span>
        </li>
        <li @click="toNextPage">
          <span aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
  import ArticleCard from './elements/ArticleCard'
  import displayArticle from 'api/displayArticle'
  import BreadCrumbs from './elements/BreadCrumbs'

  const LEFT = 1
  const MIDDLE = 2
  const RIGHT = 3

  export default {
    data () {
     return {
       mainContent: [],
       leftContent: [],
       middleContent: [],
       rightContent: [],
       tag: 'all',
       page: 1,
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
            console.log(data)
            if (data.code == 1) {
              this.totalNum = data.articleNum
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
              this.leftContent = []
              this.middleContent = []
              this.rightContent = []
              this.allocateArticles(true)
            }
          })
          .catch (err => {
            console.error(err)
          })
      },
      readMore (articleId) {
        console.log(articleId)
      },
      allocateArticles (clear) {
        const leftHeight = clear ? 0 : this.$refs.left.clientHeight
        const middleHeight = clear ? 0 : this.$refs.middle.clientHeight
        const rightHeight = clear ? 0 : this.$refs.right.clientHeight
        let article = this.mainContent.shift()
        if (article == null)
          return
        switch (this.getMinHeight(leftHeight, middleHeight, rightHeight)) {
          case LEFT:
            this.leftContent.push(article)
            break
          case MIDDLE:
            this.middleContent.push(article)
            break
          case RIGHT:
            this.rightContent.push(article)
            break
        }
        this.$nextTick(function () {
          this.allocateArticles()
        })
      },
      getMinHeight (left, middle, right) {
        if (left > middle) {
          if (middle > right)
            return RIGHT
          return MIDDLE
        }
        if (left > right)
          return RIGHT
        return LEFT
      },
      toPreviousPage () {
        if (this.page == 1)
          return
        this.$router.push("/tag/"+this.tag+"/page/"+(parseInt(this.page)-1))
      },
      toNextPage () {
        if (this.page == this.pageNum)
          return
        console.log(this.page, this.pageNum)
        this.$router.push("/tag/"+this.tag+"/page/"+(parseInt(this.page)+1))
      },
      toPage (item) {
        this.$router.push("/tag/"+this.tag+"/page/"+item)
      }
    },
    computed: {
      pageNum () {
        return Math.ceil(this.totalNum / this.limit)
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

  /*.waterfall {*/
    /*columns: 390px;*/
  /*}*/

  li {
    text-decoration: none;
    list-style: none;
  }

  nav {
    text-align: center;
  }

  nav>ul>li {
    cursor: pointer;
  }

</style>
