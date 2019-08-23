import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import LxModule from "./lx";
import SxgModule from "./sxg";

Vue.use(Vuex);

// 全局变量 通过this.$store 获取
const store = new Vuex.Store({
  // 全局数据模型 state
  state: {},
  // getters 计算属性
  getters: {},
  // 突变
  mutations: {
    // addRecommend(state, data) {
    //     state.recommendData = data;
    // },
  },
  // action 提交 突变
  actions: {
    // getRecommend({ commit, state }, payload) {
    //     return new Promise(function (resolve, reject) {
    //         axios.get("/music/recommend").then(result => {
    //             // state.recommendData = result.data.data.data;
    //             if (result.data.status == 3000) {
    //                 commit('addRecommend', result.data.data);
    //                 resolve();
    //             } else {
    //                 alert(result.data.msg);
    //             }
    //         });
    //     });
    // },
  },
  modules: {
    // 拆分store
    // product: ProductModule,
    // order: OrderModule,
    lx: LxModule,
    sxg: SxgModule
  }
});

export default store;
