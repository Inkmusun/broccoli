<template>
  <div class="clear">
    <div class="swiper-container" id="maxSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item of compList" :key="item.id">
          <keep-alive>
            <component :is="item.component"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "../../util/eventBus";
import Swiper from "swiper";
import Android from "./comp/Android";
import Homepage from "./comp/Homepage";
import Ipad from "./comp/Ipad";
import Iphone from "./comp/Iphone";
import Notebook from "./comp/Notebook";

export default {
  data() {
    return {
      compList: [
        { id: 101, path: "/home/homepage", component: Homepage },
        { id: 102, path: "/home/iphone", component: Iphone },
        { id: 103, path: "/home/android", component: Android },
        { id: 104, path: "/home/notebook", component: Notebook },
        { id: 105, path: "/home/ipad", component: Ipad }
      ]
    };
  },
  mounted() {
    var mySwiper = new Swiper("#maxSwiper", {
      // 设定初始化时slide的索引
      initialSlide:
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
          : 0
    });
    mySwiper.on("slideChange", () => {
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到nav组件
      eventBus.$emit("slideTab", mySwiper.activeIndex);
    });
    // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    eventBus.$on("changeTab", index => {
      // 点击导航键跳转相应内容区
      mySwiper.slideTo(index, 0, false);
    });
  },
  components: {
    Homepage,
    Android,
    Ipad,
    Iphone,
    Notebook
  }
};
</script>

<style lang="scss" scoped>
.clear {
  margin-top: 1.83rem;
}
</style>