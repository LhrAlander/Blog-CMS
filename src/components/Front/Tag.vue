<template>
    <section class="container">
      <div class="inner">
        <bread-crumbs activeName="Tag"></bread-crumbs>
        <div class="tag-cnt">
          <span class="tag-title">Tags</span>
          <tag-chip v-for="item in tags" :href="item.href" :tagName="item.tagName" :countNum="item.countNum"></tag-chip>
        </div>
      </div>
    </section>
</template>

<script>
  import BreadCrumbs from './elements/BreadCrumbs'
  import TagChip from './elements/TagChip'
  import api from 'api'
  export default {
    components: {
      BreadCrumbs,
      TagChip
    },
    data () {
      return {
        tags: "1"
      }
    },
    mounted () {
      api.getTypeList()()
        .then (res => {
          this.tags = new Array()
          res.data.forEach(item => {
            if (item.num) {
              this.tags.push({
                tagName: item.name,
                countNum: item.num,
                href: "/tag/" + item.name
              })
            }
          })
          console.log("tags: ", this.tags)
        })
    }
  }
</script>

<style scoped>
  section.container {
    width: 100%;
    margin: 20px 0 40px;
    padding: 0 30px;
  }

  div.inner {
    max-width: 1080px;
    height: 100px;
    margin: 0 auto;
  }

  div.tag-cnt {
    margin: 6px 0 13px 0;
    padding: 24px;
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2);
  }

  span.tag-title {
    display: block;
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
</style>
