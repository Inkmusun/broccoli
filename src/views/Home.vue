<template>
  <div class="bgc">
    <div class="header">
      <router-link to="/sort" tag="div">
        <i class="iconfont">&#xe729;</i>
        <p>分类</p>
      </router-link>
      <div class="search" @click="search">
        <i class="iconfont">&#xe65c;</i>
        <input type="text" placeholder="小米8,领券立减100元" />
      </div>
      <router-link to="/shoppingcart" tag="div">
        <i class="iconfont">&#xe6af;</i>
        <p>购物车</p>
      </router-link>
    </div>
    <Nav />
    <Content />
  </div>
</template>

<script>
import Nav from "./home/Nav";
import Content from "./home/Content";

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    search() {
      this.$router.push({
        path: "/search"
      });
    }
  },
  components: {
    Content,
    Nav
  }
};
</script>

<style lang="scss" scoped>
input::-webkit-input-placeholder {
  color: #c8c8c8;
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
  p {
    font-size: 0.18rem;
  }
  .search {
    height: 0.6rem;
    width: 5.14rem;
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
</style>