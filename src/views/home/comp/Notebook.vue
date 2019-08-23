<template>
  <div class="notebookBgc">
    <div class="headerBox">
      <ul class="headerUlTop">
        <li v-for="item in iphoneTypeList" :key="item.id">
          <img :src="item.url" alt />
          <p>{{item.name}}</p>
        </li>
      </ul>
      <ul class="headerUlBottom">
        <li v-for="item in moveList" :key="item.id">
          <img :src="item.url" alt />
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="iphoneBanner">
      <img src="../../../assets/images/notebook_11.jpg" alt />
    </div>
    <ul class="ihponeShowList">
      <li v-for="item in productList" :key="item.goodsId">
        <div class="img">
          <img :src="item.goodsPhoto" alt />
        </div>
        <div class="hotCont">
          <p class="title">{{item.goodsDesc}}</p>
          <p class="proTime">{{item.goodsCore}}</p>
          <p class="label" v-if="item.label">
            <span v-if="item.label.activity">{{item.label.activity}}</span>
            <span v-if="item.label.lowest">{{item.label.lowest}}</span>
            <span v-if="item.label.newDiscount">{{item.label.newDiscount}}</span>
          </p>
          <p class="price">
            <span class="redColor">￥{{item.price.newPrice}}</span>
            <s>￥{{item.price.oldPrice}}</s>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      iphoneTypeList: [
        { id: 1001, url: "./images/notebook_03.jpg", name: "吃鸡必备" },
        { id: 1002, url: "./images/notebook_03.jpg", name: "吃鸡必备" },
        { id: 1003, url: "./images/notebook_03.jpg", name: "吃鸡必备" },
        { id: 1004, url: "./images/notebook_03.jpg", name: "吃鸡必备" },
        { id: 1005, url: "./images/notebook_03.jpg", name: "吃鸡必备" }
      ],
      moveList: [
        { id: 2001, url: "./images/notebook_06.jpg", name: "小白导购" },
        { id: 2002, url: "./images/notebook_06.jpg", name: "小白导购" },
        { id: 2003, url: "./images/notebook_06.jpg", name: "小白导购" },
        { id: 2004, url: "./images/notebook_06.jpg", name: "小白导购" },
        { id: 2005, url: "./images/notebook_06.jpg", name: "小白导购" }
      ],
      productList: [
        // {
        //   id: 2021,
        //   url: "./images/notebook_17.jpg",
        //   title: "华硕 FL5900U 白",
        //   proTime: "4G | i7-6500U | 940M",
        //   label: "活动中",
        //   price: {
        //     newPrice: 3900,
        //     oldPrice: 4400
        //   }
        // }
      ]
    };
  },
  methods: {},
  mounted() {
    axios
      .post("/MobilePlatform/screenIndexGoods", {
        // 测试id部分
        typeName: "笔记本"
      })
      .then(res => {
        if (res.data.code == 1) {
          let productList = res.data.data.map(item => {
            let randomCount = parseInt(Math.random() * 1000);
            if (item.goodsIsActivity == 1) {
              item = { ...item, label: { ...item.label, activity: "活动中" } };
            }
            if (item.goodsIsLowestPrice == 1) {
              item = {
                ...item,
                label: { ...item.label, lowest: "同类最低价" }
              };
            }
            if (item.goodsIsNewDiscount == 1) {
              item = {
                ...item,
                label: { ...item.label, newDiscount: "最新降价" }
              };
            }
            item = {
              ...item,
              price: {
                newPrice: item.goodsDiscountPrice,
                oldPrice: item.goodsDiscountPrice * 1 + randomCount
              }
            };
            return item;
          });
          this.productList = productList.splice(0, 30);
        }
      });
  }
};
</script>

<style lang="scss" scoped>
.notebookBgc {
  padding: 0.21rem;
  & > .headerBox {
    background-color: #fff;
    border-radius: 0.12rem;
    padding: 0.24rem;
    & > .headerUlTop,
    & > .headerUlBottom {
      display: flex;
      & > li:nth-child(1) {
        margin-bottom: 0.1rem;
      }
      & > li {
        flex: 1;
        text-align: center;
        & > p {
          line-height: 0.5rem;
          font-size: 0.24rem;
          color: #7f7f7f;
          margin-top: 0.1rem;
        }
      }
    }
  }
  & > .iphoneBanner {
    margin: 0.2rem 0;
    & > img {
      width: 100%;
    }
  }
  & > .ihponeShowList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    & > li {
      width: 3.42rem;
      margin: 0.06rem;
      background-color: #fff;
      padding: 0.3rem 0.18rem;
      flex-shrink: 0;
      & > .img {
        width: 100%;
        text-align: center;
        margin-bottom: 0.2rem;
        & > img {
          width: 2.42rem;
        }
      }
      & > .hotCont {
        & > .title {
          font-size: 0.28rem;
          color: #000;
          line-height: 0.4rem;
        }
        & > .proTime {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          line-height: 0.6rem;
          color: #707070;
          height: 0.6rem;
        }
        & > .label {
          font-size: 0.18rem;
          line-height: 0.24rem;
          span {
            padding: 0 0.05rem;
            border-radius: 0.14rem;
            color: #f32e0b;
            border: 0.01rem solid #f32e0b;
          }
        }
        & > .price {
          margin-top: 0.1rem;
          & > .redColor {
            font-size: 0.3rem;
            color: #ff1b00;
            margin-right: 0.1rem;
          }
          & > s {
            font-size: 0.2rem;
            color: #b3b3b3;
          }
        }
      }
    }
  }
}
</style>