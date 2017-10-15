<template>
  <div class="breadcrumbs">
    <router-link to="/">
      <i class="iconfont">&#xe60b;</i>
      Home
    </router-link>

    <template v-for="item in linked">
      <router-link class="my-breadcrumb" v-bind:to="item.href">
        {{ item.name }}
      </router-link>
    </template>

    <span class="my-breadcrumb" v-if="activeName">{{ activeName }}</span>
  </div>
</template>

<script>
    export default {
      props: {
        linked: Array,
        activeName: String
      }
    }
</script>

<style scoped>
  div.breadcrumbs {
    height: 64px;
    line-height: 64px;
    color: #1e88e5;
    font-size: 18px;
  }

  i.iconfont {
    display: inline-block;
    font-size: 24px;
    margin-right: 6px;
    vertical-align: bottom;
  }

  span.my-breadcrumb {
    color: #607d8b;
  }


  span.my-breadcrumb:before,
  a.my-breadcrumb:before {
    font-family:"iconfont" !important;
    content: '\e611';
    font-size: 20px;
    font-weight: 700;
    display: inline-block;
    margin: 0 10px 0 8px;
    vertical-align: bottom;
  }

</style>
