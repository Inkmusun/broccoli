<template>
  <div class="collection">
    <Top title="我的收藏" subtitle=""></Top>
    <div class="noCllection" v-if="show">
      <div class="back">
        <i class="iconfont icon">&#xe616;</i>
      </div>
      <div class="font">还没有相关收藏呢</div>
    </div>
    <div class="content" v-else>
      <div class="item" v-for="(item,index) of collectionList" :key=item.goodsId>
         <div class="icon" @click="lidault(index,item)">
          <i class="iconfont iconchecked" style="margin-right:0.22rem;color:#ff2600;font-size:0.35rem;">&#xe614;</i>
      </div>
      <div class="pic">
        <img :src="item.goodsPhoto" alt="">
      </div>
      <div class="info">
          <p class="p1">{{item.goodsDesc}}</p>
          <p class="p2">{{item.goodsCore}}</p>
          <p class="p3">{{item.goodsPrice}}</p>
      </div>
      </div>
    </div>
    <div class="bottom" v-show="!show">
         <div class="box">
            <div class="icon" @click="alldefalut()">
          <i class="iconfont alliconchecked" style="margin-right:0.22rem;color:#ff2600;font-size:0.35rem;">&#xe614;</i>
         </div>
          <div sytle="margin-left:0.2rem;">&nbsp;&nbsp;全选</div>
         </div>
        <div class="delete" @click="deletegoods">删除</div>
    </div>
  </div>
</template>

<script>
let shanchu=[]
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

import axios from "axios"
import Top from '../components/Top'
export default {
  data() {
    return {
      collectionList:[],
      show:false,
    };
  },
  components:{
      Top
  },
   mounted() {
      this.init()
   },
  beforeDestroy() {
     document.querySelector('body').removeAttribute('style')
  },
  methods: {
        deletegoods(){
          let token=getCookie("token")
          shanchu.forEach(item => {
             axios.create({
            headers:{"Content-Type":'application/x-www-form-urlencoded;charset=utf-8'}
          }).post("/MobilePlatform/cancelCollect",{
               token:token,
               goodsId:item.goodsId
            }).then(res=>{
              if(res.data.code=="1"){
                let pos=this.collectionList.findIndex((el)=>{
                    return el.goodsId==item.goodsId
                })
                this.collectionList.splice(pos,1)
              }
            })
          });
        },
       init(){
         let token=getCookie("token")
         document.querySelector('body').setAttribute('style', 'background-color:#f4f4f4')
         axios.create({
            headers:{"Content-Type":'application/x-www-form-urlencoded;charset=utf-8'}
          }).post("/MobilePlatform/showCollect",{
               token:token
            }).then((res)=>{
              console.log(res)
                if(res.data.code="1"){
                  this.collectionList=res.data.data
                  if(this.collectionList.length==0){
                    this.show=true
                  }
                }
            })
       },
      lidault(index,item){     
      // console.log(index,item,111)
      if($(".iconchecked").eq(index).css("opacity")==0){
        $(".iconchecked").eq(index).css({"opacity":1,}).parents(".icon").css({"border":"none"})
        shanchu.push(item)
        //console.log(this.deletelist)
        let count1=0
        for(var j=0;j<$(".iconchecked").length;j++){
          if($(".iconchecked").eq(j).css("opacity")==1){
            count1++
          }
        }
        if($(".iconchecked").length==count1){
           $(".alliconchecked").css({"opacity":1,}).parents(".icon").css({"border":"none"})
        }
      }
      else{
        $(".iconchecked").eq(index).css({"opacity":0,}).parents(".icon").css({"border":"0.02rem solid #b6b6b6"})
        let pos=shanchu.findIndex((deletegood)=>{
              return item.goodsId==deletegood.goodsId
        })
       shanchu.splice(pos,1)
        // console.log(deletelist)
        let count=0
        for(var j=0;j<$(".iconchecked").length;j++){
          if($(".iconchecked").eq(j).css("opacity")==0){
            count++
          }
        }
        if($(".iconchecked").length!=count){
        $(".alliconchecked").css({"opacity":0,}).parents(".icon").css({"border":"0.02rem solid #b6b6b6"})
        }
      }
      let number=0
      for(var j=0;j<$(".iconchecked").length;j++){
          if($(".iconchecked").eq(j).css("opacity")==1){
            number+=1
          }
        }
        console.log(number)
        if(number>0){
          $(".delete").css({"background":"red","color":"white"})
        }
        else{
          $(".delete").css({"background":"#e6e6e6","color":"black"})
        }
    },
    alldefalut(){
      if($(".alliconchecked").css("opacity")==0){
        $(".alliconchecked").css({"opacity":1,}).parents(".icon").css({"border":"none"})
        $(".iconchecked").css({"opacity":1,}).parents(".icon").css({"border":"none"})
        $(".delete").css({"background":"red","color":"white"})
        
        this.collectionList.forEach(item => {
          shanchu.push(item)
        });
      }else{
        $(".alliconchecked").css({"opacity":0,}).parents(".icon").css({"border":"0.02rem solid #b6b6b6"})
        $(".iconchecked").css({"opacity":0,}).parents(".icon").css({"border":"0.02rem solid #b6b6b6"})
        $(".delete").css({"background":"#e6e6e6","color":"black"})
        shanchu=[]
        // console.log(this.deletelist)
      } 
    }
  },
};
</script>

