<template>
  <div id="goodsorder">
    <div class="top fixed">
      <p @click="back">
        <img :src="backPic" alt />
      </p>
      <p>确认订单</p>
      <p></p>
    </div>
    <div class="selAddress">
      <div v-if="!defaultAddress">请先选择收货地址</div>
      <div v-else>
        <p class="addrName">{{defaultAddress.addrname}}&emsp;{{defaultAddress.addrtel}}</p>
        <p class="addrDetail">{{defaultAddress.addrdis}}&ensp;{{defaultAddress.addrdetail}}</p>
      </div>
      <router-link to="/addressHas" tag="i"></router-link>
      <!-- <i></i> -->
    </div>
    <ul class="orderList">
      <li v-for="(item,index) in orderGoodsList" :key="item.id">
        <p>订单 {{index+1}}</p>
        <div class="goodsInfo">
          <div>
            <img :src="item.goodsPhoto" alt />
          </div>
          <div>
            <p>{{item.goodsDesc}}</p>
            <p>￥{{item.goodsdiscountPrice}}</p>
          </div>
          <div>x&ensp;1</div>
        </div>
        <div class="goodsServer">
          <div>服务</div>
          <div>
            <p>整机清洁</p>
            <p>
              <span>
                限时免费赠送
                <s>￥9.99</s>
              </span>&emsp;￥0.00
            </p>
          </div>
          <div>
            <p>运费险</p>
            <p>￥0.99</p>
          </div>
          <div>
            <p>优惠券</p>
            <p>无优惠券可用</p>
          </div>
          <div>
            <p>配送方式</p>
            <p>(顺丰快递)</p>
          </div>
          <div>
            <p></p>
            <p>
              共1件商品 小计:
              <span class="totalRed">￥{{item.goodsdiscountPrice*1}}</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div class="paymethod">
      <p>支付方式</p>
      <div>
        <div>
          <p>
            <i class="iconfont payIcon">&#xe609;</i> 微信支付
          </p>
          <label for="wx">
            <input checked class="inpPay" value="wx" type="radio" name="pay" id="wx" />
            <span></span>
          </label>
        </div>
        <p>微信支付</p>
      </div>
      <div>
        <div>
          <p>
            <i class="iconfont payIcon">&#xe719;</i> 支付宝支付
          </p>
          <label for="zfb">
            <input class="inpPay" value="zfb" type="radio" name="pay" id="zfb" />
            <span></span>
          </label>
        </div>
        <p>支持花呗3、6、12期分期</p>
      </div>
      <div>
        <div>
          <p>
            <i class="iconfont payIcon">&#xe64d;</i> QQ支付
          </p>
          <label for="qq">
            <input class="inpPay" value="qq" type="radio" name="pay" id="qq" />
            <span></span>
          </label>
        </div>
        <p>QQ支付</p>
      </div>
      <div>
        <div>
          <p>
            <i class="iconfont payIcon">&#xe60c;</i> 余额支付
          </p>
          <label for="ye">
            <input class="inpPay" value="ye" type="radio" name="pay" id="ye" />
            <span></span>
          </label>
        </div>
        <p>新用户6期免息</p>
      </div>
    </div>
    <div class="bottom">
      <div class="carL">
        <div class="total">
          合计:&emsp;
          <span>￥{{total}}</span>
        </div>
      </div>
      <div class="carR" @click="confirmOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      total: 0,
      backPic: "./images/detailTop2.png",
      orderGoodsList: [
        // {
        //   id: 5001,
        //   url: "./images/android_15.jpg",
        //   name: "小米 8 64G+128G白",
        //   price: "1599",
        //   isSelect: false
        // }
      ],
      defaultAddress: null,
      addrExist: false
    };
  },
  mounted() {
    let sumTotal = this.$route.params.total * 1;
    this.total = sumTotal.toFixed(2);
    this.orderGoodsList = this.$store.state.sxg.orderList;
    console.log(this.orderGoodsList);
    let addrname = localStorage.getItem("personName");
    let addrtel = localStorage.getItem("personTel");
    let addrdis = localStorage.getItem("district");
    let addrdetail = localStorage.getItem("address");
    if (addrname && addrtel) {
      this.defaultAddress = {
        addrname,
        addrtel,
        addrdis,
        addrdetail
      };
      this.addrExist = true;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    confirmOrder() {
      let inpList = document.documentElement.querySelectorAll(".inpPay");
      let indexInp = 0;
      for (let i = 0; i < inpList.length; i++) {
        let itemInp = inpList[i];
        if (itemInp.checked) {
          indexInp = i;
        }
      }
      let selPay = inpList[indexInp].value;
      if (selPay) {
        this.$router.push({ path: "/payresult", query: { paymsg: selPay } });
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#goodsorder {
  background-color: #fafafa;
  padding: 0 0.2rem;
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
  & > .selAddress {
    margin-top: 0.94rem;
    background-color: #fff;
    padding: 0.1rem;
    position: relative;
    color: #aeaeae;
    font-size: 0.3rem;
    line-height: 0.7rem;
    & > i {
      position: absolute;
      top: 0.4rem;
      right: 0.3rem;
      width: 0.3rem;
      height: 0.3rem;
      display: block;
      border-right: 0.04rem solid #000;
      border-bottom: 0.04rem solid #000;
      transform: rotate(-45deg);
    }
    .addrName {
      color: #000;
    }
    .addrDetail {
      font-size: 0.24rem;
      line-height: 0.5rem;
    }
  }
  & > .selAddress::after {
    content: "";
    display: block;
    border: 0.04rem solid #2a9fc2;
    width: 100%;
  }
  & > .orderList {
    margin-top: 0.14rem;
    & > li {
      background-color: #fff;
      padding: 0.26rem;
      margin-bottom: 0.1rem;
      & > p {
        font-size: 0.28rem;
        margin-bottom: 0.2rem;
      }
      & > .goodsInfo {
        padding: 0.24rem 0.2rem;
        background-color: #f5f5f5;
        display: flex;
        position: relative;
        & > div:nth-child(1) {
          width: 1.26rem;
          height: 1.26rem;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.2rem;
          & > img {
            height: 1.1rem;
          }
        }
        & > div:nth-child(2) {
          font-size: 0.26rem;
          & > p:nth-child(2) {
            color: #ff2702;
            line-height: 0.6rem;
          }
        }
        & > div:nth-child(3) {
          position: absolute;
          top: 0.8rem;
          right: 0.4rem;
        }
      }
      & > .goodsServer {
        padding-top: 0.2rem;
        background-color: #fff;
        line-height: 0.6rem;
        font-size: 0.28rem;
        & > div {
          display: flex;
          justify-content: space-between;
          .totalRed {
            color: #ff7055;
          }
        }
        & > div:nth-child(2),
        & > div:nth-child(3),
        & > div:nth-child(4) > p:nth-child(2) {
          color: #979797;
        }
        & > div:nth-child(2) {
          & > p > span {
            color: #ff1700;
          }
        }
        & > div:nth-last-child(1) {
          border-top: 0.02rem solid #f5f5f5;
        }
      }
    }
  }
  & > .paymethod {
    margin: 0.2rem 0 1rem;
    padding: 0.16rem 0.26rem;
    background-color: #fff;
    font-size: 0.28rem;
    & > p:nth-child(1) {
      line-height: 0.7rem;
    }
    & > div {
      padding: 0.14rem 0;
      & > div {
        display: flex;
        justify-content: space-between;
        & > label {
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          border: 0.01rem solid #000;
          border-radius: 50%;
          position: relative;
          & > input {
            visibility: hidden;
          }
          & > .inpPay[type="radio"]:checked + span:after {
            content: "";
            display: block;
            width: 0.41rem;
            height: 0.41rem;
            position: absolute;
            right: -0.01rem;
            top: -0.01rem;
            background-color: skyblue;
            border-radius: 50%;
          }
        }
        & > p {
          font-size: 0.32rem;
          & > i.payIcon:nth-child(1) {
            color: #289e24;
          }
        }
      }
      & > p {
        font-size: 0.22rem;
        color: #9a9a9a;
      }
    }
    & > div:nth-child(3) {
      & > div {
        & > p {
          & > i.payIcon {
            color: #00acf0;
          }
        }
      }
    }
    & > div:nth-child(4) {
      & > div {
        & > p {
          & > i.payIcon {
            color: rgb(81, 183, 236);
          }
        }
      }
    }
    & > div:nth-child(5) {
      & > div {
        & > p {
          & > i.payIcon {
            color: rgb(254, 156, 1);
          }
        }
      }
    }
  }
  & > .bottom {
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
      width: 65%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.3rem;
      & > .allSelect {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      & > .total {
        color: #000;
        font-size: 0.24rem;
        & > span {
          font-size: 0.28rem;
          color: #ff2700;
        }
      }
    }
    & > .carR {
      width: 35%;
      background-color: #ff2600;
      color: #fff;
      text-align: center;
    }
  }
}
</style>