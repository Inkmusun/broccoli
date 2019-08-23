<template>
<div class="personinfo">
     <Top title="个人信息" subtitle=""></Top>
     <div class="info">
        <div class="img">
            <span class="font1">头像</span>
            <img src="../assets/images/timg.png" alt="">
            <span style="color:#c1c1c1;" class="font2">></span>
        </div>
        <div class="name">
            <span class="font1">昵称</span>
            <span class="phone" style="color:#565656">{{phone}}</span>
            <span style="color:#c1c1c1;" class="font2">></span>
        </div>
        <div class="address" @click="address">
            <span class="font1">地址管理</span>
            <span style="color:#c1c1c1;" class="font2">></span>
        </div>
     </div>
     <div class="quit" @click="quit">退出登录</div>
</div>
</template>

<script>
import Top from '../components/Top'
export default {
  data() {
    return {
        phone:""
    };
  },
  components:{
      Top
  },
  mounted() {
      let telephone=localStorage.getItem("telephone")
    if(telephone){
      let a=telephone.substring(0,3)
      let b=telephone.substring(7,11)
      this.phone=a+"****"+b
    }
  document.querySelector('body').setAttribute('style', 'background-color:#eeeeee')
   },
   beforeDestroy() {
  document.querySelector('body').removeAttribute('style')
  },
  methods:{
      quit(){
          localStorage.removeItem("telephone");
          localStorage.removeItem("password");
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          this.$router.push({
              path:"/login"
          })
      },
      address(){
          this.$router.push({
              path:"/addressHas"
          })
      }
  }
  };
</script>

<style lang="scss" scoped>
body{
    background:#eeeeee !important;
}
.personinfo{
    width:100%;
    height: 100%;
    .info{
        background: white;
        border-top:0.16rem solid #eeeeee;
        .img{
            height:1.34rem;
            line-height: 1.34rem;
            border-bottom:0.02rem solid #eeeeee;
            img{
                width:0.95rem;
                height:0.95rem;
                vertical-align: middle;
                margin-left:5rem;
            }
            
        }
        .name,.address{
            height:1rem;
            line-height: 1rem;
            border-bottom:0.02rem solid #eeeeee;
        }
    }
    .quit{
        width:100%;
        height:1rem;
        text-align: center;
        height:1rem;
        color:#fe4825; 
        line-height: 1rem;
        background: white;
        font-size: 0.3rem;
    }
}
.font1{
    margin-left: 0.36rem;
    font-size: 0.26rem;
}
.font2{
    float: right;
    font-size: 0.4rem;
    margin-right: 0.2rem;
}
.phone{
    margin-left:4.4rem;
}
</style>