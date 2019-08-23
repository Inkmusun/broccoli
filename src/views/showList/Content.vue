<template>
  <div class="content">
      <div>
    <div class="swiper-container" id="showSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item of compList" :key="item.id">
          <keep-alive>
            <component :is="item.component"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import eventBus from "../../util/eventBus";
import Swiper from "swiper";
import Android from "./comp/Android";
import Tj from "./comp/tj";
import Ipad from "./comp/Ipad";
import Iphone from "./comp/Iphone";
import Notebook from "./comp/Notebook";
export default {
  data() {
    return {
         compList: [
        { id: 101, path: "/showlist/tj", component: Tj },
        { id: 102, path: "/showlist/android", component: Android },
        { id: 103, path: "/showlist/ipad", component: Ipad },
        { id: 104, path: "/showlist/iphone", component: Iphone },
        { id: 105, path: "/showlist/notebook", component: Notebook }
      ]
    };
  },
  mounted() {
    var mySwiper = new Swiper("#showSwiper", {
      // 设定初始化时slide的索引
      initialSlide:
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
          : 0
    });
    mySwiper.on("slideChange", () => {
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到nav组件
      eventBus.$emit("showTab", mySwiper.activeIndex);
    });
    // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    eventBus.$on("changeShow", index => {
      // 点击导航键跳转相应内容区
      mySwiper.slideTo(index, 0, false);
    });
  },
  components:{
    Tj,
    Android,
    Ipad,
    Iphone,
    Notebook
  }
};
</script>

<style lang="scss" scoped>
.content{
  margin-top:2.71rem;
  overflow: hidden;
  z-index: -1;
}
</style>