<template>
  <div class="title">
     {{this.title}}
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:["title"]
};
</script>

<style lang="scss" scoped>
.title{
    position: fixed;
    top:0;
    height: 1rem;
    width:100%;
    text-align: center;
    line-height: 1rem;
    font-size: 0.36rem;
    letter-spacing: 0.02rem;
    border-bottom:0.02rem solid #f6f6f6;
    z-index: 999;
    background: white;
}
</style>