<template>
  <div id="homePage">
    <!-- <div class="swiper-container" id="bannerSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide banner" v-for="item in bannerPicList" :key="item.bannerId">
          <img :src="item.bannerPhoto" alt />
        </div>
      </div>
    </div>-->

    <div id="homeBanner">
      <swiper :options="swiperHomeOption" ref="myHomeSwiper">
        <swiper-slide v-for="(item) in bannerPicList" :key="item.bannerId">
          <img :src="item.bannerPhoto" alt @click="bannerClick(item)" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <ul class="showTitle">
      <li v-for="item in showTitleList" :key="item.id">
        <i class="iconfont" v-html="item.iconfont"></i>
        <span>{{item.name}}</span>
      </li>
    </ul>
    <ul class="sort">
      <router-link
        v-for="item in sortList"
        :key="item.id"
        tag="li"
        :to="`/goodslist/${item.id}/${item.name}`"
      >
        <i class="iconfont" v-html="item.iconfont"></i>
        <p>{{item.name}}</p>
      </router-link>
      <!-- <li v-for="item in sortList" :key="item.id">
        <i class="iconfont" v-html="item.iconfont"></i>
        <p>{{item.name}}</p>
      </li>-->
    </ul>
    <ul class="ms">
      <li>
        <p class="title">限时秒杀</p>
        <p class="redColor">特价捡漏&emsp;最高省400</p>
        <p>
          <img src="@/assets/images/ms.jpg" alt />
        </p>
      </li>
      <li>
        <p class="title">
          高价卖手机
          <span>限时高价</span>
        </p>
        <p class="redColor">最高加价20%</p>
        <div class="sellFl">
          <img src="@/assets/images/sell.jpg" alt />
          <div class="fl">
            <p>
              最高价￥
              <b>2488</b>
            </p>
            <p>华为&ensp;P20&ensp;Pro</p>
            <p>本机</p>
          </div>
        </div>
      </li>
    </ul>
    <div ref="subNav" :class="isFixed?'empty':''"></div>
    <Subnav :class="isFixed?'fixed':''" />
    <Subcontent />
  </div>
</template>

<script>
import Swiper from "swiper";
import Subcontent from "./homepage/Subcontent";
import Subnav from "./homepage/Subnav";
import axios from "axios";

