<template>
  <div id="goodsDetailShadow">
    <div class="banner">
      <!-- <div class="swiper-container" id="goodsDetailSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide bannerPic" v-for="item in detailPicList" :key="item.pId">
            <img :src="item" alt />
          </div>
        </div>
      </div>-->
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item,index) in detailPicList" :key="index">
          <img :src="item" alt />
        </swiper-slide>
        <div class="swiper-pagination" id="small" slot="pagination"></div>
      </swiper>
    </div>
    <div class="goodsDetail">
      <p>
        ￥{{goodsAllDetail.goodsDiscountPrice}}
        <s>￥{{goodsAllDetail.goodsPrice}}</s>
        <b>省{{(goodsAllDetail.goodsPrice*1)-(goodsAllDetail.goodsDiscountPrice*1)}}元</b>
      </p>
      <p>
        <i>自营</i>
        {{goodsAllDetail.goodsDesc}}
      </p>
      <p>
        <b>已降{{parseInt(Math.random()*600)}}</b>
        <b>同类最低价</b>
      </p>
    </div>
    <div class="goodsSel">
      <router-link to="/zhenp" tag="div" class="clear">
        <p class="fl">正品</p>
        <div class="fl">
          <img :src="goodsDetailPic.zhenUrl" alt />
        </div>
        <i class="arrowR"></i>
      </router-link>
      <div class="clear">
        <p class="fl">促销</p>
        <div class="fl">
          <p>下单即送</p>
        </div>
        <i class="arrowR"></i>
      </div>
      <div class="clear">
        <p class="fl">活动</p>
        <div class="fl">买新机后,卖旧机多赚</div>
        <i class="arrowR"></i>
      </div>
    </div>
    <ul class="goods">
      <li>
        真机实拍
        <span>(眼见为实,所见即是所得)</span>
      </li>
      <li v-for="item in detailPicList" :key="item.id">
        <img :src="item" alt />
      </li>
    </ul>
    <div class="top" :class="isFixe?'fixed':''">
      <p @click="back">
        <img :src="goodsDetailPic.fanUrl" alt />
      </p>
      <p v-show="isFixe">iPhone 7</p>
      <p @click="isShare='true'">
        <img :src="goodsDetailPic.fenUrl" alt />
      </p>
    </div>
    <div class="bottom">
      <router-link to="/service" tag="div">
        <i class="iconfont">&#xe626;</i>
        <p>客服</p>
      </router-link>
      <div @click="changeLike">
        <i class="iconfont" v-if="!isLike">&#xe669;</i>
        <i class="iconfont" v-else>&#xe668;</i>
        <p>收藏</p>
      </div>
      <router-link to="/shoppingcart" tag="div">
        <i class="iconfont">&#xe6af;</i>
        <p>购物车</p>
      </router-link>
      <div class="bottomA">
        <p class="bottomL" @click="addToCart">加入购物车</p>
        <p class="bottomR" @click="addToOrder">直接购买</p>
      </div>
    </div>
    <transition name="fade">
      <Share v-show="isShare" />
    </transition>
  </div>
</template>

<script>
import Swiper from "swiper";
import Share from "./goodsdetail/Share";
import eventBus from "../util/eventBus";
import axios from "axios";
import getCookie from "../util/getCookie";

