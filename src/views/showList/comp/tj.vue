<template>
  <div class="tj">
    <comment :data="result"></comment>
  </div>
</template>

<script>
import comment from "../../../components/comment"
import axios from "axios"
export default {
  data() {
    return {
      result:[]
    };
  },
  mounted(){
     axios.create({
            headers:{"Content-Type":'application/x-www-form-urlencoded;charset=utf-8'}
          }).post("/MobilePlatform/showEvaluation",{
            }).then((res)=>{
              console.log(res)
              this.result=res.data.data
            })
  },
  components:{
    comment
  }
};
</script>

<style lang="scss" scoped>
.tj{
  background: #f5f5f5;
  width:100%;
}
</style>