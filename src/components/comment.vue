<template>
    <div class="comment">
       <div class="item" v-for="(item,index) of data" :key="item.evaluationId">
           <div class="baseinfo">
               <img :src="picimg" alt="">
               <div class="">
                <div class="name">{{item.userNickName}}</div>
                <div class="desc">{{item.goodsDesc}}</div>
               </div>
           </div>
           <div class="com">
               {{item.evaluationContent}}
           </div>
           <div class="time">
               {{item.evaluationTime}}
               <i class="iconfont icon1" @click="add(index)">&#xe644;</i>
               <i class="iconfont icon2">&#xe7e0;</i>评论
           </div>
       </div>
    </div>
</template>

<script>
    export default {
        props:["data"],
        data(){
            return {
                picimg:"./images/timg.png",
            }
        },
        methods: {
            add(index){
            $(".icon1").eq(index).css({"color":"red"})
        }
        },
    }
</script>

<style lang="scss" scoped>
 .comment{
     width:100%;
     background:#f5f5f5;
     padding:0 0.25rem;
     .item{
         border-radius: 0.12rem;
         background: white;
         padding: 0.24rem 0.16rem;
         margin-bottom: 0.15rem;
         .baseinfo{
             display: flex;
             align-items: center;
             img{
                 width:0.9rem;
                 height:0.9rem;
                 margin-right: 0.15rem;
             }
             .name{
                 font-size: 0.32rem;
             }
             .desc{
                 font-size: 0.24rem;
                 color:#e42707;
                 padding:0.05rem 0.18rem;
                 border-radius: 0.13rem;
                 background: #ffece8;
                 margin-top: 0.08rem;
             }
         }
         .com{
             margin-top: 0.24rem;
             font-size: 0.26rem;
         }
         .time{
             color:#8a8a8a;
             font-size: 0.2rem;
             display: flex;
             align-items: center;
             .icon1{
                 margin-left:2.3rem;
                 margin-right:0.2rem;
             }
             .icon2{
                 margin-left:0.54rem;
                 margin-right:0.05rem;
             }
         }
     }
 }
</style>