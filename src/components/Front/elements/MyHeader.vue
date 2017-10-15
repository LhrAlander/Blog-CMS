<!--头部导航栏 z-index 300-->
<template>
  <div class="nav-wrapper">
    <div class="nav-left" @click="clickHome">Another One</div>
    <div class="nav-mid">
      <ul>
        <li class="tab" :class="{active: current == 'Home'}" @click="clickHome">Home</li>
        <li class="tab" :class="{active: current == 'Archive'}" @click="clickArchive">Archive</li>
        <li class="tab" :class="{active: current == 'About'}" @click="clickAbout">About</li>
      </ul>
    </div>
    <div class="nav-right"></div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          current: 'Home'
        }
      },
      methods: {
        clickHome () {
          this.current = 'Home'
          this.$router.push('/')
        },
        clickArchive () {
          this.current = 'Archive'
          this.$router.push('/archive')
        },
        clickAbout () {
          this.current = 'About'
        }
      }
    }
</script>

<style scoped>
  .nav-wrapper {
    height: 64px;
    width: 100%;
    line-height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    /*background-color: #3f51b5;*/
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2);
    position: fixed;
    left: 0; top: 0;
    padding: 0 30px;
    z-index: 300;
  }

  .nav-right {
    width: 40px;
    height: 60%;
    border-radius: 50%;
    background: url('../../../assets/img/jugg.jpg') no-repeat center;
    background-size: 40px 40px;
  }

  .nav-left {
    font-size: 25px;
    cursor: pointer;
  }

  .nav-mid ul {
    margin: 0;
    list-style: none;
    display: flex;
  }

  .nav-mid ul li {
    height: 100%;
    font-size: 17px;
    padding: 0 24px;
    cursor: pointer;
  }

  .nav-mid ul li.active {
    color: #111;
    border-bottom: 3px solid #3f51b5;
  }

</style>
