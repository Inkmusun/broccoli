<template>
  <div id="quality">
    <div class="top fixed">
      <p @click="back">
        <img :src="topPic.backPic" alt />
      </p>
      <p>正品保障</p>
      <p>
        <img :src="topPic.sharePic" alt />
      </p>
    </div>
    <div class="quContent clear">
      <img :src="contPic" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topPic: {
        backPic: "./images/detailTop2.png",
        sharePic: "./images/detailTop1.png"
      },
      contPic: "./images/zhenp.jpg"
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
#quality {
  position: relative;
  width: 100%;
  z-index: 100;
}
.top {
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
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
.quContent {
  width: 100%;
  margin-top: 0.92rem;
  & > img {
    width: 100%;
  }
}
</style>