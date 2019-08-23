<template>
<div class="address">
  <Top title="管理收货地址" subtitle=""></Top>
  <div class="back">
    <i class="iconfont icon">&#xe651;</i>
  </div>
  <div class="tip">还没有添加任何地址哦~</div>
  <div class="button" @click="addAddress">+&ensp;添加地址</div>
</div>
</template>

<script>
import Top from '../components/Top'

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
    return {};
  },
  components:{
      Top
  },
  mounted() {
    let token=getCookie("token")
     if(!token){
        this.$router.push({
          path:"/login"
        })
     }
     document.querySelector('body').setAttribute('style', 'background-color:#fafafa')
   },
  beforeDestroy() {
     document.querySelector('body').removeAttribute('style')
  },
  methods:{
  addAddress(){
  this.$router.push({
    path: "/addAdress/add/1"
  })
    }
  }  
};
</script>

<style lang="scss" scoped>
.address{
  .back{
    width:1.5rem;
    height:1.5rem;
    border-radius: 50%;
    background:#f2f2f2;
    text-align: center;
    line-height: 1.5rem;
    margin:0 auto;
    margin-top:5rem;
    .icon{
    font-size: 0.8rem !important;
    color: #8f8f8f;
    }
  }
  .tip{
    text-align: center;
    font-size: 0.3rem !important;
    color: #8f8f8f;
    margin-top:0.58rem;
  }
  .button{
    width:4.1rem;
    height:0.82rem ;
    text-align: center;
    line-height: 0.82rem;
    background:white;
    border:#8f8f8f 0.03rem solid;
    border-radius: 0.36rem;
    margin:0 auto;
    color: #fe0000;
    font-size: 0.32rem;
    margin-top:0.55rem;
  }
}
</style>