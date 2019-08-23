<template>
  <div class="clear">
    <div class="swiper-container" id="sortSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide sortCont" v-for="item of sortCompList" :key="item.id">
          <keep-alive>
            <component :is="item.component"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import eventBus from "../../util/eventBus";

import Hot from "./comp/Hot";
import Iphone from "./comp/Iphone";
import Android from "./comp/Android";
import Ipad from "./comp/Ipad";
import Xiaomi from "./comp/Xiaomi";
import Huawei from "./comp/Huawei";
import Oppo from "./comp/Oppo";
import Vivo from "./comp/Vivo";
import Honour from "./comp/Honour";
import Hongmi from "./comp/Hongmi";
import Notebook from "./comp/Notebook";
import More from "./comp/More";

export default {
  data() {
    return {
      sortCompList: [
        { id: 701, path: "/sort/hot", component: Hot },
        { id: 702, path: "/sort/iphone", component: Iphone },
        { id: 703, path: "/sort/android", component: Android },
        { id: 704, path: "/sort/ipad", component: Ipad },
        { id: 705, path: "/sort/xiaomi", component: Xiaomi },
        { id: 706, path: "/sort/huawei", component: Huawei },
        { id: 707, path: "/sort/oppo", component: Oppo },
        { id: 708, path: "/sort/vivo", component: Vivo },
        { id: 709, path: "/sort/honour", component: Honour },
        { id: 710, path: "/sort/hongmi", component: Hongmi },
        { id: 711, path: "/sort/notebook", component: Notebook },
        { id: 712, path: "/sort/more", component: More }
      ]
    };
  },
  mounted() {
    let mySwiper = new Swiper("#sortSwiper", {
      direction: "vertical",
      // 设定初始化时slide的索引
      initialSlide:
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
          : 0
    });
    mySwiper.on("slideChange", () => {
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到nav组件
      eventBus.$emit("sortSlideTab", mySwiper.activeIndex);
    });
    // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    eventBus.$on("sortChangeTab", index => {
      // 点击导航键跳转相应内容区
      mySwiper.slideTo(index, 0, false);
    });
  },
  methods: {},
  components: {
    Hot,
    Iphone,
    Android,
    Ipad,
    Xiaomi,
    Huawei,
    Oppo,
    Vivo,
    Honour,
    Hongmi,
    Notebook,
    More
  }
};
</script>

<style lang="scss" scoped>
</style>