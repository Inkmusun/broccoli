<template>
  <div class="showSort">
     <div :class="boxclass1" @click="change(1)" activeClass="test">全部({{comment[0]}})</div>
     <div :class="boxclass2" @click="change(2)" activeClass="test">有图({{comment[1]}})</div>
     <div :class="boxclass3" @click="change(3)" activeClass="test">好评({{comment[2]}})</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        boxclass1:"box",
        boxclass2:"box",
        boxclass3:"box",
    };
  },
  props:["comment"],
  methods:{
      change(a){
         if(a==1){
          this.boxclass1="boxF"
           this.boxclass2=this.boxclass1==="box"?"boxF":"box"
           this.boxclass3=this.boxclass1==="box"?"boxF":"box"
         }
         else if(a==2){
           this.boxclass2="boxF"
            this.boxclass1=this.boxclass2==="box"?"boxF":"box"
           this.boxclass3=this.boxclass2==="box"?"boxF":"box"
         }
         else if(a==3){
           this.boxclass3="boxF"
           this.boxclass1=this.boxclass3==="box"?"boxF":"box"
           this.boxclass2=this.boxclass3==="box"?"boxF":"box"
         }

      }
  }
};
</script>

<style lang="scss" scoped>
.showSort{
    position: fixed;
    top:1.8rem;
    z-index: 999;
    background: #f5f5f5;
    width:100%;
    padding: 0.15rem 0.25rem;
    .box{
        padding: 0.16rem 0.18rem;
        display: inline-block;
        background: white;
        margin-right:0.25rem;
        border-radius:0.1rem; 
        font-size: 0.2rem;
    }
    .boxF{
        padding: 0.16rem 0.18rem;
        display: inline-block;
        background: linear-gradient(to top right,#ff2904,#fe5431);
        margin-right:0.25rem;
        border-radius:0.1rem; 
        font-size: 0.2rem; 
        border-bottom: 0.02rem solid #da1d00;
        color: white;
    }
}
</style>