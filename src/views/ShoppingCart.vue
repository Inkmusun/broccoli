<template>
  <div id="shoppingcar" class="clear">
    <div class="top fixed">
      <p @click="back">
        <img :src="backPic" alt />
      </p>
      <p>正品保障</p>
      <p></p>
    </div>
    <ul class="carCont clear">
      <!-- 重复的商品 id 相同 -->
      <li v-for="(item,index) in shoppingCartList" :key="item.id">
        <Select class="chooseItem" :selChecked="item.isSelect" @click="clickChecked($event,item)" />
        <div class="goodspic">
          <img :src="item.goodsPhoto" alt />
        </div>
        <div class="goodsDetail">
          <p class="detail">{{item.goodsDesc}}</p>
          <p class="price">￥{{item.goodsdiscountPrice}}</p>
          <button class="delGoods" @click="delGoods(item.id,index)">删除</button>
        </div>
      </li>
    </ul>
    <div class="bottom">
      <div class="carL">
        <div class="allSelect">
          <i v-if="isAllChecked" class="iconfont selectIcon" @click="allChecked">&#xe614;</i>
          <div id="allSelectEmpty" v-else @click="allChecked"></div>
          <p>全选</p>
        </div>
        <div class="total">合计:&emsp;￥{{total.toFixed(2)}}</div>
      </div>
      <router-link :to="'/goodsorder/'+total" tag="div" class="carR">结算({{selectCount}})</router-link>
    </div>
  </div>
</template>

<script>
import Select from "./shoppingcar/Select";
import eventBus from "../util/eventBus";
import axios from "axios";
import getCookie from "../util/getCookie";

export default {
  data() {
    return {
      backPic: "./images/detailTop2.png",
      total: 0,
      selectCount: 0,
      isAllChecked: false,
      // shoppingcart 中的数据获取时增加一个属性 isSelect
      shoppingCartList: [
        // {
        //   id: 5001,
        //   url: "./images/android_15.jpg",
        //   name: "小米 8 64G+128G白",
        //   price: "1599",
        //   isSelect: false
        // },
        // {
        //   id: 5002,
        //   url: "./images/android_15.jpg",
        //   name: "小米 8 64G+128G白",
        //   price: "1599",
        //   isSelect: false
        // }
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    clickChecked(event, item) {
      item.isSelect = event.isChecked;
      this.total = this.totalSum();
      this.judgeAllsel();
    },
    totalSum() {
      return this.shoppingCartList.reduce((preVal, item) => {
        if (item.isSelect) {
          preVal += item.goodsdiscountPrice * 1;
        }
        return preVal;
      }, 0);
    },
    allChecked() {
      if (this.isAllChecked) {
        this.isAllChecked = false;
        this.shoppingCartList.forEach(item => {
          item.isSelect = false;
          this.selectCount = 0;
        });
      } else {
        this.isAllChecked = true;
        this.shoppingCartList.forEach(item => {
          item.isSelect = true;
          this.selectCount = this.shoppingCartList.length;
        });
      }
      eventBus.$emit("allSel", this.isAllChecked);
      this.total = this.totalSum();
    },
    judgeAllsel() {
      let selCount = 0;
      this.shoppingCartList.forEach(item => {
        if (item.isSelect) {
          selCount++;
        }
      });
      this.selectCount = selCount;
      if (selCount == this.shoppingCartList.length) {
        this.isAllChecked = true;
      } else {
        this.isAllChecked = false;
      }
    },
    delGoods(id, index) {
      axios
        .post("/MobilePlatform/deleteCart", {
          // 测试id部分
          id: id,
          token: getCookie("token")
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.shoppingCartList.splice(index, 1);
          }
        });
    }
  },
  mounted() {
    axios
      .post("/MobilePlatform/showCart", {
        // 测试id部分
        goodsId: 416,
        token: getCookie("token")
      })
      .then(res => {
        if (res.data.code == 1) {
          console.log(res.data.data);
          let returnData = res.data.data.map(item => {
            return { ...item, isSelect: false };
          });
          this.shoppingCartList = returnData;
        }
      });
  },
  beforeDestroy() {
    let selGoodsList = this.shoppingCartList.filter(item => {
      return item.isSelect === true;
    });
    this.$store.dispatch("addOrderList", { selGoodsList });
  },
  components: {
    Select
  }
};
</script>

<style lang="scss" scoped>
#shoppingcar {
  position: relative;
  z-index: 100;
  background-color: #f5f5f5;
  min-height: 90vh;
  .selectIcon {
    color: #ff2600 !important;
    width: 0.42rem;
  }
  #select {
    border: 0.01rem solid #a7a7a7;
    width: 0.43rem;
    height: 0.43rem;
    border-radius: 50%;
  }
  .top {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0.3rem;
    border-bottom: 0.02rem solid #e9e9e9;
    & > p:nth-child(2) {
      font-size: 0.3rem;
      line-height: 0.52rem;
    }
    & > p {
      & > img {
        border-radius: 50%;
        width: 0.5rem;
      }
    }
  }
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }
  .carCont {
    margin-top: 0.92rem;
    & > li:nth-last-child(1) {
      margin-bottom: 1rem;
    }
    & > li {
      //   height: 2.3rem;
      width: 100%;
      background-color: #fff;
      margin-bottom: 0.2rem;
      padding: 0.3rem;
      display: flex;
      align-items: center;
      & > .select {
        margin-right: 0.3rem;
      }
      & > .goodspic {
        height: 1.55rem;
        width: 1.55rem;
        border-radius: 0.05rem;
        border: 0.01rem solid #ededed;
        display: flex;
        justify-content: center;
        align-items: center;
        & > img {
          height: 1.3rem;
        }
      }
      & > .goodsDetail {
        margin-left: 0.1rem;
        position: relative;
        & > .detail {
          font-size: 0.26rem;
          line-height: 0.5rem;
        }
        & > .price {
          font-size: 0.3rem;
          color: #ff2500;
        }
        & > .delGoods {
          position: absolute;
          right: -0.9rem;
          bottom: 0.1rem;
          width: 0.6rem;
          height: 0.4rem;
          background-color: rgb(64, 158, 255);
          color: #fff;
          border: 0;
          border-radius: 0.1rem;
        }
      }
    }
  }
  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    height: 1rem;
    background-color: #fff;
    width: 100%;
    border-top: 0.02rem solid #ebebeb;
    display: flex;
    line-height: 1rem;
    & > div {
      height: 100%;
    }
    & > .carL {
      width: 75%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.3rem;
      & > .allSelect {
        display: flex;
        justify-content: center;
        align-items: center;
        & > #allSelectEmpty {
          border: 0.01rem solid #a7a7a7;
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 50%;
        }
      }
      & > .total {
        color: #ff2301;
      }
    }
    & > .carR {
      width: 25%;
      background-color: #ff2600;
      color: #fff;
      text-align: center;
    }
  }
}
</style>