export default {
  data() {
    return {
      detailPicList: [
        // { id: 2201, url: "./images/banner1.jpg" },
        // { id: 2202, url: "./images/banner2.jpg" },
        // { id: 2203, url: "./images/banner3.jpg" }
      ],
      goodsDetailPic: {
        jiangUrl: "./images/goodsdetail0_03.jpg",
        zhenUrl: "./images/goodsdetail0_07.jpg",
        fanUrl: "./images/detailTop3.png",
        fenUrl: "./images/detailTop4.png"
      },
      goodsDetailPicChange: {
        fanUrl: "./images/detailTop3.png",
        fenUrl: "./images/detailTop4.png",
        fanUrl2: "./images/detailTop2.png",
        fenUrl2: "./images/detailTop1.png"
      },
      goodsAllDetail: null,
      isLike: false,
      isFixe: false,
      isShare: false,
      currentGoodsId: null,
      // swiper: null
      swiperOption: {
        init: false,
        autoplay: true,
        loop: true,
        // loopAdditionalSlides: 1,
        // 延迟
        delay: 1500,
        speed: 300,
        // 将slide的宽和高取整(四舍五入)
        roundLengths: true,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    window.onscroll = this.isScroll;
    eventBus.$on("cancelShare", () => {
      this.isShare = false;
    });
    this.currentGoodsId = this.$route.params.goodsId;
    // 获取数据 商品详情页
    axios
      .post("/MobilePlatform/showGoodsDetail", {
        // 测试id部分
        goodsId: this.currentGoodsId
      })
      .then(res => {
        console.log("getdetail", res);
        if (res.data.code == 1) {
          this.goodsAllDetail = res.data.goods;
          this.detailPicList = res.data.photos;
          console.log(this.detailPicList);
        }
      });
  },
  updated() {
    if (this.detailPicList.length > 1) {
      // this.swiper => swiper 函数
      this.swiper.init();
    }
  },
  methods: {
    isScroll() {
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll) {
        this.isFixe = true;
        this.goodsDetailPic.fanUrl = this.goodsDetailPicChange.fanUrl2;
        this.goodsDetailPic.fenUrl = this.goodsDetailPicChange.fenUrl2;
      } else {
        this.isFixe = false;
        this.goodsDetailPic.fanUrl = this.goodsDetailPicChange.fanUrl;
        this.goodsDetailPic.fenUrl = this.goodsDetailPicChange.fenUrl;
      }
    },
    back() {
      this.$router.go(-1);
    },
    changeLike() {
      if (this.isLike) {
        axios
          .post("/MobilePlatform/cancelCollect", {
            // 测试id部分
            goodsId: this.currentGoodsId,
            token: getCookie("token")
          })
          .then(res => {
            if (res.data.code == 1) {
              this.isLike = false;
            }
          });
        return;
      }
      axios
        .post("/MobilePlatform/addCollect", {
          // 测试id部分
          goodsId: this.currentGoodsId,
          token: getCookie("token")
        })
        .then(res => {
          if (res.data.code == 1) {
            this.isLike = true;
          }
        });
    },
    addToCart(e) {
      axios
        .post("/MobilePlatform/addCart", {
          // 测试id部分
          goodsId: this.currentGoodsId,
          token: getCookie("token")
        })
        .then(res => {
          if (res.data.code == 1) {
            e.target.style.backgroundColor = "grey";
            e.target.innerHTML = "已加入购物车";
            console.log(res.data.msg);
          }
        });
    },
    addToOrder() {
      let goods = this.goodsAllDetail;
      this.$store.dispatch("addOrderList", {
        selGoodsList: {
          ...goods,
          goodsPhoto:
            "http://193.112.215.30:8080/MobilePlatform/images/classify/1111.png"
        }
      });
      this.$router.push("/goodsorder/" + goods.goodsDiscountPrice);
    }
  },
  components: {
    Share
  }
};
</script>

<style lang="scss" scoped>
#goodsDetailShadow {
  position: relative;
  z-index: 100;
  background-color: #f2f2f2;
  & > .banner {
    width: 100%;
    & > img {
      width: 100%;
    }
  }
  & > .goodsDetail {
    background-color: #fff;
    padding: 0.3rem;
    & > p {
      & > b {
        font-style: normal;
        font-size: 0.16rem;
        background-color: #ffefef;
        color: #e23c24;
        padding: 0.06rem;
        margin: 0 0.05rem;
      }
    }
    & > p:nth-child(1) {
      font-size: 0.6rem;
      color: #ff2600;
      & > s {
        font-size: 0.26rem;
        color: #999999;
      }
    }
    & > p:nth-child(2) {
      font-size: 0.3rem;
      margin-bottom: 0.1rem;
      & > i {
        background-color: red;
        display: inline-block;
        color: #fff;
        font-size: 0.2rem;
        text-align: center;
        line-height: 0.34rem;
        height: 0.34rem;
        padding: 0 0.1rem;
        font-style: normal;
        border-radius: 0.06rem;
        margin-right: 0.1rem;
      }
    }
  }
  & > .goodsSel {
    margin: 0.2rem 0;
    background-color: #fff;
    padding: 0 0.3rem;
    font-size: 0.28rem;
    & > div {
      position: relative;
      border-bottom: 0.01rem solid #f4f4f4;
      height: 1.1rem;
      line-height: 1.1rem;
      & > p.fl {
        margin-right: 0.5rem;
      }
      & > .fl {
        float: left;
        & > img {
          margin-top: 0.2rem;
        }
      }
      & > .fr {
        float: right;
      }
      .arrowR {
        font-style: normal;
        position: absolute;
        right: 0.2rem;
        top: 0.5rem;
        display: block;
        width: 0.16rem;
        height: 0.16rem;
        border-right: 0.02rem solid #000;
        border-bottom: 0.02rem solid #000;
        transform: rotate(-45deg);
      }
    }
  }
  & > .goods {
    padding: 0 0.25rem;
    background-color: #fff;
    & > li:nth-child(1) {
      font-size: 0.3rem;
      line-height: 0.7rem;
      margin: 0;
      & > span {
        font-size: 0.2rem;
      }
    }
    & > li:nth-last-child(1) {
      margin-bottom: 1rem;
    }
    & > li {
      margin-bottom: 0.2rem;
      & > img {
        width: 100%;
      }
    }
  }
  & > div.fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }
  & > .top {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0.3rem;
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
  & > .bottom {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    z-index: 1000;
    height: 1rem;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    & > .bottomA {
      // width: 2rem;
      // height: 0.8rem;
      // line-height: 0.8rem;
      color: #fff;
      display: flex;
      & > .bottomL,
      & > .bottomR {
        width: 2rem;
        height: 0.8rem;
        line-height: 0.8rem;
      }
      & > .bottomL {
        background-color: #ff8201;
        border-top-left-radius: 0.4rem;
        border-bottom-left-radius: 0.4rem;
      }
      & > .bottomR {
        background-color: #ff2600;
        border-top-right-radius: 0.4rem;
        border-bottom-right-radius: 0.4rem;
      }
    }
  }
  & > .detailShadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.5);
    & > .shareBottom {
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #fff;
      width: 100%;
      & > ul {
        display: flex;
        & > li {
          flex: 1;
          padding: 0.4rem 0.1rem;
          text-align: center;
          background-color: #eee;
          font-size: 0.2rem;
          & > img {
            width: 0.7rem;
            margin-bottom: 0.1rem;
          }
        }
      }
      & > p {
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.3rem;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    animation: fade 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    animation: fade 0.5s reverse;
  }
  @keyframes fade {
    0% {
      ooacity: 0;
    }
    50% {
      ooacity: 0.5;
    }
    100% {
      ooacity: 1;
    }
  }
}
</style>