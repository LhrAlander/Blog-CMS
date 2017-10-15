<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-5 col-xs-offset-1">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-3 control-label"><span class="need">*</span>文章标题</label>
            <div class="col-sm-6">
              <input type="email" class="form-control" v-model="article.title">
            </div>
          </div>
        </form>
      </div>
      <div class="col-xs-5">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-3 control-label"><span class="need">*</span>所属分类</label>
            <div class="col-sm-6">
              <ul class="dropdown-toggle selected-type" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <li v-for="(item, index) in article.selectedList" @click="removeType(item, index)">
                  <span class="label" :class="item.style">{{ item.name }}</span>
                </li>
              </ul>
              <ul class="dropdown-menu type-menu">
                <li v-for="(item, index) in typeList" @click="selectType(item, index)">
                  <a href="javascript:void(0)">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-6">
        <textarea class="form-control marked-cnt" v-model="article.markedCnt"></textarea>
      </div>
      <div class="col-xs-6">
        <div class="display-cnt" v-html="markedToHtml"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 footer">
        <div class="create" data-toggle="modal" data-target="#create-article">
          <button class="btn btn-sm btn-primary" @click="modelInit">立即发布</button>
        </div>
      </div>
    </div>

    <!--Modal-->
    <div class="modal fade" id="create-article" tabindex="-1" role="dialog" aria-labelledby="delLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="delLabel">提醒</h4>
          </div>
          <div class="modal-body">
            {{ modelObj.modelTip }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="editSuc">{{ modelObj.btnMsg }}</button>
            <button v-if="modelObj.code == -1" type="button" class="btn btn-primary" @click="editArticle">确定</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import marked from 'marked'
  import hljs from 'highlight.js'
  import  'highlight.js/styles/darkula.css'

  import util from 'api/util'
  import api from 'api/index'

  const LABEL_STYLE = ['label-primary', 'label-success', 'label-info', 'label-warning']
  export default {
    data () {
      return {
        article: {
          articleId: '',
          title: '',
          selectedList: [],
          markedCnt: '',
          createTime: ''
        },
        oldArticle: {
          articleId: '',
          title: '',
          selectedList: [],
          markedCnt: '',
        },
        typeList: [],
        modelObj: {
          modelTip: '确认修改吗？',
          code: -1,  // -1准备提交 0信息不全 1创建成功 2创建失败
          btnMsg: '取消'
        }
      }
    },
    methods: {
      selectType (item, index) {
        this.article.selectedList.push(item)
        this.typeList.splice(index, 1)
      },
      modelInit () {
        this.modelObj.modelTip = '确认修改吗？'
        this.modelObj.code = -1
        this.modelObj.btnMsg = '取消'
      },
      removeType (item, index) {
        this.typeList.push(item)
        this.article.selectedList.splice(index, 1)
      },
      editArticle () {
        api.editArticle ({
          oldOne: this.oldArticle,
          newOne: this.article
        })()
          .then(data => {
            this.modelObj.modelTip = data.data.msg
            this.modelObj.code = data.data.code
            this.modelObj.btnMsg = '返回'
          })
      },
      editSuc () {
        if (this.modelObj.code == 1) {
          this.$router.push('/admin')
        }
      }
    },
    mounted () {
      api.getTypeList()()
        .then(data => {
          let allTypes = data.data
          for (let i = 0; i < allTypes.length; i++) {
            let obj = {}
            obj.name = allTypes[i].name
            obj.style = LABEL_STYLE[Math.ceil(Math.random() * 10) % 4]
            this.typeList.push(obj)
          }
          return api.getArticleById({
            articleId: this.$route.params.articleId
          })()
        })
        .then(data => {
          let _article = data.data.articles[0]
          if (data.data.code == 1) {
            this.article.articleId = _article.articleId
            this.oldArticle.articleId = _article.articleId
            this.article.title = _article.title
            this.oldArticle.title = _article.title
            this.article.createTime = _article.createTime
            this.oldArticle.createTime = _article.createTime
            this.article.markedCnt = _article.markedCnt
            this.oldArticle.markedCnt = _article.markedCnt
            _article.types.forEach(item => {
              let obj = {}
              obj.name = item
              obj.style = LABEL_STYLE[Math.ceil(Math.random() * 10) % 4]
              this.article.selectedList.push(obj)
              this.oldArticle.selectedList.push(obj)
              for (let i = 0; i < this.typeList.length; i++) {
                if (this.typeList[i].name == item) {
                    this.typeList.splice(i, 1)
                }
              }
            })
          }
        })
    },
    computed: {
      markedToHtml () {
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
  label {
    font-weight: normal;
  }
  label .need {
    color: red;
    margin-right: 5px;
  }

  .type-menu {
    width: calc(100% - 30px);
    left: 15px;
    top: 80%;
    padding: 0;
    max-height: 200px;
    overflow: auto;
  }

  .type-menu>li>a {
    padding: 5px 20px;
    cursor: pointer;
  }

  .selected-type {
    width: 100%;
    min-height: 32px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 3px 3px 6px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .selected-type>li {
    display: inline-block;
    margin: 0 3px 3px;
    cursor: pointer;
  }

  .display-cnt,
  .marked-cnt {
    background-color: #fff;
    max-width: 660px;
    min-height: 450px;
    max-height: 450px;
    overflow: auto;
  }



  .footer {
    margin-top: 10px;
    text-align: right;
  }

  .create {
    display: inline-block;
    padding: 0;
  }

  /*Modal CSS*/
  #create-article {
    margin-top: 290px;
  }

  #create-article .modal-header,
  #create-article .modal-footer {
    border: none;
  }

</style>
