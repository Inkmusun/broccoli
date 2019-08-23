<template>
<div class="loginContent">
    <div class="user">
        <input type="number" placeholder="手机号码"  v-model="user" @input="inp" @change="useinp">
        <img src="../assets/images/delete.jpg" alt="" v-show="user" @click="ISdelete(1)">
    </div>
    <div class="pwd">
        <input type="password" placeholder="输入密码"  v-model="pwd" @change="pwdinp" class="pwdinp">
        <!-- <img src="../assets/images/delete.jpg" alt="" v-show="pwd" @click="ISdelete(2)"> -->
        <i class="iconfont iconpwd" ref="iconpwd" v-html="iconpwd" @click="open()"></i>
    </div>
    <button :style="user||pwd?backcolor2:backcolor1" @click="login">确认</button>
    <div class="forgetpwd">
        <span>账号密码登录</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span @click="forgetpwd">忘记密码</span>
    </div>
    <div class="pwdtip" v-if="pwdFlag">
        密码的格式不正确哦
    </div>
    <div class="usertip" v-if="userFlag">
        手机号码的格式不正确哦
    </div>
    <div class="usertip" v-if="loginFlag">
        用户名或密码错误
    </div>
</div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
        user:"",
        pwd:"",
        pwdFlag:false,
        userFlag:false,
        loginFlag:false,
        iconpwd:"&#xe6d0;",
        iconflag:false,
        backcolor1:{
          background: '#ffbdb1'
        },
        backcolor2:{
          background: '#ff2600'
        }
    };
  },
  methods:{
      login(){
        if(this.user&&this.pwd){
            console.log(111)
           if(!this.userFlag&&!this.pwdFlag){
            axios.post("/MobilePlatform/login",{
               telephone:this.user,
               password:this.pwd,
            }).then(res=>{
                console.log(res)
                if(res.data.code==="1"){
                  let token=res.data.token
                   document.cookie="token="+token;
                   localStorage.setItem("telephone", this.user);
                   localStorage.setItem("password", this.pwd);
                   this.$router.push({
                     path:"/personal"
                   })
                }
                else{
                    this.loginFlag=true
                    setTimeout(()=>{
                      this.loginFlag=false
                    }, 3000);   
                }
            })
        }
        }
      },
      inp(){
       if(this.user>11){
           this.user=this.user.slice(0,11)
       }
      },
      ISdelete(a){
        if(a==1){
           this.user="" 
           this.userFlag=false
        }
        else if(a==2){
            this.pwd=""
            this.pwdFlag=false
        }
      },
      pwdinp(){
        if(this.pwd){
          let patrn=/^(\w){6,16}$/; 
          if(!patrn.test(this.pwd)){
             this.pwdFlag=true
          }
          else{
              this.pwdFlag=false
          }
        }
      },
      useinp(){
         if(this.user){
           let patrn=/^[1][3,4,5,7,8][0-9]{9}$/; 
           if(!patrn.test(this.user)){
                this.userFlag=true
           }
           else{
                this.userFlag=false
           }
         } 
      },
       open(){
        this.iconflag=this.iconflag?false:true;
        if(this.iconflag){
         $(".pwdinp").attr("type","text")
         this.iconpwd="&#xe657;"
        }
        else{
          $(".pwdinp").attr("type","password")
         this.iconpwd="&#xe6d0;"

        }
     },
     forgetpwd(){
       this.$router.push({
         path:"/findpwd"
       })
     }
  },
  mounted() {
    let telephone=localStorage.getItem("telephone")
    let password=localStorage.getItem("password")
    if(telephone&&password){
       this.user=telephone
       this.pwd=password
    }
  },
};
</script>

<style lang="scss" scoped>
.loginContent{
  width: 100%;
  .user{
      width: 6.83rem;
      margin:0 auto;
      position: relative;
      input{
          width: 6.83rem;
          height:1.02rem;
          border:0;
          border-bottom: 0.02rem solid #c0c0c0;
          font-size: 0.28rem;
      }
      img{
          width:0.38rem;
          height:0.38rem;
          position: absolute;
          right:0.06rem;
          top:0.32rem;
      }
  }
  .pwd{
      width: 6.83rem;
      margin:0 auto;
      position: relative;
     input{
          width: 6.83rem;
          height:1.02rem;
          border:0;
          border-bottom: 0.02rem solid #c0c0c0;
          font-size: 0.28rem;
      } 
      img{
          width:0.38rem;
          height:0.38rem;
          position: absolute;
          right:0.06rem;
          top:0.32rem;
      }
      .iconpwd{
        position: absolute;
        right: 0;
        color:#fe2600;
        font-size:0.6rem !important;
        top:0.21rem;
      }
  }
  button{
      width:6.85rem;
      height:0.9rem;
      color:white;
      border-radius: 0.42rem; 
      text-align: center;
      line-height: 0.9rem;
      font-size: 0.35rem;
      margin:0 auto;
      border:0;
      margin-left: 0.35rem;
      margin-top: 0.48rem;
      outline: none;
  }
  .forgetpwd{
      font-size:0.24rem;
      color:#9e9e9e;
      text-align: center;
      margin-top:0.24rem;
  }
}
::-webkit-input-placeholder { 
  color: #999;
  font-size: 0.28rem;
}
.pwdtip,.usertip{
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
</style>