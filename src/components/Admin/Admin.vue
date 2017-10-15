<template>
  <div>
    <div class="container-fluid" role="navigation">
      <div class="row top">
        <div class="col-xs-9 col-xs-offset-1 admin">AD<i>MIN</i></div>
        <div class="col-xs-2 my-flex">
          <div class="btn-group">
            <button type="button" class="btn btn-default dropdown-toggle my-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              更多操作 <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
            </button>
            <ul class="dropdown-menu">
              <li><router-link to="/">博客首页</router-link></li>
              <li role="separator" class="divider"></li>
              <li><a @click="logOut" href="javascript:void(0)">退出登录</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row btm">
        <div class="col-xs-3 left">
          <div class="admin-items" @click="subShow = !subShow">
            <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
            <span style="padding-top: 2px;">管理面板</span>
            <div class="spe" style="width: 70%"></div>
            <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
          </div>
          <transition name="toggle">
            <div class="dropdown-item" v-if="subShow">
              <router-link to="/admin/article">
                <div class="admin-items deep-item" @click="currentStat = '文章管理'">
                  <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                  <span :class="{ selected: currentStat === '文章管理' }" style="padding-top: 2px;">文章管理</span>
                  <div class="spe" style="width: 70%"></div>
                  <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                </div>
              </router-link>
              <router-link to="/admin/type">
                <div class="admin-items deep-item" @click="currentStat = '分类管理'">
                  <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                  <span :class="{ selected: currentStat === '分类管理' }" style="padding-top: 2px;">分类管理</span>
                  <div class="spe" style="width: 70%"></div>
                  <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                </div>
              </router-link>

            </div>
          </transition>

        </div>
        <div class="col-xs-9 right">
          <ol class="breadcrumb">
            <li>管理面板</li>
            <li class="active">{{ currentStat }}</li>
          </ol>
          <router-view @createArticle="currentStat = '创建文章'"></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      data () {
        return {
          isActive: true,
          subShow: false,
          currentStat: "文章管理"
        }
      },
      methods: {
        logOut() {
          this.$store.commit('logout')
          this.$router.push('/login')
        }
      }
    }
</script>

<style scoped>

  a,
  a:hover {
    color: #c0ccda;
  }



  div.top {
    background-color: #1f2d3d;
    color: #c0ccda;
    height: 60px;
    line-height: 60px;
  }

  div.top ul.dropdown-menu {
    min-width: 100px;
  }

  div.top .my-btn,
  div.top .my-btn:focus {
    background-color: transparent;
    border: none;
    color: #c0ccda;
    font-size: 15px;
  }

  .my-btn span {
    font-size: 12px;
  }


  div.top .admin {
    font-size: 26px;
  }

  .admin i {
    color: rgb(32, 160, 255);
  }

  .my-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 100px;
  }

  div.btm {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
  }

  div.btm .left {
    height: 100%;
    background-color: #324057;
    color: #c0ccda;
    padding: 0;
  }

  .admin-items {
    padding: 15px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .admin-items:hover {
    background-color: #48576a;
    background-clip: border-box;
  }

  .dropdown-item {
    overflow: hidden;
  }
  .deep-item {
    background-color: #1f2d3d;
  }

  .deep-item span.glyphicon {
    color: transparent;
  }

  .deep-item .selected {
    color: #20a0ff;
  }

  .toggle-enter-active,
  .toggle-leave-active {
    transition: height .5s;
  }

  .toggle-enter,
  .toggle-leave-to {
    height: 0px;
  }

  .toggle-enter-to,
  .toggle-leave {
    height: 112px;
  }

  div.btm .right {
    height: 100%;
    padding: 30px;
    background-color: #f1f2f7;
    color: #1f2d3d;
  }

  .right .breadcrumb {
    margin: 0;
    text-align: right;
  }

  .right .breadcrumb li {
    cursor: pointer;
  }

</style>
