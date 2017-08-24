<template>
  <div class="container">
    <h1 class="title">Admin</h1>
    <div class="main">
      <div class="header">
        <router-link to="/login"><span class="active">登录</span></router-link>

        <b>·</b>
        <router-link to="/reg"><span>注册</span></router-link>
      </div>



      <div class="input-group">
        <span :class="{'error': errtype==0}" class="input-group-addon"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></span>
        <input v-model="username" type="text" class="form-control" placeholder="账号" aria-describedby="sizing-addon2" :class="{'error': errtype==0}">
      </div>
      <div class="alert alert-danger" role="alert" :class="{'visible': errtype==0}">请输入用户名</div>
      <div class="input-group">
        <span :class="{'error': errtype==1}" class="input-group-addon"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span></span>
        <input :class="{'error': errtype==1}" v-model="pwd" type="password" class="form-control" placeholder="密码" aria-describedby="sizing-addon2">
      </div>
      <div class="alert alert-danger" role="alert" :class="{'visible': errtype==1}">请输入密码</div>
      <div class="button-group"><button type="button" class="btn btn-primary" @click="login">登录</button></div>



    </div>
  </div>
</template>

<script>
  import api from 'api/index'
    export default {
      data () {
        return {
          username: '',
          pwd: '',
          errtype: -1
        }
      },
      methods: {
        login () {
          if (this.username === '') {
            this.errtype = 0
            return
          }
          else if (this.pwd === '') {
            this.errtype = 1
          }
          else {
            this.errtype = -1
            let user = {
              userId: this.username,
              password: this.pwd
            }
            api.doLogin(user)()
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                  console.log(err)
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

  .error,
  .error:focus {
    border-color: #a94442;
  }

  .btn-primary {
    width: 100%;
    margin: 10px auto;
    background-color: #ea6f5a;
    border: none;
  }

  .btn-primary:focus {
    border: none !important;
    outline: none !important;
  }

  .btn-primary:hover {
    background-color: #e05244;
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

</style>
