<template>
  <div class="service">
    <Title title="客服"></Title>
    <div class="serviceList">
      <div class="item" v-for="item of list" :key="item.id">
        <div class="iconback">
          <i class="iconfont icon" v-html="item.icon" :style="{color:item.color}"></i>
        </div>
        <div class="font">{{item.font}}</div>
      </div>
    </div>
    <div class="message">
       <ul>
         <li v-for="item of messageList" :key="item.id">
           <div class="iconback">
             <i class="iconfont icon" v-html="item.icon"></i>
           </div>
           <div class="box">
             <div class="info1">
               <span class="person">{{item.person}}</span>
               <span class="time">{{item.time}}</span>
             </div>
             <div class="info2">
                {{item.info2}}
             </div>
           </div>
         </li>
       </ul>
    </div>
  </div>
</template>

<script>
import Title from '../components/Title'
export default {
  data() {
    return {
      list:[
        {icon:"&#xe7f6;",font:"物流查询",id:1,color:"#ff9c51"},
        {icon:"&#xe7e2;",font:"到货通知",id:2,color:"#fecc2f"},
        {icon:"&#xe737;",font:"投诉中心",id:3,color:"#9dd95f"},
        {icon:"&#xe67c;",font:"自助服务",id:4,color:"#6bb8fe"}
      ],
      messageList:[
        {id:1,icon:"&#xe737;",person:"在线客服",time:"2019-08-09",info2:"热门问题指引 下单包邮吗？使用什么快递？平台提供什么售后服务"}
      ]
    };
  },
  components:{
    Title
  }
};
</script>

<style lang="scss" scoped>
  .serviceList{
    margin-top: 1.01rem;
    height: 2.44rem;
    display: flex;
    justify-content: space-around;
    border-bottom: 0.17rem solid #f9f9fb;
    .item{
      .iconback{
        text-align: center;
        width: 1.03rem;
        height:1.03rem;
        background: #f7f7f7;
        border-radius: 50%;
        text-align: center;
        line-height: 1.03rem;
        margin-top:0.45rem;
        margin-bottom: 0.15rem;
        .icon{
            font-size: 0.5rem !important;
        }
      }
      .font{
        text-align: center;
        font-size: 0.28rem;
      }
    }
  }
 .message{
   ul{
     li{
       height:1.68rem;
       display: flex;
       padding-left: 0.35rem;
       align-items: center;
       width:100%;
       .iconback{
         background: #fda817;
         width: 1rem;
         height: 1rem;
         border-radius: 50%;
         color:white;
         text-align: center;
         line-height: 1rem;
         flex-shrink: 0;
         margin-right: 0.2rem;
         .icon{
           font-size: 0.5rem !important;
         }
       }
       .box{
         .info1{
           width:5.55rem;
          .person{
            font-size: 0.3rem;
          }
          .time{
            font-size: 0.24rem;
            color:#7b7b7b;
            float: right;
          }
         }
         .info2{
           width:5.55rem;
           overflow:hidden;
           white-space:nowrap;
           text-overflow:ellipsis;
           font-size: 0.24rem;
           color:#7b7b7b;
           margin-top:0.12rem;
         }
       }
     }
   }
 }  
</style>