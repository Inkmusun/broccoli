<template>
  <div class="nav">
    <ul class="nav-list">
      <li
        class="item"
        v-for="(item,index) in navList"
        :class="{'current': nowIndex===index}"
        @click="tabClick(index)"
        :key="item.id"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import VueRouter from "vue-router";
import eventBus from "../../util/eventBus";
export default {
  data() {
    return {
      navList: [
        { name: "首页", id: 1 },
        { name: "iPhone", id: 2 },
        { name: "安卓", id: 3 },
        { name: "笔记本", id: 4 },
        { name: "平板", id: 5 }
      ],
      nowIndex: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化，保证刷新页面后内容区和导航键一致
      this.initPage();
    });
    // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
    eventBus.$on("slideTab", this.slideTab);
  },
  methods: {
    initPage() {
      this.$route.path === "/home/homepage"
        ? 0
        : this.$route.path === "/home/iphone"
        ? 1
        : this.$route.path === "/home/android"
        ? 2
        : this.$route.path === "/home/notebook"
        ? 3
        : this.$route.path === "/home/ipad"
        ? 4
        : 0;
    },
    tabClick(index) {
      this.nowIndex = index;
      // 点击导航按钮时向swiper组件发射index
      eventBus.$emit("changeTab", index);
    },
    slideTab(index) {
      this.nowIndex = index;
      let router = new VueRouter();
      let href =
        index === 0
          ? "/home/homepage"
          : index === 1
          ? "/home/iphone"
          : index === 2
          ? "/home/android"
          : index === 3
          ? "/home/notebook"
          : index === 4
          ? "/home/ipad"
          : "/home/homepage";
      // 利用路由的push方法更新路径地址
      router.push(href);
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  height: 0.4rem;
}
.nav {
  height: 0.8rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 1.03rem;
  z-index: 999;
  .nav-list {
    padding: 0.15rem 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    line-height: 0.4rem;
    text-align: center;
    background: -webkit-linear-gradient(rgb(250, 250, 250), rgb(255, 255, 255));
    // overflow-x: scroll;
    // overflow-y: hidden;
    & > li {
      margin: 0 0.45rem;
      height: 100%;
      flex-shrink: 0;
    }
    & > li.current {
      color: #ff1c00;
      position: relative;
      font-size: 0.3rem;
    }
    & > li.current::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0.04rem;
      background: #ff1c00;
      border-radius: 0.02rem;
    }
  }
}
</style>