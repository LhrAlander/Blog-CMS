<template>
  <div class="card">
    <div class="item">
      <div class="cnt">
        <span class="title">Title</span>
        <span class="time">2017-9-3</span>
        <article>有两种监听器： 简单监听器，只能监听单一的property 复杂监听器：可以监听一到多个property 每个监听器都有一个或多个 依赖 ，当依赖发生有两种监听器： 简单监听器，只能监听单一的property 复杂监听器：可以监听一到多个property 每个监听器都有一个或多个 依赖 ，当依赖发生</article>
      </div>
      <div class="tags">
        <i class="iconfont tag-icon">&#xe610;</i>
        <span class="tag-item">#学习</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {}
</script>

<style scoped>
  .card {
    padding: 10px;
    -webkit-column-break-inside: avoid;
    break-inside: avoid-column;
  }

  .item {
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2);
  }

  .cnt {
    padding: 24px;
  }

  .tags {
    padding: 16px 24px;
    border-top: 1px solid hsla(0, 0%, 63%, .2);
  }

  .tag-icon {
    font-size: 150%;
  }

  .title {
    display: block;
    margin-bottom: 8px;
    line-height: 32px;
    font-size: 24px;
    color: #1e88e5;
  }

  .time {
    display: block;
    font-size: 15px;
    margin-bottom: 10px;
    line-height: 20px;
    color: #607d8b;
  }

</style>