<style lang="scss" scoped>
.noCllection{
  background:#f5f5f5;
  min-height: 100vh;
  z-index: 999;
.back{
  text-align: center;
  margin-top:2.4rem;
  .icon{
    font-size: 1.5rem !important;
    color: #dbdbdb;
  }
}
.font{
  text-align: center;
  color:#999999;
  font-size: 0.3rem;
  margin-top:0.48rem;
}
}
.content{
  .item{
    height:2.5rem;
    border-radius: 0.1rem;
    background: white;
    width:100%;
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    .icon{
      margin:0 0.2rem;
      display: inline-block;
      width:0.34rem;
      height:0.34rem;
      border-radius: 50%;
      border:0.02rem solid #b6b6b6;
      vertical-align: middle;
      position: relative;
      .iconchecked{
          position: absolute;
          top:-0.08rem;
          left:-0.05rem;
          opacity: 0;
        }
    }
    .info{
      height: 2rem;
      .p1{
        font-size: 0.26rem;
      }
      .p2{
        font-size: 0.2rem;
        height: 0.36rem;
        border-radius: 0.05rem;
        background: #f7f7f7;
        padding:0 0.06rem;
        box-sizing: border-box;
        line-height: 0.36rem;
        margin-top: 0.26rem;
        display: inline-block;
      }
      .p3{
        font-size: 0.32rem;
        margin-top:0.37rem;
        color:#f65737;
      }
    }
  }
}
.bottom{
  position: fixed;
  bottom: 0;
  z-index: 999;
  background: white;
  border-top:0.02rem solid #e5e5e5;
  width:100%;
  display: flex;
  height: 1.02rem;
  justify-content: space-between;
  align-items: center;
  padding-left:0.2rem;
  box-sizing: border-box;
  .box{
    display: flex;
    align-items: center;
  }
  .delete{
    width:2.1rem;
    height:100% ;
    text-align: center;
    line-height:1rem;
    background: #e6e6e6;
    font-size: 0.3rem;
  }
  .icon{
      margin-left: 0.2rem;
      display: inline-block;
      width:0.34rem;
      height:0.34rem;
      border-radius: 50%;
      border:0.02rem solid #b6b6b6;
      vertical-align: middle;
      position: relative;
      .alliconchecked{
          position: absolute;
          top:-0.08rem;
          left:-0.05rem;
          opacity: 0;
        }
    }
}
.pic{
    width:2.4rem;
    height:2.36rem;
  img{
    width:2.4rem;
    height:2.36rem;
  }
}
</style>