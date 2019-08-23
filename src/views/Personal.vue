<template>
  <div class="person">
    <!---------- 吸顶 -------------->
    <div class="subtop" v-if="topflag" ref="subRef">
      <div class="img">
        <img src="@/assets/images/timg.png" alt />
      </div>
      <div class="font" @click="change">{{font}}</div>
      <router-link to="/shoppingcart" tag="div" class="car">
        <i class="iconfont iconcar">&#xe6af;</i>
      </router-link>
    </div>
    <!---------- top ------------->
    <div class="top">
      <router-link to="/shoppingcart" tag="div" class="car">
        <i class="iconfont iconcar">&#xe6af;</i>
      </router-link>
      <div class="login">
        <div class="img">
          <img src="../assets/images/timg.png" alt />
        </div>
        <div class="font" @click="change">{{font}}</div>
      </div>
    </div>

    <!-- ------订单 ------------>
    <div class="order" ref="orderRef">
      <div class="title">全部订单</div>
      <div class="order-list">
        <div>
          <div class="iconlist">
            <i class="iconfont iconcar">&#xe623;</i>
          </div>
          <div class="order-font">全部订单</div>
        </div>
        <div>
          <div class="iconlist">
            <i class="iconfont iconcar">&#xe61a;</i>
          </div>
          <div class="order-font">待付款</div>
        </div>
        <div>
          <div class="iconlist">
            <i class="iconfont iconcar">&#xe619;</i>
          </div>
          <div class="order-font">待发货</div>
        </div>
      </div>
    </div>

    <!--------- 功能 ---------->
    <div class="function">
      <div class="title">常用功能</div>
      <div class="order-list">
        <div>
          <div class="iconlist">
            <i class="iconfont iconcar">&#xe7c4;</i>
          </div>
          <div class="order-font">优惠券</div>
        </div>
        <div>
          <div class="iconlist">
            <i class="iconfont iconcar">&#xe6b9;</i>
          </div>
          <div class="order-font">购物车</div>
        </div>
        <div>
          <div class="iconlist">
            <i class="iconfont iconcar">&#xe60a;</i>
          </div>
          <div class="order-font">游戏交易</div>
        </div>
        <div>
          <div class="iconlist">
            <i class="iconfont iconcar">&#xe682;</i>
          </div>
          <div class="order-font">我的返现</div>
        </div>
      </div>
    </div>
    <!----------- banner图 -------->
    <div class="banner">
      <img src="../assets/images/personImg.jpg" />
    </div>

    <!---------   分类列表 --------->
    <div class="sort">
      <ul class="sortList">
        <li @click="collection">
          <div class="iconlist">
            <i class="iconfont iconcar" style="color:#f66850;">&#xe64b;</i>
          </div>
          <div class="content">
            <span>我的收藏</span>
            <span class="right">></span>
          </div>
        </li>
        <li @click="logistics">
          <div class="iconlist">
            <i class="iconfont iconcar" style="color:#ffaa40;">&#xe7f6;</i>
          </div>
          <div class="content">
            <span>物流查询</span>
            <span class="right">></span>
          </div>
        </li>
        <li @click="address">
          <div class="iconlist">
            <i class="iconfont iconcar" style="color:#48a6ff">&#xe650;</i>
          </div>
          <div class="content">
            <span>地址管理</span>
            <span class="right">></span>
          </div>
        </li>
        <li>
          <div class="iconlist">
            <i class="iconfont iconcar" style="color:#4ac6be">&#xe623;</i>
          </div>
          <div class="content">
            <span>分享APP</span>
            <span class="right">></span>
          </div>
        </li>
        <li>
          <div class="iconlist">
            <i class="iconfont iconcar" style="color:#48a6ff">&#xe682;</i>
          </div>
          <div class="content">
            <span>我的返现</span>
            <span class="right">></span>
          </div>
        </li>
        <li>
          <div class="iconlist">
            <i class="iconfont iconcar" style="color:#48a6ff">&#xe769;</i>
          </div>
          <div class="content">
            <span>安全中心</span>
            <span class="right">></span>
          </div>
        </li>
        <li>
          <div class="iconlist">
            <i class="iconfont iconcar" style="color:#48a6ff">&#xe6ff;</i>
          </div>
          <div class="content">
            <span>我的客服</span>
            <span class="right">></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      font: "登录/注册",
      topflag: false
    };
  },
  methods: {
    change() {
      if (this.font == "登录/注册") {
        this.$router.push({ path: "/login" });
      } else {
        this.$router.push({ path: "/personInfo" });
      }
    },
    handleScroll() {
      console.log(document.documentElement.scrollTop);
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >= 110
      ) {
        this.topflag = true;
      } else {
        this.topflag = false;
      }
    },
    address() {
      this.$router.push({ path: "/addressHas" });
    },
    collection() {
      this.$router.push({ path: "/collection" });
    },
    logistics() {
      this.$router.push({ path: "/logistics" });
    }
  },
  mounted() {
    window.onscroll = this.handleScroll;
    let telephone = localStorage.getItem("telephone");
    if (telephone) {
      let a = telephone.substring(0, 3);
      let b = telephone.substring(7, 11);
      this.font = a + "****" + b;
    }
  }
};
</script>

