<template>
  <div class="container">
    <div class="header">
      <h1 class="name">Alander</h1>
      <h3 class="tip">Another one.</h3>
      <div class="row-container">
        <div class="sep"></div>
        <div class="nav-menu">
          <router-link to="/index"><div class="col-xs-4 nav-item" :class="{active: current == 'index'}" @click="current = 'index'">主页</div></router-link>
          <router-link to='/blog'><div class="col-xs-4 nav-item" :class="{active: current == 'blog'}" @click="current = 'blog'">博客</div></router-link>
          <router-link to='/about'><div class="col-xs-4 nav-item" :class="{active: current == 'about'}" @click="current = 'about'">关于</div></router-link>
        </div>
      </div>
    </div>
    <div class="side-bar">I am sidebar</div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        current: 'index'
      }
    }
  }
</script>

<style scoped>
  .header {
    padding: 58px 0 0;
  }

  .header .name {
    color: #555;
    font: bold 38px/1.12 "Times New Roman", Georgia, Times, sans-serif;
    margin: 0;
  }

  .header .tip {
    color: #999;
    margin: 0;
    font-size: 14px;
  }

  .header .sep,
  .header .nav-menu {
    height: 40px;
  }

  .header .row-container {
    display: flex;

  }

  .header .sep {
    width: 75%;
    border-bottom: 1px solid #ddd;
  }

  .header .nav-menu {
    width: 25%;
  }

  .header .nav-item {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    color: #555;
  }

  .header .nav-item.active {
    border: 1px solid #ddd;
    border-bottom: none;
  }

  .header .nav-item:hover {
    cursor: pointer;
    border-bottom-color: #444;
  }

  .header .nav-item.active:hover {
    border-bottom: none;
  }

</style>