export default {
  data() {
    return {
      bannerPicList: [
        // { pId: 201, url: "./assets/images/banner1.jpg" },
        // { pId: 202, url: "../assets/images/banner2.jpg" },
        // { pId: 203, url: "../../assets/images/banner3.jpg" }
      ],
      showTitleList: [
        { id: 301, iconfont: "&#xe614;", name: "7天退货" },
        { id: 302, iconfont: "&#xe614;", name: "一年质保" },
        { id: 303, iconfont: "&#xe614;", name: "顺丰包邮" },
        { id: 304, iconfont: "&#xe614;", name: "原装正品" }
      ],
      sortList: [
        { id: 401, iconfont: "&#xe600;", name: "iPhone" },
        { id: 402, iconfont: "&#xe601;", name: "华为" },
        { id: 403, iconfont: "&#xe646;", name: "小米" },
        { id: 404, iconfont: "&#xe604;", name: "OPPO" },
        { id: 405, iconfont: "&#xe674;", name: "vivo" },
        { id: 406, iconfont: "&#xe618;", name: "其他安卓" },
        { id: 407, iconfont: "&#xe670;", name: "平板" },
        { id: 408, iconfont: "&#xe702;", name: "笔记本" },
        { id: 409, iconfont: "&#xe61d;", name: "排行榜" },
        { id: 410, iconfont: "&#xe63c;", name: "更多" }
      ],
      isFixed: false,
      swiperHomeOption: {
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
  methods: {
    navScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTo;
      if (scrollTop >= this.$refs.subNav.offsetTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    bannerClick(item) {
      console.log(item.bannerId);
    }
  },
  mounted() {
    axios
      .create({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      })
      .post("/MobilePlatform/index")
      .then(res => {
        if (res.data.code == 1) {
          let bannerPicListFrom = res.data.data.filter(item => {
            return item.bannerType == 1;
          });
          this.bannerPicList = bannerPicListFrom;
          new Swiper("#bannerSwiper", {
            // 自动播放
            autoplay: true,
            // 循环模式选项
            loop: true,
            // 延迟
            delay: 1500,
            speed: 300,
            // 将slide的宽和高取整(四舍五入)
            roundLengths: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination"
            }
          });
        }
      });
    window.onscroll = this.navScroll; // 绑定滚动事件
  },
  computed: {
    swiper() {
      return this.$refs.myHomeSwiper.swiper;
    }
  },
  updated() {
    if (this.bannerPicList.length > 1) {
      // this.swiper => swiper 函数
      this.swiper.init();
    }
  },
  destroyed() {
    window.onscroll = null; //清除事件绑定
  },
  components: {
    Subcontent,
    Subnav
  }
};
</script>

<style lang="scss" scoped>
#homePage {
  padding: 0 0.25rem;
  #homeBanner {
    text-align: center;
    margin-top: 0.2rem;
    img {
      width: 100%;
      border-radius: 0.3rem;
    }
  }
  // .banner {
  //   text-align: center;
  //   margin-top: 0.2rem;
  //   & > img {
  //     width: 7rem;
  //     height: 2.8rem;
  //     border-radius: 0.2rem;
  //   }
  //   & > #small {
  //     font-size: 0.24rem !important;
  //     background-color: #6ff !important;
  //     z-index: 200 !important;
  //   }
  // }
  .showTitle {
    display: flex;
    justify-content: space-between;
    & > li {
      font-size: 0.2rem;
      color: #878787;
      .iconfont {
        font-size: 0.2rem !important;
        margin: 0 0.1rem;
      }
      height: 0.56rem;
      line-height: 0.56rem;
    }
  }
  .sort {
    display: flex;
    flex-wrap: wrap;
    padding: 0.1rem;
    background-color: #fff;
    border-radius: 0.1rem;
    li {
      float: left;
      width: 1.35rem;
      // height: 1.2rem;
      text-align: center;
      padding: 0.2rem 0;
    }
  }
  .ms {
    display: flex;
    padding: 0.2rem;
    background-color: #fff;
    border-radius: 0.1rem;
    margin: 0.2rem 0;
    li {
      flex: 1;
      .sellFl {
        display: flex;
        & > img {
          margin-right: 0.26rem;
        }
        & > .fl {
          & > p:nth-child(1) {
            color: #f2114d;
            font-size: 0.2rem;
            & > b {
              font-size: 0.3rem;
              color: #fe003e;
            }
          }
          & > p:nth-child(2) {
            font-size: 0.24rem;
            color: #000;
            line-height: 0.6rem;
          }
          & > p:nth-child(3) {
            font-size: 0.16rem;
            color: #fff;
            background-color: #323232;
            width: 0.5rem;
            height: 0.28rem;
            text-align: center;
            line-height: 0.28rem;
          }
        }
      }
      .title {
        font-size: 0.3rem;
        font-weight: 600;
        & > span {
          // background-color: linear-gradient(right, #ff5450, #f40000);
          background: -webkit-linear-gradient(left, #ff5450, #f40000);
          color: #fff;
          width: 1rem;
          height: 0.26rem;
          border-radius: 0.1rem;
          font-size: 0.2rem;
          padding: 0.04rem;
          font-weight: 500;
        }
      }
      .redColor {
        font-size: 0.2rem;
        color: #f87847;
        line-height: 0.3rem;
        margin-bottom: 0.1rem;
      }
    }
  }
  // .empty {
  //   width: 100%;
  //   height: 0.5rem;
  //   padding: 0.15rem 0;
  // }
  // .fixed {
  //   position: fixed;
  //   width: 100%;
  //   top: 11rem;
  //   left: 0;
  //   z-index: 999;
  //   background-color: #f5f5f5;
  //   // transform:translate3d(0,0,0);
  // }
}
</style>