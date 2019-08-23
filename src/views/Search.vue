<template>
  <div class="search">
    <div class="header">
      <div class="search">
        <i class="iconfont">&#xe65c;</i>
        <input type="text" placeholder="小米8,领券立减100元" />
      </div>
      <div>
        <p @click="isreturn">取消</p>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <span @click="zh(0)" ref="hot" class="active">热门搜索</span><span @click="zh(1)" ref="height">高价回收</span>
      </div>

      <ul class="list" v-if="flag">
        <li v-for="item of list" :key="item">{{item}}</li>
      </ul>
      <ul class="list" v-else>
        <li v-for="item of list2" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag:false,
      list:["iphone5s","iphone6 plus","iphone6s","iphone6","iphone7","小米手机8","iphone7 plus","iphone6s plus","iphone8 plus","iphoneX"],
      list2:["华为手机","OPPO","OPPO Find X","iphone6","vivo","苹果7","iphone SE","小米","华为荣耀V10","苹果6S","iphone 2018 9.7寸","华为p30","iphone 6s plus","三星手机","iqoo","iphone 8 plus","oppo R11","vivo x20","iphone XS","小米6"]
    };
  },
  methods:{
    zh(a){
       if(a==0){
         this.$refs.hot.style.color="black"
         this.$refs.hot.style.fontSize="0.32rem"
          this.$refs.height.style.color="#898989"
         this.$refs.height.style.fontSize="0.26rem"
         this.flag=false
       } 
       else if(a==1){
         this.$refs.hot.style.color="#898989"
         this.$refs.hot.style.fontSize="0.26rem"
          this.$refs.height.style.color="black"
         this.$refs.height.style.fontSize="0.32rem"
         this.flag=true
       }
    },
    isreturn(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
input::-webkit-input-placeholder {
  color: #888888;
}
div {
  font-size: 0.24rem;
}
s {
  font-style: normal;
}
.bgc {
  background-color: #f5f5f5;
  margin-bottom: 1rem;
}
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 1.03rem;
  width: 100%;
  text-align: center;
  padding: 0 0.2rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  border-bottom:#dfdfdf solid 0.01rem;
  p {
    font-size: 0.28rem;
    color:"#515151"
  }
  .search {
    height: 0.6rem;
    width: 5.9rem;
    background-color: #f7f7f7;
    border-radius: 0.4rem;
    padding: 0.1rem 0.3rem;
    i {
      float: left;
      color: #c8c8c8;
    }
    input {
      font-size: 0.3rem;
      height: 0.44rem;
      width: 70%;
      border: 0;
      background-color: #f7f7f7;
      float: left;
      text-indent: 0.1rem;
    }
  }
}
.icon{
  font-size: 0.5rem !important;
  color:#575757;
}
.content{
  margin-top:1.03rem;
  .title{
    height:1rem;
    line-height: 1rem;
    span{
      margin:0 0.22rem;
      font-size: 0.26rem;
      color:#898989;
    }
    .active{
      color:black;
      font-size: 0.32rem;
    }
  }
  .list{
    li{
      padding:0.05rem 0.18rem;
      margin:0 0.16rem 0.32rem;
      border:0.02rem solid #e1e1e1;
      border-radius:0.05rem;
      float: left;
    }
  }
}
</style>