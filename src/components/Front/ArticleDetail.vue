<template>
  <section class="container">
    <div class="inner">
      <bread-crumbs :activeName="article.title" :linked="linked"></bread-crumbs>
      <div class="post">
        <div class="card">
          <div class="card-cnt">
            <span class="card-title">{{ article.title }}</span>
            <span class="card-meta">
              <time>
                {{ article.createTime }}
              </time>
            </span>
            <div class="article-cnt" v-html="articleToString"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import BreadCrumbs from './elements/BreadCrumbs'
  import api from 'api'
  import marked from 'marked'
  import  'highlight.js/styles/ocean.css'
  import hljs from 'highlight.js'
  export default {
    components: {
      BreadCrumbs
    },
    data () {
      return {
        article: {
          articleId: 1,
          title: "title",
          createTime: "1900-1-1",
          types: ["Test"],
          markedCnt: "## Title"
        }
      }
    },
    mounted () {
      this.article.articleId = this.$route.params.articleId
      api.getArticleById({
        articleId: this.$route.params.articleId
      })()
        .then(res => {
          this.article = res.data.articles[0]
        })
    },
    computed: {
      articleToString () {
        hljs.initHighlightingOnLoad()
        marked.setOptions({
          highlight: function (code) {
            return hljs.highlightAuto(code).value
          }
        })
        return marked(this.article.markedCnt)
      }
    }
  }
</script>

<style scoped>
  section.container {
    width: 100%;
    margin: 20px 0 40px;
    padding: 0 30px;
    background-clip: content-box;
  }

  div.inner {
    max-width: 1000px;
    margin: 0 auto;
  }

  div.post {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2);
  }

  div.card {
    margin: 6px 0 13px;
    border-radius: 2px;
    background-color: #fff;
  }


  .card .card-cnt {
    padding: 24px;
  }

  .card .card-title {
    display: block;
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .card .card-meta {
    display: block;
    margin-bottom: 10px;
    line-height: 20px;
    color: #607d8b;
  }



</style>
