<template>
  <router-link :to="href">
    <div class="chip">
     {{ tagName }}
      <sup class="tag-count">{{ countNum }}</sup>
    </div>
  </router-link>
</template>

<script>
    export default {
      props: {
        href: String,
        countNum: String,
        tagName: String
      }
    }
</script>

<style scoped>
  .chip {
    display: inline-block;
    height: 32px;
    font-size: 15px;
    font-weight: 600;
    color: rgba(0,0,0,.6);
    line-height: 32px;
    padding: 0 12px;
    border-radius: 16px;
    background-color: #e4e4e4;
    margin-bottom: 5px;
    margin-right: 5px;
  }

  a {
    color: rgba(0,0,0,.6);
  }

  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
</style>
