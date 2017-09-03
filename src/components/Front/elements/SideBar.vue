<!--侧边栏 z-index 200-->
<template>
  <div class="side-bar-wrapper">
    <div class="profile">
      <div class="profile-bg"></div>
      <img src="../../../assets/img/invoker.jpg" alt="avatar" class="profile-avatar">
      <h3 class="profile-name">Alander</h3>
      <p class="profile-desc">哪有这么多理由不好好打代码呢</p>
    </div>
    <ul class="nav-group">
      <side-bar-li v-for="(item, index) in navGroupLi" :iconCode="item.iconCode" :itemName="item.itemName"
                   :collapsible='item.collapsible' :needNum='item.needNum' :items='item.items' :isShow='item.isShow'
                  @clickListItem="clickListItem(item)"></side-bar-li>
    </ul>
    <ul class="nav-group external-link">
      <a target="_blank" href="https://github.com/LhrAlander">
        <side-bar-li iconCode="&#xe600;" itemName="Github" :collapsible='false' :needNum="false"></side-bar-li>
      </a>
    </ul>
  </div>
</template>

<script>
  import SideBarLi from './SideBarLi'
  import displayArticle from 'api/displayArticle'
  import api from 'api'
  let navGroupLi = [
    {
      iconCode: '&#xe68a;',
      itemName: 'Latest',
      collapsible: true,
      needNum: false,
      items: [
        {
          name: 'test1',
        },
        {
          name: 'test2'
        },
        {
          name: 'test3'
        },
        {
          name: 'test4'
        }
      ],
      isShow: false
    },
    {
      iconCode: '&#xe610;',
      itemName: 'Tag',
      collapsible: true,
      needNum: true,
      items: [
        {
          name: '学习',
          num: 0,
          link: '/tag/学习'
        },
        {
          name: '生活',
          num: 0,
          link: '/tag/生活'
        }
      ],
      isShow: false
    }
  ]
    export default {
      components: {
        SideBarLi
      },
      data () {
        return {
          navGroupLi:{}
        }
      },
      methods: {
        clickListItem (item) {
          this.navGroupLi.forEach(mItem => {
            if (mItem.isShow && mItem !== item) {
              mItem.isShow = false
            }
          })
          item.isShow = !item.isShow
        }
      },
      mounted () {
        this.navGroupLi = navGroupLi
        displayArticle.getDisplayArticles({
          tag: 'all',
          page: 1,
          limit: 5
        })
          .then (res => {
            if (res.data.code == 1) {
              this.navGroupLi[0].items = []
              let articles = res.data.articles
              articles.forEach(item => {
                let obj = {}
                obj.name = item.title
                obj.articleId = item.articleId
                this.navGroupLi[0].items.push(obj)
              })
            }
            return api.getTypeList()()
          })
          .then (res => {
            this.navGroupLi[1].items = []
            let types = res.data
            types.forEach(item => {
              let obj = {}
              obj.name = item.name
              obj.num = item.num
              obj.link = '/tag/' + item.name
              this.navGroupLi[1].items.push(obj)
            })
          })
      }
    }
</script>

<style scoped>
  .side-bar-wrapper {
    width: 320px;
    padding-top: 64px;
    height: 100%;
    position: fixed;
    top: 0; left: 0;
    background-color: #fff;
    z-index: 200;
  }

  div.profile {
    text-align: center;
  }

  .profile-bg {
    height: 150px;
    background: url('../../../assets/img/Block.png') center;
    background-size: 320px 150px;
  }

  img.profile-avatar {
    width: 96px;
    height: 96px;
    display: block;
    margin: -50px auto 0;
    border-radius: 50%;
  }

  .profile-name {
    font-size: 1.8em;
    color: #333;
    margin: 10px auto 5px;
  }

  .profile-desc {
    font-size: 1em;
    color: #666;
    margin: 0 0 10px;
  }

  .nav-group {
    margin: 10px 0 0;
    border-top: 1px solid #e0e0e0;
  }


</style>
