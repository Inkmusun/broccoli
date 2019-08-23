<template>
  <div class="addresshas">
    <div class="top">
      <div @click="isreturn"><img src="../assets/images/personImg2.jpg" alt=""></div>
     <div class="title">管理收货地址</div> 
     <div class="subtitle" @click="add">新增</div>
    </div>
    <div class="content">
       <ul class="allAdress">
         <li v-for="(item,index) of Address" :key="item.addrId">
           <div style="padding-top:0.4rem;font-size:0.28rem;"><span>{{item.personName}}</span><span>{{item.personTel}}</span></div>
           <div style="color:#808080;font-size:0.32rem;margin-top:0.36rem;padding-bottom:0.26rem;border-bottom:0.02rem solid #eaeaea;"><span>{{item.district}}</span><span>{{item.address}}</span></div>
           <div class="contorl">
             <div class="left" >
               <div class="icon" style="margin-right:0.22rem"  @click="defalut(index,item)">
                 <i class="iconfont iconchecked" style="margin-right:0.22rem;color:#ff2600;font-size:0.35rem;">&#xe614;</i>
               </div>
               <span>设为默认</span>
             </div>

             <div class="right">
                <i class="iconfont">&#xe62f;</i><span style="margin-left:0.08rem;" @click="editaddress(item)">编辑</span>  
                <i class="iconfont deleteicon" style="margin-left:0.37rem;">&#xe6b4;</i><span style="margin-left:0.08rem;" @click="deleteaddress(item.addrId,index)">删除</span>  
             </div>
           </div>
         </li>
       </ul>
    </div>
     <div class="pwdtip" v-if="addflagno">
        {{msg}}
    </div>
  </div>
</template>

<script>
import axios from "axios"
import eventbus from '../util/eventBus'
// 获取cookie的函数
function getCookie(cname){
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
      checked:false,
      Address:[],
      addflagno:false,
      msg:""
    };
  },
  methods: {
    isreturn(){
      let token=getCookie("token")
      if(token){
      this.$router.go(-1);
      }
      else{
        this.$router.push({path:"/personal"})
      }
    },
    add(){
      this.$router.push({path:"/addAdress/add/1"})
    },
    defalut(index,item){
      // console.log(index,item,111)
      $(".iconchecked").css({"opacity":0,}).parents(".icon").css({"border":"0.02rem solid #b6b6b6"})
      $(".iconchecked").eq(index).css({"opacity":1,}).parents(".icon").css({"border":"none"})
      console.log($(".iconchecked"))
      localStorage.setItem("personName",item.personName)
      localStorage.setItem("personTel",item.personTel)
      localStorage.setItem("district",item.district)
      localStorage.setItem("address",item.address)
    },
    getaddress(){
      let token=getCookie("token")
    // console.log(token)
    if(token){
      axios.create({
            headers:{"Content-Type":'application/x-www-form-urlencoded;charset=utf-8'}
          }).post("/MobilePlatform/showAddress",{
               token:token
            }).then((res)=>{
              //  console.log(res)
               if(res.data.code==="1"){
                  this.Address=res.data.data
                 console.log(this.Address.length,1)
                 this.$nextTick(function () {
                     this.fingdefault()
                   })
                 if(this.Address.length==0){
                   this.$router.push({
                   path:"/address"
                  })
                 }
               }
               else{
                 this.$router.push({
                   path:"/address"
                  })
               }
            })
            
    }
    else{
      this.$router.push({
          path:"/login"
        })
    }
    },
    deleteaddress(addrId,index){
      console.log($(".iconchecked").eq(index).css("opacity"))
      if($(".iconchecked").eq(index).css("opacity")==0){
        let token=getCookie("token")
      axios.create({
            headers:{"Content-Type":'application/x-www-form-urlencoded;charset=utf-8'}
          }).post("/MobilePlatform/deleteAddress",{
               token:token,
               addrId:addrId
            }).then((res)=>{
              //  console.log(res)
               if(res.data.code==1){
                  this.getaddress()
                  // console.log(this.Address)
               }
               else{
                  this.addflagno=true
                  this.msg=res.data.errMsg
                setTimeout(()=>{
                      this.addflagno=false
                    }, 3000);
               }
            })
      }
    },
    editaddress(item){
      let addId=item.addrId
      localStorage.setItem("personName",item.personName)
      localStorage.setItem("personTel",item.personTel)
      localStorage.setItem("district",item.district)
      localStorage.setItem("address",item.address)
      this.$router.push({path:`/addAdress/edit/${addId}`})
    },
    fingdefault(){
      console.log(personName,personTel,district,address,2)
           console.log(this.Address,3)
           let personName=localStorage.getItem("personName")
           let personTel=localStorage.getItem("personTel")
           let district=localStorage.getItem("district")
           let address=localStorage.getItem("address")
           
          let pos=this.Address.findIndex((item)=>{
           return personName==item.personName&&personTel==item.personTel&&district==item.district&&address==item.address
       })
       console.log(pos,this.Address[pos],111)
       this.defalut(pos,this.Address[pos])
    }
  },
  mounted() {
    this.getaddress()
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
.content{
  .allAdress{
    li{
      font-size: 0.3rem;
      padding:0  0.32rem;
      border-bottom: 0.02rem solid #eaeaea;
      .contorl{
        height:1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.24rem;
        .left{
          float:left;
          color:#3a3a3a;
          .icon{
            display: inline-block;
            width:0.34rem;
            height:0.34rem;
            border-radius: 50%;
            border:0.02rem solid #b6b6b6;
            vertical-align: middle;
            position: relative;
            margin-top:-0.07rem;
          }
        }
        .right{
          float:right;
          color:#888888;
        }
        .iconfont{
          vertical-align: middle;
          color:#8a8a8a;
          font-size: 0.32rem !important;
        }
        .iconchecked{
          position: absolute;
          top:-0.03rem;
          left:-0.02rem;
          opacity: 0;
        }
      }
    }
  }
}
.pwdtip{
    position: fixed;
    top:9.9rem;
    width:3rem;
    height:0.8rem;
    background: rgba($color: #6e6d6d, $alpha: 0.8);
    z-index:999;
    border-radius: 0.1rem;
    text-align: center;
    line-height: 0.8rem;
    color:white;
    letter-spacing: 0.01rem;
    left:2.25rem;
}
.addresshas{
  z-index: 9999;
  position: relative;
  height: 100vh;
  background: white;
}
</style>