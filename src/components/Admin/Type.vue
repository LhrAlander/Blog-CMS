<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 create">
        <div data-toggle="modal" data-target="#create-type" style="max-width: 82px">
          <button type="button" class="btn btn-primary" @click="initCreateSta()">创建分类</button>
        </div>
      </div>
    </div>
    <div class="row head-title">
      <div class="col-xs-1">#</div>
      <div class="col-xs-4">创建时间</div>
      <div class="col-xs-4">分类名称</div>
      <div class="col-xs-3">操作</div>
    </div>
    <div class="row null-article" v-if="!typeList.length">暂无分类</div>
    <div class="row article-content" v-if="typeList.length" v-for="(item, index) in displayTypeList">
      <div class="col-xs-1">{{ index + 1 }}</div>
      <div class="col-xs-4">{{ item.createTime }}</div>
      <div class="col-xs-4">{{ item.name }}</div>
      <div class="col-xs-3">
        <div class="del" data-toggle="modal" data-target="#del-type">
          <button type="button" class="btn btn-danger btn-sm" @click="preDel(item)">删除</button>
        </div>
      </div>
    </div>
    <div v-if="typeList.length" class="row page">
      <div class="col-xs-12">
        <nav aria-label="...">
          <ul class="pagination">
            <li><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
            <li v-for="(n, index) in Math.ceil(totalNum/limit)" :class="{active: currentIndex == index+1}" @click="getType(index)">
              <a href="javascript:void(0)">{{ n }}</a>
            </li>
            <li><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="create-type" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="initCreateSta"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">新增</h4>
          </div>
          <div class="modal-body">
            <div class="form-horizontal" v-if="!createSuccess">
              <div class="form-group">
                <label class="col-sm-2 control-label"><span class="need">*</span>分类名称</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" :class="{err: createErr}" v-model="newType">
                </div>
                <span v-if="createErr" class="col-sm-10 col-sm-offset-2 warn">{{ errDetail }}</span>
              </div>
            </div>
            <div class="row" v-if="createSuccess">
              <div class="col-xs-12 create-success">新增分类成功</div>
            </div>
          </div>
          <div class="modal-footer" v-if="!createSuccess">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" v-bind="{'data-dismiss': modal}"  @click="submitCreate">提交</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="del-type" tabindex="-1" role="dialog" aria-labelledby="delLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="initCreateSta"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="delLabel">提醒</h4>
          </div>
          <div class="modal-body">
            <span v-if="!createSuccess">确认要删除吗？</span>
            <span v-if="createSuccess">{{delMsg}}</span>
          </div>
          <div class="modal-footer" v-if="!createSuccess">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="delType">确定</button>
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
        typeList: [],
        currentIndex: 1,
        totalNum: 0,
        limit: 10,
        newType: "",
        createErr: false,
        errDetail: '请输入分类名称',
        modal: false,
        createSuccess: false,
        currentType: '',
        delMsg: ''
      }
    },
    methods: {
      getType (index) {
        this.currentIndex = index + 1
      },
      initCreateSta () {
        this.newType = ''
        this.createErr = false,
        this.createSuccess = false
      },
      submitCreate () {
        if (!this.newType) {
          this.createErr = true
          this.errDetail = '请输入分类名称'
        }
        else {
          //TODO 提交分类
          let date = new Date()
          let _date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDay() + 1) + ' ' + date.getHours() + ':'
                      + date.getMinutes() + ':' + date.getSeconds()
          let data = {}
          data.typeName = this.newType
          data.date = _date
          api.createType(data)()
            .then((res) => {
              console.log(132, res)
              if (res.status == 200 && res.data.code == 1) { // 创建分类成功
                this.createSuccess = true
                this.typeList.push({
                  createTime: _date,
                  name: this.newType
                })
                this.totalNum = this.typeList.length
              }
              else if (res.status == 200 && res.data.code == 0) { // 分类已存在
                this.createErr = true
                this.errDetail = res.data.message
              }
            })
        }
      },
      preDel (item) {
        this.currentItem = item
        this.initCreateSta()
      },
      delType () {
        //TODO 删除分类
        api.delType(this.currentItem)()
          .then(res => {
            console.log(156, res)
            if (res.status == 200 && res.data.code == 1) { // 删除分类成功
              let len = this.typeList.length
              this.delMsg = res.data.msg
              for (let i = len - (this.currentIndex - 1) * this.limit; i > len - this.currentIndex * this.limit && i > 0; i--) {
                if (this.typeList[i-1].name === this.currentItem.name) {
                  this.typeList.splice(i-1, 1)
                  this.totalNum = this.typeList.length
                  if (this.currentIndex > Math.ceil(this.totalNum/this.limit) && this.currentIndex > 1) {
                    this.currentIndex--
                  }
                  break
                }
              }
              this.createSuccess = true
            }
            else {
              this.delMsg = res.data.msg
              this.createSuccess = false
            }
          })
      }
    },
    mounted () {
      //TODO getArticleList()
      api.getTypeList()()
        .then(res => {
          this.typeList = res.data
          this.currentIndex = 1
          this.totalNum = this.typeList.length
        })

    },
    computed: {
      displayTypeList () {
        let res = []
        let len = this.typeList.length
        for (let i = len - (this.currentIndex - 1) * this.limit; i > len - this.currentIndex * this.limit && i > 0; i--) {
            res.push(this.typeList[i-1])
        }
        return res
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
  .create {
    padding: 10px 15px;
    background-color: #fff;
  }

  .del {
    display: inline-block;
    padding: 0;
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

  #create-type {
    margin-top: 200px;
  }

  input.err {
    border-color: red;
  }

  span.warn {
    margin-top: 5px;
    color: red;
    font-size: 12px;
  }

  #del-type {
    margin-top: 290px;
  }

  #del-type .modal-header,
  #del-type .modal-footer {
    border: none;
  }

  .create-success {
    padding: 20px;
    text-align: center;
    font-size: 18px;
  }


</style>
