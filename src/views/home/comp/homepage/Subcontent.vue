<template>
  <div>
    <div class="swiper-container" id="subSwiper">
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
import Swiper from "swiper";
import eventBus from "@/util/eventBus";
import Homelow from "./Homelow";
import Homehot from "./Homehot";

export default {
  data() {
    return {
      compList: [
        { id: 501, path: "/home/homepage/low", component: Homelow },
        { id: 502, path: "/home/homepage/hot", component: Homehot }
      ]
    };
  },
  methods: {},
  mounted() {
    var mySubSwiper = new Swiper("#subSwiper", {
      // 设定初始化时slide的索引
      initialSlide:
        this.$route.path === "/home/homepage/low"
          ? 0
          : this.$route.path === "/home/homepage/hot"
          ? 1
          : 0
    });
    mySubSwiper.on("slideChange", () => {
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到nav组件
      eventBus.$emit("subSlideTab", mySubSwiper.activeIndex);
    });
    // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    eventBus.$on("subChangeTab", index => {
      // 点击导航键跳转相应内容区
      mySubSwiper.slideTo(index, 0, false);
    });
  },
  components: {
    Homelow,
    Homehot
  }
};
</script>

<style lang="scss" scoped>
</style>