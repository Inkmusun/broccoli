<template>
  <div class="subNav" ref="subNav">
    <ul class="subNav-list">
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
//
import VueRouter from "vue-router";
import eventBus from "@/util/eventBus";
export default {
  data() {
    return {
      navList: [{ name: "超值低价", id: 1 }, { name: "人气推荐", id: 2 }],
      nowIndex: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化，保证刷新页面后内容区和导航键一致
      this.initPage();
    });
    // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
    eventBus.$on("subSlideTab", this.slideTab);
  },
  methods: {
    initPage() {
      this.$route.path === "/home/homepage/low"
        ? 0
        : this.$route.path === "/home/homepage/hot"
        ? 1
        : 0;
    },
    tabClick(index) {
      this.nowIndex = index;
      // 点击导航按钮时向swiper组件发射index
      eventBus.$emit("subChangeTab", index);
    },
    slideTab(index) {
      this.nowIndex = index;
      let router = new VueRouter();
      let href =
        index === 0
          ? "/home/homepage/low"
          : index === 1
          ? "/home/homepage/hot"
          : "/home/homepage/low";
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
.subNav {
  height: 0.8rem;
  .subNav-list {
    padding: 0.15rem 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    line-height: 0.4rem;
    text-align: center;
    // overflow-x: scroll;
    // overflow-y: hidden;
    & > li {
      margin: 0 0.45rem;
      height: 100%;
      flex: 1;
    }
    & > li.current {
      color: #ff1c00;
      position: relative;
    }
    & > li.current::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0.04rem;
      background: #ff1700;
      width: 0.68rem;
      margin: 0 auto;
      border-radius: 0.02rem;
    }
  }
}
</style>