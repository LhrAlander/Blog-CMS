<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 create">
        <router-link to="/admin/createArticle">
          <button type="button" class="btn btn-primary" @click="$emit('createArticle')">创建文章</button>
        </router-link>
      </div>
    </div>
    <div class="row head-title">
      <div class="col-xs-1">#</div>
      <div class="col-xs-3">创建时间</div>
      <div class="col-xs-3">所属分类</div>
      <div class="col-xs-3">文章标题</div>
      <div class="col-xs-2">操作</div>
    </div>
    <div class="row null-article" v-if="!articleList.length">暂无内容</div>
    <div class="row article-content" v-if="articleList.length" v-for="(item, index) in displayList">
      <div class="col-xs-1">{{ index + 1 }}</div>
      <div class="col-xs-3">{{ item.createTime }}</div>
      <div class="col-xs-3 type-div">
        <template v-for="t in item.type">
          {{ t }}&nbsp;&nbsp;
        </template>
      </div>
      <div class="col-xs-3">{{ item.title }}</div>
      <div class="col-xs-2">
          <button type="button" class="btn btn-default btn-sm" @click="viewArticle(item.articleId)">查看</button>
          <button type="button" class="btn btn-primary btn-sm" @click="editArticle(item.articleId)">编辑</button>
        <div class="del" data-toggle="modal" data-target="#del-type">
          <button type="button" class="btn btn-danger btn-sm" @click="preDel(item)">删除</button>
        </div>
      </div>
    </div>
    <div class="row page" v-if="totalNum != 0">
      <div class="col-xs-12">
        <nav aria-label="...">
          <ul class="pagination">
            <li><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
            <li v-for="(n, index) in Math.ceil(totalNum/limit)" :class="{active: currentIndex == index+1}" @click="getArticle(index)">
              <a href="javascript:void(0)">{{ n }}</a>
            </li>
            <li><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
          </ul>
        </nav>
      </div>
    </div>
    <!--Modal-->
    <div class="modal fade" id="del-type" tabindex="-1" role="dialog" aria-labelledby="delLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="delLabel">提醒</h4>
          </div>
          <div class="modal-body">
            {{ modelStat.msg }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">{{ modelStat.btnMsg }}</button>
            <button v-if="modelStat.code == -1" type="button" class="btn btn-primary" @click="delArticle">确定</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import api from 'api'
    export default {
      data () {
        return {
          articleList: [],
          currentIndex: 1,
          totalNum: 20,
          limit: 10,
          currentArticle: null,
          modelStat: {
            code: -1,
            msg: '确认要删除吗？',
            btnMsg: '取消'
          }
        }
      },
      methods: {
        getArticle (index) {
          this.currentIndex = index + 1
        },
        preDel (item) {
          this.currentArticle = item
          this.modelStat.code = -1
          this.modelStat.msg = '确认要删除吗？'
          this.modelStat.btnMsg = '取消'
        },
        delArticle () {
          let articleId = this.currentArticle.articleId
          api.delArticle({
            articleId: articleId
          })()
            .then(res => {
              let data = res.data
              this.modelStat.code = data.code
              this.modelStat.msg = data.msg
              this.modelStat.btnMsg = '确定'
              if (data.code == 1) {
                for (let i = 0; i < this.articleList.length; i++) {
                  if (this.articleList[i].articleId === articleId) {
                    this.articleList.splice(i, 1)
                    this.totalNum = this.articleList.length
                    if (this.currentIndex > Math.ceil(this.totalNum / this.limit) && this.currentIndex > 1) {
                      this.currentIndex--
                    }
                    break
                  }
                }
              }
            })
            .catch(err => {
              this.modelStat.code = 3
              this.modelStat.msg = '删除文章失败'
              this.modelStat.btnMsg = '返回'
            })
        },
        editArticle (articleId) {
          this.$router.push('/admin/modifyArticle/'+articleId)
        },
        viewArticle (articleId) {
          this.$router.push('/articleDetail/' + articleId)
        }
      },
      computed: {
        displayList () {
          let displayList = []
          for (let i = (this.currentIndex - 1) * this.limit; i < this.articleList.length && i < this.currentIndex * this.limit; i++) {
              displayList.push(this.articleList[i])
          }
          return displayList
        }
      },
      mounted () {
        api.getArticleList()()
          .then(res => {
            if (res.data.code == 1) {
              if (res.data.articles.length) { // 存在文章
                let articles = res.data.articles
                articles.forEach((item, i) => {
                  let obj = {}
                  obj.createTime = item.createTime
                  obj.title = item.title
                  obj.articleId = item.articleId
                  obj.type = item.types
                  this.articleList.push(obj)
                })
                this.currentIndex = 1
                this.totalNum = this.articleList.length
              }
              else {
                this.currentIndex = 1
                this.totalNum = 0
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
</script>

<style scoped>

  div.type-div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .create {
    padding: 10px 15px;
    background-color: #fff;
  }

  .head-title {
    height: 40px;
    background-color: #eef1f6;
    border: 1px solid #dfe6ec;
    padding: 5px 0;
  }

  .head-title div {
    height: 100%;
    line-height: 28px;
    font-weight: bold;
    color: #1f2d3d;
  }

  .null-article {
    height: 60px;
    background-color: #fff;
    line-height: 60px;
    text-align: center;
    border: 1px solid #dfe6ec;
    border-top: none;
  }

  .article-content {
    background-color: #fff;
    height: 40px;
    padding: 5px 0;
    line-height: 30px;
    border: 1px solid #dfe6ec;
    border-top: none;
  }

  .article-content:hover {
    background-color: #eef1f6;
  }

  .page {
    background-color: #fff;
    padding: 10px 0;
  }

  .page ul {
    margin: 0;
    float: right;
  }

  .del {
    display: inline-block;
    padding: 0;
  }

  #del-type {
    margin-top: 290px;
  }


  /*Modal CSS*/
  #del-type .modal-header,
  #del-type .modal-footer {
    border: none;
  }

</style>
