import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "../views/Home.vue";
import Sort from "../views/Sort.vue";
import Showlist from "../views/Showlist.vue";
import Service from "../views/Service.vue";
import Personal from "../views/Personal.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Collection from "../views/Collection.vue";
import Address from "../views/Address.vue";
import Logistics from "../views/Logistics.vue";
import PersonInfo from "../views/PersonInfo.vue";
import AddAdress from "../views/AddAdress.vue";
import AddressHas from "../views/AddressHas.vue";
import Search from "../views/Search.vue";
import Findpwd from "../views/Findpwd.vue";
import GoodsList from "../views/GoodsList.vue";

// home
import Android from "../views/home/comp/Android";
import Homepage from "../views/home/comp/Homepage";
import Ipad from "../views/home/comp/Ipad";
import Iphone from "../views/home/comp/Iphone";
import Notebook from "../views/home/comp/Notebook";
import Homelow from "../views/home/comp/homepage/Homelow";
import Homehot from "../views/home/comp/homepage/Homehot";

// sort
import Hotsort from "../views/sort/comp/Hot";
import Iphonesort from "../views/sort/comp/Iphone";
import Androidsort from "../views/sort/comp/Android";
import Ipadsort from "../views/sort/comp/Ipad";
import Xiaomisort from "../views/sort/comp/Xiaomi";
import Huaweisort from "../views/sort/comp/Huawei";
import Opposort from "../views/sort/comp/Oppo";
import Vivosort from "../views/sort/comp/Vivo";
import Honoursort from "../views/sort/comp/Honour";
import Hongmisort from "../views/sort/comp/Hongmi";
import Notebooksort from "../views/sort/comp/Notebook";
import Moresort from "../views/sort/comp/More";

// goodsDetail
import GoodsDetail from "../views/GoodsDetail.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import Zhenp from "../views/goodsdetail/Quality";

// order
import GoodsOrder from "../views/GoodsOrder";
import Payresult from "../views/Payresult";

const router = new VueRouter({
  mode: "hash",
  routes: [
    //   {
    //     path: '/',           // 路径
    //     component: Music,    // 组件
    //     redirect: '/music/recommend'     // 重定向
    //     children:[]      // 子路由
    //   }
    {
      // 设置默认第一次显示的路由
      path: "/",
      component: Home,
      redirect: "/home/homepage"
    },
    {
      path: "/home",
      component: Home,
      children: [
        { path: "/home/android", component: Android },
        {
          path: "/home/homepage",
          component: Homepage,
          children: [
            { path: "/home/homepage/low", component: Homelow },
            { path: "/home/homepage/hot", component: Homehot }
          ]
        },
        { path: "/home/ipad", component: Ipad },
        { path: "/home/iphone", component: Iphone },
        { path: "/home/notebook", component: Notebook }
      ]
    },
    {
      path: "/sort",
      component: Sort,
      children: [
        { path: "/sort/hot", component: Hotsort },
        { path: "/sort/iphone", component: Iphonesort },
        { path: "/sort/android", component: Androidsort },
        { path: "/sort/ipad", component: Ipadsort },
        { path: "/sort/xiaomi", component: Xiaomisort },
        { path: "/sort/huawei", component: Huaweisort },
        { path: "/sort/oppo", component: Opposort },
        { path: "/sort/vivo", component: Vivosort },
        { path: "/sort/honour", component: Honoursort },
        { path: "/sort/hongmi", component: Hongmisort },
        { path: "/sort/notebook", component: Notebooksort },
        { path: "/sort/more", component: Moresort }
      ]
    },
    {
      path: "/showlist",
      component: Showlist
    },
    {
      path: "/service",
      component: Service
    },
    {
      path: "/personal",
      component: Personal
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/register",
      component: Register
    },
    {
      path: "/collection",
      component: Collection
    },
    {
      path: "/address",
      component: Address
    },
    {
      path: "/logistics",
      component: Logistics
    },
    {
      path: "/personInfo",
      component: PersonInfo
    },
    {
      path: "/addAdress/:status/:addId",
      component: AddAdress
    },
    {
      path: "/addressHas",
      component: AddressHas
    },
    {
      path: "/search",
      component: Search
    },
    {
      path: "/findpwd",
      component: Findpwd
    },
    {
      path: "/goodslist/:goodId/:goodName",
      component: GoodsList
    },
    {
      path: "/goodsdetail/:goodsId",
      component: GoodsDetail
    },
    {
      path: "/zhenp",
      component: Zhenp
    },
    {
      path: "/shoppingcart",
      component: ShoppingCart
    },
    {
      path: "/goodsorder/:total",
      component: GoodsOrder
    },
    {
      path: "/payresult",
      component: Payresult
    }
  ]
});

export default router;
