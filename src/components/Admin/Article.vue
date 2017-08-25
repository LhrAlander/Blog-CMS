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
    <div class="row article-content" v-if="articleList.length" v-for="(item, index) in articleList">
      <div class="col-xs-1">{{ index + 1 }}</div>
      <div class="col-xs-3">{{ item.createTime }}</div>
      <div class="col-xs-3 type-div">
        <template v-for="t in item.type">
          {{ t }}&nbsp;&nbsp;
        </template>
      </div>
      <div class="col-xs-3">{{ item.title }}</div>
      <div class="col-xs-2">
          <button type="button" class="btn btn-default btn-sm">查看</button>
          <button type="button" class="btn btn-primary btn-sm">编辑</button>

        <div class="del" data-toggle="modal" data-target="#del-type">
          <button type="button" class="btn btn-danger btn-sm">删除</button>
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
            确认要删除吗？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="">确定</button>
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
          currentArticle: null
        }
      },
      methods: {
        getArticle (index) {
          this.currentIndex = index + 1
        }
      },
      mounted () {
          //TODO getArticleList()
        api.getArticleList()()
          .then(res => {
            if (res.data.code == 1) {
              if (res.data.articles.length) { // 存在文章
                console.log(res)
                let articles = res.data.articles
                articles.forEach((item, i) => {
                  let obj = {}
                  obj.createTime = item.createTime
                  obj.type = i % 2 ? "a" : "b"
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
//        for (let i = 0; i < 10; i++) {
//          let obj = {}
//          obj.createTime = "2017-8-11"
//          obj.type = i % 2 ? "a" : "b"
//          obj.title = "test title" + i
//          this.articleList.push(obj)
//        }
//        console.log(this.articleList)
//        this.currentIndex = 1
//        this.totalNum = this.articleList.length
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
