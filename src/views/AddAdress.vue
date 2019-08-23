<template>
  <div class="addadress">
      <Top :title="title" subtitle=""></Top>
      <div class="name common">
          收件人&emsp;<input type="text" placeholder="请输入收货人姓名" @change="nameinp" v-model="name">
      </div>
      <div class="phone common">
          联系电话<input type="number" placeholder="请输入收货人电话" @input="inp" @change="useinp" v-model="phone">
      </div>
      <div class="area common">
          所在地区
             <input @click="select" type="text" v-model="address">
            <yz-select v-if="show" :ref="show" @changeValue='isShow' :province='province' :city='city' :county='county'></yz-select>
      </div>
      <div class="detail common">
           <textarea placeholder="请补充详细收货地址，如街道、门牌号、楼层及房间号等。" v-model="detailaddress"></textarea>
      </div>
      <div class="button" @click="saveAdress">{{button}}</div>
       <div class="pwdtip" v-if="phoneFlag">
        手机号码的格式不正确哦
    </div>
    <div class="pwdtip" v-if="nameFlag">
        姓名的格式不正确哦
    </div>
    <div class="pwdtip" v-if="addflagno">
        注册失败
    </div>
    <div class="pwdtip" v-if="editflag">
        修改地址成功
    </div>
    <div class="pwdtip" v-if="editflag1">
        修改地址失败
    </div>
  </div>
</template>


<script>
import Top from '../components/Top'
import Select from '../components/select'
import axios from "axios"
import eventbus from '../util/eventBus'
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
       title:"新增地址",
       name:"",
       phone:"",
       address: '',
       detailaddress:"",
       phoneFlag:false,
       nameFlag:false,
       addflagno:false,
       editflag:false,
       editflag1:false,
       button:"保存并使用",
       status:"add",
       addId:"",
      //  三级联动
      show: false,
      province: '北京市',
      city: '北京市',
      county: '东城区'
    }
  },
  components:{
      Top,
    'yz-select': Select,
  },
   methods: {
    editeinit(){
      this.status = this.$route.params.status;
      if(this.status=="add"){
        this.title="新增地址"
        this.button="保存并使用"
      }
      else if(this.status=="edit"){
        this.title="修改收货地址"
        this.button="修改地址"
        this.addId=this.$route.params.addId
        console.log(this.addId)
          this.name=localStorage.getItem("personName")
          this.phone=localStorage.getItem("personTel")
          this.address=localStorage.getItem("district")
          this.detailaddress=localStorage.getItem("address")
          localStorage.removeItem("personName")
          localStorage.removeItem("personTel")
          localStorage.removeItem("district")
          localStorage.removeItem("address")
      }
    },
    select(){
            this.show = true;
    },
    isShow(msg){
            console.log(msg);
            this.show = msg.show;
            this.address = msg.result;
            this.province = msg.province;
            this.city = msg.city;
            this.county = msg.county;
    },
     inp(){
       if(this.phone>11){
           this.phone=this.phone.slice(0,11)
       }
      },
      useinp(){
         if(this.phone){
           let patrn=/^[1][3,4,5,7,8][0-9]{9}$/; 
           if(!patrn.test(this.phone)){
                this.phoneFlag=true
                setTimeout(()=>{
                      this.phoneFlag=false
                    }, 3000);
           }
           else{
                this.phoneFlag=false
           }
         } 
      },
      nameinp(){
           if(this.name){
           let patrn=/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; 
           if(!patrn.test(this.name)){
                this.nameFlag=true
                setTimeout(()=>{
                      this.nameFlag=false
                    }, 3000);
           }
           else{
                this.nameFlag=false
           }
         } 
      },
    saveAdress(){
      if(this.name&&this.phone&&this.address&&this.detailaddress){
        if(this.status=="add"){
            let token=getCookie("token")
          axios.create({
            headers:{"Content-Type":'application/x-www-form-urlencoded;charset=utf-8'}
          }).post("/MobilePlatform/addAddress",{
               personName:this.name,
               personTel:this.phone,
               district:this.address,
               address:this.detailaddress,
               token:token
            }).then((res)=>{
              console.log(res)
               if(res.data.code=="1"){
                   this.$router.push({
                     path:"/addressHas"
                   })
                    localStorage.setItem("personName",this.name)
                    localStorage.setItem("personTel",this.phone)
                    localStorage.setItem("district",this.address)
                    localStorage.setItem("address",this.detailaddress)
               }
               else{
                 this.addflagno=true
                setTimeout(()=>{
                      this.addflagno=false
                    }, 3000);
               }
            })
        }
        else if(this.status=="edit"){
            let token=getCookie("token")
            console.log(this.name,this.phone,this.address,this.detailaddress,token,this.addId)
          axios.create({
            headers:{"Content-Type":'application/x-www-form-urlencoded;charset=utf-8'}
          }).post("/MobilePlatform/changeAddress",{
               personName:this.name,
               personTel:this.phone,
               district:this.address,
               address:this.detailaddress,
               token:token,
               addrId:this.addId,
            }).then((res)=>{
              console.log(res)
              if(res.data.code==="1"){
                this.editflag=true
                setTimeout(()=>{
                      this.editflag=false
                    }, 3000);
                    localStorage.setItem("personName",this.name)
                    localStorage.setItem("personTel",this.phone)
                    localStorage.setItem("district",this.address)
                    localStorage.setItem("address",this.detailaddress)
              }
              else{
                this.editflag1=true
                setTimeout(()=>{
                      this.editflag1=false
                    }, 3000);
              }
            })
        }
           
      }
    }
  },
  mounted() {
    this.editeinit()
  }
};
</script>

<style lang="scss" scoped>
.addadress{
  z-index: 9999;
  position: relative;
  height: 100vh;
  background: white;
  .common{
      width:100%;
      height:1.04rem;
      border-bottom:0.02rem solid #ececec;
      line-height: 1.04rem;
      padding-left:0.25rem;
      font-size: 0.3rem;
      input{
          width:5.4rem;
          height:0.6rem;
          border:0;
          margin-left:0.44rem;
          font-size: 0.3rem;
          color:#666666 ;
      }
  }
  .detail{
      height:1.35rem;
      line-height: 1.95rem;
      textarea{
      width:6.55rem;
      height:0.8rem;
      margin-left: 0;
      border:0;
      outline: none;
      font-size: 0.3rem;
      color:#666666 ;
     }
  }
  .button{
      width:7.1rem;
      height: 0.85rem;
      background: #ff2501;
      border-radius: 0.32rem;
      text-align: center;
      line-height: 0.85rem;
      color:white;
      margin: 0.5rem auto;
  }
}
input::-webkit-input-placeholder { 
  color: #838383;
  font-size: 0.3rem;
}
textarea::-webkit-input-placeholder { 
      font-size: 0.26rem;
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
</style>