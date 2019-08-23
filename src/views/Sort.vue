<template>
  <div class="sort">
    <div class="header">
      <div class="search" @click="search">
        <i class="iconfont">&#xe65c;</i>
        <input type="text" placeholder="小米8,领券立减100元" />
      </div>
      <router-link to="/shoppingcart" tag="div">
        <i class="iconfont icon">&#xe6af;</i>
        <p>购物车</p>
      </router-link>
    </div>
    <div class="header_empty"></div>
    <div class="body">
      <Sortnav id="sortNav" />
      <Sortcont id="sortCont" />
    </div>
  </div>
</template>

<script>
import Sortnav from "./sort/Sortnav.vue";
import Sortcont from "./sort/Sortcont.vue";
export default {
  data() {
    return {};
  },
  methods: {
    search() {
      this.$router.push({
        path: "/search"
      });
    }
  },
  mounted() {},
  components: {
    Sortnav,
    Sortcont
  }
};
</script>

<style lang="scss" scoped>
.body {
  position: fixed;
  top: 1.03rem;
  left: 0;
  width: 100%;
  & > #sortNav {
    width: 1.86rem;
    float: left;
  }
  & > #sortCont {
    overflow: hidden;
    padding: 0.2rem;
    border-left: #dfdfdf solid 0.01rem;
  }
}

input::-webkit-input-placeholder {
  color: #888888;
}
div {
  font-size: 0.24rem;
}
s {
  font-style: normal;
}
.bgc {
  background-color: #f5f5f5;
  margin-bottom: 1rem;
}
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 1.03rem;
  width: 100%;
  text-align: center;
  padding: 0 0.2rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  border-bottom: #dfdfdf solid 0.01rem;
  p {
    font-size: 0.18rem;
  }
  .search {
    height: 0.6rem;
    width: 5.9rem;
    background-color: #f7f7f7;
    border-radius: 0.4rem;
    padding: 0.1rem 0.3rem;
    i {
      float: left;
      color: #c8c8c8;
    }
    input {
      font-size: 0.3rem;
      height: 0.44rem;
      width: 70%;
      border: 0;
      background-color: #f7f7f7;
      float: left;
      text-indent: 0.1rem;
    }
  }
}
.header_empty {
  height: 1.03rem;
  width: 100%;
}
.icon {
  font-size: 0.5rem !important;
  color: #575757;
}
</style>