<template>
  <div class="container">
    <h1 class="title">Admin</h1>
    <div class="main">
      <div class="header">
        <router-link to="/login"><span>登录</span></router-link>

        <b>·</b>
        <router-link to="/reg"><span class="active">注册</span></router-link>
      </div>



      <div class="input-group">
        <span :class="{'error': errtype==0}" class="input-group-addon"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></span>
        <input :class="{'error': errtype==0}" v-model="username" type="text" class="form-control" placeholder="输入账号" aria-describedby="sizing-addon2">
      </div>
      <div class="alert alert-danger" role="alert" :class="{'visible': errtype==0}">请输入注册账号</div>
      <div class="input-group">
        <span :class="{'error': errtype==1}" class="input-group-addon"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span></span>
        <input :class="{'error': errtype==1}" v-model="pwd" type="password" class="form-control" placeholder="输入密码" aria-describedby="sizing-addon2">
      </div>
      <div class="alert alert-danger" role="alert" :class="{'visible': errtype==1}">请输入注册密码</div>
      <div class="input-group">
        <span :class="{'error': errtype==2}" class="input-group-addon"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span></span>
        <input :class="{'error': errtype==2}" v-model="checkpwd" type="password" class="form-control" placeholder="再次输入密码" aria-describedby="sizing-addon2">
      </div>
      <div class="alert alert-danger" role="alert" :class="{'visible': errtype==2}">{{errtext}}</div>
      <div class="button-group"><button type="button" class="btn btn-success" @click="register">注册</button></div>



    </div>
  </div>




</template>

<script>
    export default {
      data () {
        return {
          username: '',
          pwd: '',
          checkpwd: '',
          errtype: -1,
          errtext: ''
        }
      },
      methods: {
        register () {
          if (this.username === '') {
            this.errtype = 0
            return
          }
          else if (this.pwd === '') {
            this.errtype = 1
            return
          }
          else if (this.checkpwd === '') {
            this.errtype = 2
            this.errtext = '请输入确认密码'
            return
          }
          else if (this.pwd !== this.checkpwd) {
            this.errtype = 2
            this.errtext = '两次密码输入不一致，请重新输入'
            return
          }
          else {
            this.errtype = -1
            //TODO 发送请求
            let user = {
              userId: this.username,
              password: this.pwd
            }
            this.$store.dispatch('doReg', {
              user: user
            })
          }
        }
      }
    }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
    border: 1px solid transparent;
  }

  .title {
    color: #ea6f5a;
    position: absolute;
    top: 56px;
    left: 50px;
    font-size: 40px;
  }

  .main {
    width: 400px;
    margin: 60px auto;
    padding: 50px 30px 30px;
    background-color: #fff;
    font-size: 18px;
  }

  .main,
  .main a {
    color: #969696;
  }

  .main .header {
    text-align: center;
    margin-bottom: 50px;
  }

  .main .header span.active {
    font-weight: 700;
    color: #ea6f5a;
    border-bottom: 2px solid #ea6f5a;
  }

  .main .header b,
  .main .header span {
    padding: 10px;
  }

  input:focus {
    border-color: #ccc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

  input {
    border-left: none;
    padding-left: 3px;
    padding-left: 3px;
  }

  .input-group,
  .button-group {
    width: 85%;
    margin: 0 auto;
  }

  .input-group-addon {
    background-color: transparent;
    border-right: none;
    padding-right: 3px;
    color: #969696;
  }

  .btn-success {
    width: 100%;
    margin: 10px auto;
  }

  .btn-success:focus {
    outline: none !important;
    border-color: transparent !important;
  }

  .alert {
    width: 85%;
    height: 20px;
    margin: 0 auto;
    padding: 0;
    font-size: 12px;
    vertical-align: baseline;
    visibility: hidden;
    background-color: transparent;
    border: none;
  }

  .visible {
    margin: 10px auto;
    visibility: visible;
  }

  .error,
  .error:focus {
    border-color: #a94442;
  }

</style>
