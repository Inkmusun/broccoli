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
        { name: "推荐", id: 1 },
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
    eventBus.$on("showTab", this.slideTab);
  },
  methods:{
      initPage() {
      this.$route.path === "/showlist/tj"
        ? 0
        : this.$route.path === "/showlist/iphone"
        ? 1
        : this.$route.path === "/showlist/android"
        ? 2
        : this.$route.path === "/showlist/notebook"
        ? 3
        : this.$route.path === "/showlist/ipad"
        ? 4
        : 0;
    },
    tabClick(index) {
      this.nowIndex = index;
      // 点击导航按钮时向swiper组件发射index
      eventBus.$emit("changeShow", index);
    },
    slideTab(index) {
      this.nowIndex = index;
      let router = new VueRouter();
      let href =
        index === 0
          ? "/showlist/tj"
          : index === 1
          ? "/showlist/iphone"
          : index === 2
          ? "/showlist/android"
          : index === 3
          ? "/showlist/notebook"
          : index === 4
          ? "/showlist/ipad"
          : "/showlist/tj";
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
  z-index: 999;
  height: 0.8rem;
  width:100%;
  position: fixed;
  top:1rem;
  background: white;
  .nav-list {
    padding: 0.15rem 0;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    line-height: 0.4rem;
    text-align: center;
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
      height: 0.1rem;
      background: #ff1c00;
      width:0.42rem;
      margin:0 auto;
      border-radius:0.05rem;
    }
  }
}
</style>