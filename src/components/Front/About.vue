<template>
  <section class="container">
    <div class="inner">
      <bread-crumbs activeName="About Me"></bread-crumbs>
      <div class="post">
        <div class="card">
          <div class="card-cnt">
            <span class="card-title">About Me</span>
            <span class="card-meta">
              <time>
                Mon Oct 16 2017
              </time>
            </span>
            <div class="article-cnt">
              <h2>Hello World</h2>
              <div v-html="articleToString"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import BreadCrumbs from './elements/BreadCrumbs'
  import marked from 'marked'
  import  'highlight.js/styles/ocean.css'
  import hljs from 'highlight.js'

  const ABOUT_ME = `\`\`\`\`
{
  "Name": "Alander",
  "Hobbies": ["WEB", "Movie", "Dota2"],
  "Location": "Hangzhou",
  "School": "HZNU",
  "Contacts": {
    "Email": "AlanderLt@163.com",
    "Github": "@LhrAlander"
  }
}
\`\`\`\``
    export default {
      components: {
        BreadCrumbs
      },
      computed: {
        articleToString () {
          hljs.initHighlightingOnLoad()
          marked.setOptions({
            highlight: function (code) {
              return hljs.highlightAuto(code).value
            }
          })
          return marked(ABOUT_ME)
        }
      }
    }
</script>

<style scoped>
  section.container {
    width: 100%;
    margin: 20px 0 40px;
    padding: 0 30px;
  }

  div.inner {
    max-width: 1080px;
    margin: 0 auto;
  }

  div.card-cnt {
    margin: 7px 0 13px;
    padding: 24px;
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
    font-size: 14px;
  }

</style>
