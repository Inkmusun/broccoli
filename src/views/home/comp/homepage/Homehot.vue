<template>
  <div>
    <ul class="box">
      <li v-for="item in productList" :key="item.id">
        <div class="img">
          <img :src="item.url" alt />
        </div>
        <div class="hotCont">
          <p class="title">{{item.title}}</p>
          <p class="proTime">{{item.proTime}}</p>
          <p class="label">
            <span>{{item.label}}</span>
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
export default {
  data() {
    return {
      productList: [
        {
          id: 2021,
          url: "./images/hotPic_06.jpg",
          title: "全新上市 iPhone XS 64G 深空灰",
          proTime: "2018年39周 | IOS 12.2.0 | 64G adsafgaga",
          label: "活动中",
          price: {
            newPrice: 5199,
            oldPrice: 7499
          }
        },
        {
          id: 2022,
          url: "./images/hotPic_03.jpg",
          title: "全新上市 iPhone X 64G 深空灰",
          proTime: "2019年19周 | IOS 12.2.0 | 64G adsafgaga",
          label: "活动中",
          price: {
            newPrice: 4850,
            oldPrice: 5899
          }
        },
        {
          id: 2023,
          url: "./images/hotPic_11.jpg",
          title: "iPhone 7 32G 白",
          proTime: "2018年9周 | IOS 12.2.4 | 64G adsafgaga",
          label: "活动中",
          price: {
            newPrice: 4200,
            oldPrice: 5650
          }
        },
        {
          id: 2024,
          url: "./images/hotPic_03.jpg",
          title: "全新上市 iPhone X 64G 深空灰",
          proTime: "2019年19周 | IOS 12.2.0 | 64G adsafgaga",
          label: "活动中",
          price: {
            newPrice: 4850,
            oldPrice: 5899
          }
        },
        {
          id: 2025,
          url: "./images/hotPic_11.jpg",
          title: "iPhone 7 32G 白",
          proTime: "2018年9周 | IOS 12.2.4 | 64G adsafgaga",
          label: "活动中",
          price: {
            newPrice: 4200,
            oldPrice: 5650
          }
        },
        {
          id: 2026,
          url: "./images/hotPic_03.jpg",
          title: "全新上市 iPhone X 64G 深空灰",
          proTime: "2019年19周 | IOS 12.2.0 | 64G adsafgaga",
          label: "活动中",
          price: {
            newPrice: 4850,
            oldPrice: 5899
          }
        },
        {
          id: 2027,
          url: "./images/hotPic_11.jpg",
          title: "iPhone 7 32G 白",
          proTime: "2018年9周 | IOS 12.2.4 | 64G adsafgaga",
          label: "活动中",
          price: {
            newPrice: 4200,
            oldPrice: 5650
          }
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  & > li {
    width: 3.42rem;
    margin: 0.03rem;
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
</style>