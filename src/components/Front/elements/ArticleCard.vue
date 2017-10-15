<template>
  <div class="card">
    <div class="item">
      <div class="cnt">
        <span class="title">{{ title }}</span>
        <span class="time">{{ time }}</span>
        <article v-html="articleToString"></article>
        <div class="btn-wrapper">
          <router-link v-bind:to="concatArticleUrl">
            <div class="btn btn-primary read-more">Read More</div>
          </router-link>
        </div>
      </div>
      <div class="tags">
        <i class="iconfont tag-icon">&#xe610;</i>
        <template v-for="tag in tags">
          <span class="tag-item">#{{ tag }}&nbsp;&nbsp;</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    props: {
      title: String,
      time: String,
      article: String,
      tags: Array,
      articleId: String
    },
    computed: {
      articleToString () {
        let htmlString =  marked(this.article)
        let from = htmlString.indexOf('<')
        for (let i = 1; i < 4; i++) {
          from = htmlString.indexOf('<', from + 1)
        }
        from = htmlString.indexOf('</', from + 1)
        from = htmlString.indexOf('>', from + 1)
        htmlString =  htmlString.slice(0, from + 1)
        return htmlString
      },
      concatArticleUrl () {
        return "/articleDetail/"+this.articleId
      }
    },
    methods: {
      readMore () {
        this.$emit("readMore")
      }
    }
  }
</script>

<style scoped>
  .card {
    padding: 10px;
    -webkit-column-break-inside: avoid;
    break-inside: avoid-column;
  }

  .item {
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2);
  }

  .cnt {
    padding: 24px 24px 6px;
  }

  .tags {
    padding: 16px 24px;
    border-top: 1px solid hsla(0, 0%, 63%, .2);
    box-shadow: 0 -2px 10px 0 rgba(0,0,0,.14);
  }

  .tag-icon {
    font-size: 120%;
  }



  .title {
    display: block;
    margin-bottom: 8px;
    line-height: 32px;
    font-size: 24px;
    color: #1e88e5;
  }

  .time {
    display: block;
    font-size: 15px;
    margin-bottom: 10px;
    line-height: 20px;
    color: #607d8b;
  }

  article {
    max-height: 200px;
    overflow: hidden;
  }

  .btn-wrapper {
    width: 100%;
    text-align: right;
  }

  .read-more {
    margin: 0;
  }

</style>
