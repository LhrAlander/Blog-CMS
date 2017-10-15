<template>
  <li>
    <div class="collapsible-header" @click="clickListItem">
      <i class="iconfont icon-left" v-html="iconCode"></i>
      <span class="content">{{ itemName }}</span>
      <i class="iconfont icon-right" :class="{rotate: isShow}" v-if="collapsible">&#xe601;</i>
      <i class="iconfont icon-right" :class="{rotate: isShow}" v-if="!collapsible">&#xe611;</i>
    </div>
    <div class="collapsible-body" :class="{collapsibled: !isShow}">
      <template v-for="item in items">
        <router-link v-bind:to="item.link" class="collection-item">
          {{ item.name }}
          <span class="badge" v-if="item.num">
            {{ item.num }}
          </span>
        </router-link>
      </template>
    </div>
  </li>
</template>

<script>
    export default {
      props: {
        iconCode: String,
        itemName: String,
        needNum: Boolean,
        collapsible: Boolean,
        items: Array,
        isShow: Boolean
      },
      methods: {
        clickListItem () {
          this.$emit('clickListItem')
        }
      }
    }
</script>

<style scoped>
  li {
    display: block;
  }

  .collapsible-header {
    padding: 10px 15px 0;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .content {
    flex-grow: 1;
  }

  .icon-left,
  .icon-right {
    margin-right: 15px;
  }

  .icon-left {
    font-size: 26px;
  }

  .icon-right {
    font-size: 23px;
    transition: all .5s;
  }

  .icon-right.rotate {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .collapsible-body {

    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    max-height: 300px;
    transition: max-height .5s;
    overflow: hidden;
  }

  .collapsible-body.collapsibled {
    border: none;
    max-height: 0;
  }

  .collection-item {
    display: block;
    cursor: pointer;
    padding: 10px 20px;
    color: #4d4d4d;
  }

  span.badge {
    float: right;
    margin-right: 10px;
  }

</style>
