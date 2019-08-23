import Vue from "vue";
import App from "./App.vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import router from "./router/index";
import store from "./store/index";
import "swiper/dist/css/swiper.css";
import "./assets/iconfont/iconfont.css";
import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'

Vue.use(MintUI)
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
