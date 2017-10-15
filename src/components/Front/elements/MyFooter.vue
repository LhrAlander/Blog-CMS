<template>
  <footer class="page-footer">
    <div class="footer-container">
      <div class="profile">
        <span>For personal use.</span>
        <span>Copy from Hexo Theme.</span>
      </div>
      <div class="motto">
        勤练带来力量&nbsp;&nbsp;&nbsp;
        <span class="author">--主宰</span>
      </div>
    </div>
    <div class="copy-right">
      copymiddle&copy;Alander
    </div>
  </footer>
</template>

<script>
    export default {}
</script>

<style scoped>
  .page-footer {
    padding-top: 20px;
    color: #fff;
    background-color: #3f51b5;
  }

  .footer-container {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
  }

  .profile {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    padding: 0 30px 20px;
  }

  .motto {
    line-height: 54px;
    font-size: 20px;
  }

  .author {
    font-size: 15px;
  }

  .copy-right {
    width: 100%;
    text-align: center;
    background-color: rgba(51,51,51,.08);
    color: hsla(0,0%,100%,.8);
  }

</style>
