import axios from "axios";

export default {
  state: {
    orderList: null
  },
  getters: {},
  mutations: {
    addOrderList(state, data) {
      state.orderList = data;
    }
  },
  actions: {
    addOrderList({ commit, state }, payload) {
      //   console.log(payload);
      commit("addOrderList", payload.selGoodsList);
    }
  }
};

/* 
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
 */
