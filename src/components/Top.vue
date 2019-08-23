<template>
  <div class="top">
     <div @click="isreturn"><img src="../assets/images/personImg2.jpg" alt=""></div>
     <div class="title">{{title}}</div> 
     <div class="subtitle" @click="change">{{subtitle}}</div>
  </div>
</template>

<script>
// 获取cookie的函数
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
export default {
  data() {
    return {
      flag:true
    };
  },
  mounted(){
    if(this.$props.subtitle=="注册"){
      this.flag=true
    }
    else if(this.$props.subtitle=="登录"){
      this.flag=false
    }
  },
  props:["title","subtitle"],
  methods:{
    change(){
      if(this.flag){
        this.$router.push({
          path:"/register"
        })
      }
      else{
        this.$router.go(-1)
      }
    },
    isreturn(){
      let token=getCookie("token")
      if(token){
      this.$router.go(-1);
      }
      else{
        this.$router.push({path:"/personal"})
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.top{
 height: 1rem;
 border-bottom: 0.02rem solid #d9d9d9;
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