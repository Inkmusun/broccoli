<template>
  <div id="payresult">
    <div class="top fixed">
      <p></p>
      <p>支付信息</p>
      <p></p>
    </div>
    <div class="resultMsg clear">
      <p>
        <i class="iconfont">&#xe7f6;</i>
      </p>
      <p>{{payResultMsg}}成功,商品将会尽快为您送达!</p>
    </div>
    <div class="linkTo">
      <router-link to="/sort" tag="p">继续购物</router-link>
      <router-link to="/personal" tag="p">返回个人中心</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      payResultMsg: null
    };
  },
  mounted() {
    console.log("payresult", this.$route.query.paymsg);
    let queryMsg = this.$route.query.paymsg;
    this.payResultMsg =
      queryMsg == "wx"
        ? "微信支付"
        : queryMsg == "zfb"
        ? "支付宝支付"
        : queryMsg == "qq"
        ? "QQ支付"
        : queryMsg == "ye"
        ? "余额支付"
        : "支付失败";
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#payresult {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  & > .top {
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
  & > .resultMsg {
    margin-top: 2.5rem;
    text-align: center;
    & > p {
      font-size: 0.36rem;
      & > i {
        font-size: 2rem !important;
        color: skyblue;
      }
    }
  }
  & > .linkTo {
    display: flex;
    justify-content: space-around;
    padding: 0.1rem 0.2rem;
    margin-top: 1rem;
    & > p {
      background-color: rgb(14, 153, 223);
      color: #fff;
      border: 0.01rem solid rgb(22, 159, 230);
      width: 2rem;
      height: 0.6rem;
      text-align: center;
      line-height: 0.6rem;
      border-radius: 0.1rem;
    }
  }
}
</style>