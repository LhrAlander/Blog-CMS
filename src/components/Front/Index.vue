<template>
  <div class="container-fluid" role="navigation">
    <my-header></my-header>
    <side-bar></side-bar>
    <div class="main">
      <router-view></router-view>
      <my-footer></my-footer>
    </div>
  </div>
</template>

<script>
  import MyHeader from './elements/MyHeader'
  import SideBar from './elements/SideBar'
  import MyFooter from './elements/MyFooter'
  export default {
    data () {
      return {

      }
    },
    components: {
      MyHeader,
      SideBar,
      MyFooter
    }
  }
</script>

<style scoped>
  .container-fluid {
    height: 100%;
    background-color: #ebecee;
    padding: 0;
  }

  .main {
    padding: 64px 0 0 320px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

</style>
