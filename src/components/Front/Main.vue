<template>
  <section class="main-container">
    <div class="waterfall">
      <article-card></article-card>
      <article-card></article-card>
      <article-card></article-card>
      <article-card></article-card>
      <article-card></article-card>
      <article-card></article-card>
      <article-card></article-card>
      <article-card></article-card>
      <article-card></article-card>
      <article-card></article-card>
    </div>
  </section>
</template>

<script>
  import ArticleCard from './elements/ArticleCard'
  export default {
    components: {
      ArticleCard
    }
  }
</script>

<style scoped>
  .main-container {
    margin: 20px 0 0;
    padding: 0 30px 40px;
    background-color: #ebecee;
  }

  .waterfall {
    columns: 400px;
  }


</style>
