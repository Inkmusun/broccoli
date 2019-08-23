<template>
  <div>
    <ul class="superLow">
      <li v-for="item in detailList" :key="item.bannerId" class="item">
        <img :src="item.bannerPhoto" alt />
        <div class="content">
          <div class="lowTitle">
            <p>{{item.bannerTitle}}</p>
            <span class="remainTime">剩{{item.bannerDay}}天</span>
          </div>
          <p class="redColor">本活动限量{{item.bannerLimit}}台,现仅剩{{item.bannerCount}}台</p>
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
      detailList: []
    };
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
          let lowPicList = res.data.data.filter(item => {
            return item.bannerType == 2;
          });
          this.detailList = lowPicList;
        }
      });
  }
};
</script>

<style lang="scss" scoped>
.superLow {
  & > .item {
    margin-bottom: 0.32rem;
    background-color: #fff;
    border-radius: 0.14rem;
    font-size: 0.26rem;
    & > img {
      width: 100%;
    }
    & > .content {
      padding: 0.2rem;
      line-height: 0.46rem;
      & > .lowTitle {
        display: flex;
        justify-content: space-between;
        & > p {
          width: 80%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .remainTime {
          color: #9b9b9b;
        }
      }
      & > .redColor {
        color: #ef2d38;
      }
    }
  }
}
</style>