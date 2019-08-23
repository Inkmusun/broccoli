<template>
  <div class="RegisterContent">
       <div class="user common">
        <input type="number" placeholder="手机号码"  v-model="user" @input="inp" @change="useinp">
        <img src="../assets/images/delete.jpg" alt="" v-show="user" @click="ISdelete(1)">
    </div>
    <div class="pwd common">
        <input type="password" placeholder="输入密码"  v-model="pwd" @change="pwdinp" class="pwdinp">
        <!-- <img src="../assets/images/delete.jpg" alt="" v-show="pwd" @click="ISdelete(2)"> -->
        <i class="iconfont iconpwd" ref="iconpwd" v-html="iconpwd" @click="open()"></i>
    </div>
    <div class="id common">
        <input type="text" placeholder="请输入身份证"  v-model="id" @change="idinp" @input="inp2">
        <img src="../assets/images/delete.jpg" alt="" v-show="id" @click="ISdelete(3)">
    </div>
    <div class="name common">
        <input type="text" placeholder="请输入姓名"  v-model="name" @change="nameinp">
        <img src="../assets/images/delete.jpg" alt="" v-show="name" @click="ISdelete(4)">
    </div>
    <div class="xy">
        <div class="icon" @click="checked">
            <div class="cilcle" v-if="!flag"></div>
            <i class="iconfont iconimg" v-else>&#xe614;</i>
        </div>
        <div class="read">我已认真阅读、理解并同意<span style="color:#ff2600;">《找靓机用户协议》</span>及<span style="color:#ff2600;">《找靓机隐私政策》</span></div>
    </div>
    <button :style="user||pwd||id||name?backcolor2:backcolor1" @click="register">确认</button>
    <div class="pwdtip" v-if="pwdFlag">
        密码的格式不正确哦
    </div>
    <div class="usertip" v-if="userFlag">
        手机号码的格式不正确哦
    </div>
    <div class="usertip" v-if="idFlag">
        身份证号码的格式不正确哦
    </div>
    <div class="usertip" v-if="nameFlag">
        姓名的格式不正确哦
    </div>
    <div class="usertip" v-if="zcFlag">
        {{msg2}}
    </div>
    <div class="usertip" v-if="zc2Flag">
        {{msg}}
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  props:["num"],
  data() {
    return {
        user:"",
        pwd:"",
        id:"",
        name:"",
        pwdFlag:false,
        userFlag:false,
        idFlag:false,
        nameFlag:false,
        zcFlag:false,
        zc2Flag:false,
        iconpwd:"&#xe6d0;",
        iconflag:false,
        msg:"",
        msg2:"",
        backcolor1:{
          background: '#ffbdb1'
        },
        backcolor2:{
          background: '#ff2600'
        },
        flag:false
    };
  },
  methods:{
     register(){
       console.log(this.num)
       if(this.num==1){
        //  如果是1就注册
         if(this.user&&this.pwd&&this.id&&this.name){
          if(this.pwdFlag||this.userFlag||this.idFlag||this.nameFlag||this.flag){
          axios.create({
            headers:{"Content-Type":'application/x-www-form-urlencoded;charset=utf-8'}
          }).post("/MobilePlatform/register",{
               telephone:this.user,
               password:this.pwd,
               idCard:this.id,
               userName:this.name
            }).then(res=>{
              console.log(res)
                if(res.data.code==="1"){
                  localStorage.setItem("telephone", this.user);
                  localStorage.setItem("password", this.pwd);
                  this.$router.push({
                    path:"/login"
                  })
                }
                else if(res.data.code==="2"){
                     this.msg=res.data.errMsg
                     this.zc2Flag=true
                    setTimeout(()=>{
                      this.zc2Flag=false
                    }, 3000); 
                }
                else{
                    this.zcFlag=true
                    setTimeout(()=>{
                      this.zcFlag=false
                      this.msg2="注册失败"
                    }, 3000);
                }
            })
        }
        }
       }
       else if(this.num==2){
          //  如果是2就更改密码
         if(this.user&&this.pwd&&this.id&&this.name){
          if(this.pwdFlag||this.userFlag||this.idFlag||this.nameFlag||this.flag){
          axios.create({
            headers:{"Content-Type":'application/x-www-form-urlencoded;charset=utf-8'}
          }).post("/MobilePlatform/changePwd",{
               telephone:this.user,
               password:this.pwd,
               idCard:this.id,
               userName:this.name
            }).then(res=>{
              console.log(res)
                if(res.data.code==="1"){
                  this.msg=res.data.msg
                     this.zc2Flag=true
                  localStorage.setItem("telephone", this.user);
                  localStorage.setItem("password", this.pwd);
                  setTimeout(()=>{
                      this.$router.push({
                    path:"/login"
                  })
                    }, 3000); 
                }
                else if(res.data.code==="2"){
                     this.msg=res.data.errMsg
                     this.zc2Flag=true
                    setTimeout(()=>{
                      this.zc2Flag=false
                    }, 3000); 
                }
                else{
                    this.zcFlag=true
                    setTimeout(()=>{
                      this.zcFlag=false
                      this.msg2="找回密码失败"
                    }, 3000);
                }
            })
        }
        }
       } 
      },
       inp(){
       if(this.user>11){
           this.user=this.user.slice(0,11)
       }
      },
      inp2(){
       if(this.id>18){
           this.id=this.id.slice(0,18)
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
      idinp(){
          if(this.id){
           let patrn=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/; 
           if(!patrn.test(this.id)){
                this.idFlag=true
           }
           else{
                this.idFlag=false
           }
         } 
      },
      nameinp(){
           if(this.name){
           let patrn=/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; 
           if(!patrn.test(this.name)){
                this.nameFlag=true
           }
           else{
                this.nameFlag=false
           }
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
        else if(a==3){
            this.id=""
            this.idFlag=false
        }
        else if(a==4){
             this.name=""
             this.nameFlag=false
        }
      },
      checked(){
          if(this.flag===true){
              this.flag=false
          }
          else{
              this.flag=true
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
     }
  }
};
</script>

<style lang="scss" scoped>
.RegisterContent{
  width: 100%;
  .common{
      width: 6.83rem;
      margin:0 auto;
      position: relative;
      input{
          width: 6.83rem;
          height:1.02rem;
          border:0;
          border-bottom: 0.02rem solid #c0c0c0;
          font-size: 0.28rem;
          caret-color:#ff2600;
      }
      img{
          width:0.38rem;
          height:0.38rem;
          position: absolute;
          right:0.06rem;
          top:0.32rem;
      }
  }
  .xy{
     width: 6.83rem; 
     margin:0 auto;
     margin-top:0.32rem;
     color: #848484;
     .icon{
         float: left;
         width:0.5rem;
        .cilcle{
         width:0.3rem;
         height: 0.3rem;
         border-radius: 50%;
         border:0.02rem solid #e5e5e5;
        }
      .iconimg{
         color: #ec1f0c;
         font-size:0.3rem !important;
        }
     }
     .read{
         float: left;
         width:6.16rem;
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
.pwd{
  position:relative;
  .iconpwd{
    position: absolute;
    right: 0;
    color:#fe2600;
    font-size:0.6rem !important;
    top:0.21rem;
  }
}
</style>