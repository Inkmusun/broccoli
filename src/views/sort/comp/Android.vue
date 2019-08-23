<template>
  <div id="sortAndroid">
    <p>安卓</p>
    <ul class="sortAndroidCon">
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
      hotLsit: []
    };
  },
  mounted() {
    this.datafn();
    axios
      .post("/MobilePlatform/showOtherClassify", {
        typename: "手机"
      })
      .then(res => {
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
#sortAndroid {
  & > p {
    font-size: 0.3rem;
    color: #8c8c8c;
    margin-bottom: 0.1rem;
  }
  & > .sortAndroidCon {
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