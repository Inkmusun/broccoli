<template>
  <div id="sortHongmi">
    <p>红米</p>
    <ul class="sortHongmiCon">
      <router-link
        :to="`/goodslist/${item.id}/${item.name}`"
        tag="li"
        v-for="(item) in hotLsit"
        :key="item.id"
      >
        <img :src="item.url" />
        <p>{{item.name}}</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotLsit: [
        {
          id: 8001,
          url:
            "http://img.alicdn.com/bao/uploaded/i2/TB1L0qVNXXXXXcpXVXXtjm_9XXX_035404.jpg_b.jpg",
          name: "iPhone 7"
        },
        {
          id: 8002,
          url:
            "https://img.alicdn.com/bao/uploaded/i4/TB14kUhhiLaK1RjSZFxlECmPFXa_100611.jpg",
          name: "华为 畅享9 PLUS"
        },
        {
          id: 8003,
          url:
            "https://img.alicdn.com/bao/uploaded/i7/TB1xHH3HHvpK1RjSZFqmR.XUVXa_123431.jpg",
          name: "小米9"
        }
      ]
    };
  },
  mounted() {
    this.datafn();
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
#sortHongmi {
  & > p {
    font-size: 0.3rem;
    color: #8c8c8c;
    margin-bottom: 0.1rem;
  }
  & > .sortHongmiCon {
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