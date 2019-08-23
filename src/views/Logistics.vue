<template>
  <div class="logistics">
    <div class="top">
    <div @click="isreturn"><img src="../assets/images/personImg2.jpg" alt=""></div>
     <div class="title">物流追踪</div> 
     <div class="subtitle">&emsp;</div>  
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  methods:{
    isreturn(){
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.top{
 height: 1rem;
 border-bottom: 0.01rem solid #eaeaea;
 display: flex;
 justify-content: space-between;
 font-size: 0.34rem;
 line-height: 1rem;
 letter-spacing: 0.02rem;
 background: white;
 .subtitle{
   color: #ff0401;
   font-size: 0.28rem;
   margin-right: 0.34rem;
 }
}
img{
  vertical-align: middle;
  margin-left: 0.34rem;
}
</style>