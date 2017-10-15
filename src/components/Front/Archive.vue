<template>
  <section class="container">
    <div class="inner">
      <bread-crumbs activeName="Archive"></bread-crumbs>
      <div class="archive-cnt">
        <ul class="collapsible pop-out">
          <li v-for="item in archives" :class="{active: item.date == currentDate}" @click="clickArchive(item.date)">
            <div class="collapsible-header" :class="{active: item.date == currentDate}">
              <i class="iconfont date">&#xe6f0;</i>
              {{ item.date }}
            </div>
            <div class="collapsible-body" v-show="item.date == currentDate">
              <template v-for="article in item.articles">
                <router-link :to='concatUrl(article.articleId)' class="collection-item">
                  <i class="iconfont document">&#xe7c8;</i>
                  {{ article.name }}
                </router-link>
              </template>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import BreadCrumbs from './elements/BreadCrumbs'
  import api from 'api/displayArticle'
  export default {
    components: {
      BreadCrumbs
    },
    mounted () {
      api.getArchives()
        .then(res => {
          console.log("getArchives success ", res)
          this.archives = res.data.archive
        })
        .catch(err => {
          console.log("getArchives err ", err)
        })
    },
    methods: {
      concatUrl (url) {
        return '/articleDetail/' + url
      },
      clickArchive (date) {
        if (this.currentDate == date) {
          this.currentDate = '1900/01'
        }
        else {
          this.currentDate = date
        }
      }
    },
    data () {
      return {
        archives: new Array(),
        isActive: false,
        currentDate: '1900/01'
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
    max-width: 900px;
    height: 100px;
    margin: 0 auto;
  }

  ul.pop-out {
    margin: 7px 0 13px 0;
  }

  ul.pop-out>li {
    -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    -moz-box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    list-style-type: none;
    background-color: #fff;
    transition: margin .35s cubic-bezier(.25,.46,.45,.94);
  }

  ul.pop-out>li.active {
    -webkit-box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    -moz-box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    margin: 16px 0 16px -24px;
  }

  div.collapsible-header {
    display: flex;
    cursor: pointer;
    font-size: 15px;
    -webkit-tap-highlight-color: transparent;
    line-height: 1.5;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    transition: all .2s ease-in;
  }

  div.collapsible-body {
    display: block;
    border-bottom: 1px solid #ddd;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  div.collapsible-header.active {
    width: 103%;
    background: #3f51b5;
    color: #fff;
  }

  i.iconfont.document,
  i.iconfont.date {
    font-size: 1.4em;
    color: #4d4d4d;
    margin-right: 1rem;
  }

  i.iconfont.date.active {
    color: #fff;
    font-weight: 700;
  }

  i.iconfont.document {
    font-size: 1.6em;
  }

  .collection-item {
    width: 103%;
    display: block;
    color: #4d4d4d;
    background-color: #fff;
    line-height: 1.5rem;
    padding: 9px 10px;
    margin: 0;
    border-bottom: 1px solid #e0e0e0;
    transition: .25s;
  }

  .collection-item:last-child {
    border-bottom: none;
  }

  .collection-item:hover {
    background-color: #ddd;
  }

</style>