<style lang="scss" scoped>
.person {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  margin-bottom: 1rem;
  color: #4e4e4e;
  .top {
    height: 2.3rem;
    background: #ff3610;
    .car {
      height: 0.63rem;
      position: relative;
      .iconcar {
        color: white;
        font-size: 0.44rem !important;
        position: absolute;
        bottom: 0;
        right: 0.47rem;
      }
    }
    .login {
      height: 1rem;
      .img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-left: 0.47rem;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .font {
        font-size: 0.28rem;
        color: white;
        margin-left: 0.08rem;
        float: left;
        height: 1rem;
        line-height: 1rem;
      }
    }
  }
  .order {
    width: 7rem;
    height: 2.58rem;
    border-radius: 0.15rem;
    background: white;
    margin: 0 auto;
    margin-top: -0.18rem;
    margin-bottom: 0.25rem;
    .title {
      padding-top: 0.38rem;
      margin-left: 0.34rem;
      font-size: 0.26rem;
    }
    .order-list {
      display: flex;
      font-size: 0.26rem;
      justify-content: space-around;
      padding-top: 0.45rem;
      .iconlist {
        text-align: center;
        padding-bottom: 0.14rem;
        .iconcar {
          font-size: 0.6rem !important;
          color: #fb625c;
        }
      }
    }
  }
  .function {
    width: 7rem;
    height: 2.58rem;
    border-radius: 0.15rem;
    background: white;
    margin: 0 auto;
    .title {
      padding-top: 0.38rem;
      margin-left: 0.34rem;
      font-size: 0.26rem;
    }
    .order-list {
      display: flex;
      font-size: 0.26rem;
      justify-content: space-around;
      padding-top: 0.45rem;
      .iconlist {
        text-align: center;
        padding-bottom: 0.14rem;
        .iconcar {
          font-size: 0.6rem !important;
          color: #fb625c;
        }
      }
    }
  }
  .banner {
    margin: 0.25rem auto;
    width: 7rem;
    img {
      width: 100%;
    }
  }
  .sort {
    width: 7rem;
    margin: 0 auto;
    background: white;
    border-radius: 0.15rem;
    .sortList {
      li {
        height: 1rem;
        .iconlist {
          float: left;
          width: 1.06rem;
          text-align: center;
          height: 1rem;
          .iconcar {
            vertical-align: middle;
            line-height: 1rem;
          }
        }
        .content {
          float: left;
          height: 1rem;
          width: 5.7rem;
          box-sizing: border-box;
          border-bottom: 0.02rem solid #f5f5f5;
          line-height: 1rem;
          font-size: 0.26rem;
          .right {
            float: right;
          }
        }
      }
    }
  }
}
.subtop {
  width: 100%;
  height: 1.05rem;
  background: #ff2603;
  position: fixed;
  color: white;
  top: 0;
  .img {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    float: left;
    margin-top: 0.27rem;
    margin-left: 0.34rem;
    margin-right: 0.24rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .font {
    float: left;
    height: 1.05rem;
    line-height: 1.05rem;
    margin-right: 3.8rem;
    font-size: 0.3rem;
  }
  .car {
    float: left;
    height: 1.05rem;
    line-height: 1.05rem;
    .iconcar {
      font-size: 0.44rem !important;
    }
  }
}
</style>