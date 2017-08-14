<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-5 col-xs-offset-1">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-3 control-label"><span class="need">*</span>文章标题</label>
            <div class="col-sm-6">
              <input type="email" class="form-control" placeholder="请在此处输入标题" v-model="article.title">
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
        <button class="btn btn-default btn-sm">取消</button>
        <div class="create" data-toggle="modal" data-target="#create-article">
          <button class="btn btn-sm btn-primary">立即发布</button>
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
            确认提交吗？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import marked from 'marked'
    import hljs from 'highlight.js'
    import  'highlight.js/styles/default.css'

    export default {
      data () {
        return {
          article: {
            title: '',
            selectedList: [],
            markedCnt: '',
            createTime: ''
          },
          typeList: []
        }
      },
      methods: {
        init () {
          for (let i = 0; i < 30; i++) {
            let obj = {}
            obj.name = 'a' + i
            obj.style = "label-info"
            this.typeList.push(obj)
          }
        },
        selectType (item, index) {
          this.article.selectedList.push(item)
          this.typeList.splice(index, 1)
        },
        removeType (item, index) {
          this.typeList.push(item)
          this.article.selectedList.splice(index, 1)
        }
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
      },
      mounted () {
        this.init()
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
