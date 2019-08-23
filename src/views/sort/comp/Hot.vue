<template>
  <div id="sortHot">
    <p>热门</p>
    <ul class="sortHotCon">
      <router-link
        :to="`/goodslist/${item.typeId}/${item.typeName}`"
        tag="li"
        v-for="(item) in hotLsit"
        :key="item.typeId"
      >
        <img :src="item.typePhoto" />
        <p>{{item.typeName}}</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      hotLsit: [
        // {
        //   id: 8001,
        //   url:
        //     "http://img.alicdn.com/bao/uploaded/i2/TB1L0qVNXXXXXcpXVXXtjm_9XXX_035404.jpg_b.jpg",
        //   name: "iPhone 7"
        // }
      ]
    };
  },
  mounted() {
    this.datafn();
    axios.post("/MobilePlatform/showClassify").then(res => {
      if (res.data.code == 1) {
        this.hotLsit = res.data.data;
      }
    });
  },
  methods: {
    datafn() {
      let newHotList = [];
      let countid = 200;
      for (let i = 0; i < 6; i++) {
        newHotList.push(
          ...this.hotLsit.map(item => {
            countid++;
            return {
              id: item.id + countid,
              url: item.url,
              name: item.name
            };
          })
        );
      }
      this.hotLsit = newHotList;
    }
  }
};
</script>

<style lang="scss" scoped>
#sortHot {
  & > p {
    font-size: 0.3rem;
    color: #8c8c8c;
    margin-bottom: 0.1rem;
  }
  & > .sortHotCon {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    & > li {
      width: 1.6rem;
      font-size: 0.16rem;
      text-align: center;
      & > img {
        height: 1.2rem;
        margin: 0.1rem 0;
      }
    }
  }
}
</style>