<template>
  <ul id="sortNav">
    <li
      class="sortItem"
      v-for="(item,index) in navList"
      :class="{'current': nowIndex===index}"
      @click="sortTabClick(index)"
      :key="item.id"
    >{{item.name}}</li>
  </ul>
</template>

<script>
import VueRouter from "vue-router";
import eventBus from "../../util/eventBus";

export default {
  data() {
    return {
      navList: [
        {
          id: 3001,
          name: "热门"
        },
        {
          id: 3002,
          name: "iPhone"
        },
        {
          id: 3003,
          name: "安卓"
        },
        {
          id: 3004,
          name: "平板"
        },
        {
          id: 3005,
          name: "小米"
        },
        {
          id: 3006,
          name: "华为"
        },
        {
          id: 3007,
          name: "OPPO"
        },
        {
          id: 3008,
          name: "vivo"
        },
        {
          id: 3009,
          name: "荣耀"
        },
        {
          id: 3010,
          name: "红米"
        },
        {
          id: 3011,
          name: "笔记本"
        },
        {
          id: 3012,
          name: "更多"
        },
        {
          id: 10000,
          name: ""
        }
      ],
      nowIndex: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化，保证刷新页面后内容区和导航键一致
      this.initPage();
    });
    // this.initPage();
    // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
    eventBus.$on("sortSlideTab", this.slideTab);
  },
  methods: {
    initPage() {
      this.$route.path === "/sort/hot"
        ? 0
        : this.$route.path === "/sort/iphone"
        ? 1
        : this.$route.path === "/sort/android"
        ? 2
        : this.$route.path === "/sort/ipad"
        ? 3
        : this.$route.path === "/sort/xiaomi"
        ? 4
        : this.$route.path === "/sort/huawei"
        ? 5
        : this.$route.path === "/sort/oppo"
        ? 6
        : this.$route.path === "/sort/vivo"
        ? 7
        : this.$route.path === "/sort/honour"
        ? 8
        : this.$route.path === "/sort/hongmi"
        ? 9
        : this.$route.path === "/sort/notebook"
        ? 10
        : this.$route.path === "/sort/more"
        ? 11
        : 0;
    },
    sortTabClick(index) {
      this.nowIndex = index;
      // 点击导航按钮时向swiper组件发射index
      eventBus.$emit("sortChangeTab", index);
    },
    slideTab(index) {
      this.nowIndex = index;
      let router = new VueRouter();
      let href =
        index === 0
          ? "/sort/hot"
          : index === 1
          ? "/sort/iphone"
          : index === 2
          ? "/sort/android"
          : index === 3
          ? "/sort/ipad"
          : index === 4
          ? "/sort/xiaomi"
          : index === 5
          ? "/sort/huawei"
          : index === 6
          ? "/sort/oppo"
          : index === 7
          ? "/sort/vivo"
          : index === 8
          ? "/sort/honour"
          : index === 9
          ? "/sort/hongmi"
          : index === 10
          ? "/sort/notebook"
          : index === 11
          ? "/sort/more"
          : "/sort/hot";
      // 利用路由的push方法更新路径地址
      router.push(href);
    }
  }
};
</script>

<style lang="scss" scoped>
#sortNav {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 12rem;
  background-color: #e7e7e7;
  .sortItem {
    width: 1.86rem;
    height: 1rem;
    position: relative;
    text-align: center;
    line-height: 1rem;
  }
  & > li.current {
    background-color: #fff;
    color: #fe2600;
    font-size: 0.32rem;
  }
  & > li.current::after {
    content: "";
    display: block;
    background-color: #fe2600;
    position: absolute;
    top: 0;
    left: 0;
    height: 0.07rem;
    width: 0.49rem;
    transform: rotate(-90deg) translate(-0.46rem, -0.22rem);
  }
}
</style>