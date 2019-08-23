<template>
  <div class="GoodsList clear">
    <div class="goodTop">
      <div class="icon" @click="isreturn"></div>
      <div class="search" @click="search">
        <i class="iconfont icon2">&#xe65c;</i>
        <div class="box">{{msg}}&ensp;&ensp;X</div>
      </div>
    </div>
    <div class="sortList">
      <div class="sort1">
        <div sytle="position:relative;" class="common price" @click="active('price')">价格</div>
        <div class="common model" @click="active('model')">机型</div>
        <div class="common">
          <i class="iconfont line" v-html="filtericon" @click="active('line')"></i>
        </div>
        <div class="common" @click="filter">
          筛选
          <img :src="filtersrc" alt class="fimg" />
        </div>
      </div>
      <ul class="sort2">
        <li @click="active('low')" class="low">同类最低价</li>
        <li @click="active('newlow')" class="newlow">最新降价</li>
        <li @click="active('quan')" class="quan">领券</li>
        <li @click="active('actives')" class="actives">活动中</li>
      </ul>
    </div>

    <!-- 商品列表 -->
    <div class="one" v-show="lineflag">
      <ul>
        <router-link
          tag="li"
          :to="`/goodsdetail/${item.goodsId}`"
          v-for="item of goodslist"
          :key="item.goodsId"
        >
          <div class="pic">
            <img :src="item.goodsPhoto" />
          </div>
          <div class="goodbox">
            <div class="goodsDesc">{{item.goodsDesc}}</div>
            <div class="goodsCore">{{item.goodsCore}}</div>
            <div class="goodsIsActivity">
              <div v-show="item.goodsIsLowestPrice">同类最低价</div>
              <div
                v-show="item.goodsIsNewDiscount"
                style="color:#ffa45d;border:0.02rem solid #ffa45d;"
              >最新降价</div>
              <div
                v-show="item.goodsIsCountTag"
                style="color:#ffa45d;border:0.02rem solid #ffa45d;"
              >领券</div>
              <div v-show="item.goodsIsActivity">活动中</div>
            </div>
            <div class="nowprice">
              <span class="goodsPrice">￥{{item.goodsPrice}}</span>
              <span class="goodsDiscountPrice">￥{{item.goodsDiscountPrice}}</span>
            </div>
          </div>
        </router-link>
        <!-- <li v-for="item of goodslist" :key="item.goodsId">
           <div class="pic">
             <img :src="item.goodsPhoto">
           </div>
           <div class="goodbox">
            <div class="goodsDesc">{{item.goodsDesc}}</div>
            <div class="goodsCore">{{item.goodsCore}}</div>
            <div class="goodsIsActivity">
              <div v-show="item.goodsIsLowestPrice">同类最低价</div>
              <div v-show="item.goodsIsNewDiscount" style="color:#ffa45d;border:0.02rem solid #ffa45d;">最新降价</div>
              <div v-show="item.goodsIsCountTag" style="color:#ffa45d;border:0.02rem solid #ffa45d;">领券</div>
              <div v-show="item.goodsIsActivity">活动中</div>
            </div>
            <div class="nowprice">
              <span class="goodsPrice">￥{{item.goodsPrice}}</span>
              <span class="goodsDiscountPrice">￥{{item.goodsDiscountPrice}}</span>
            </div>
           </div>
        </li>-->
      </ul>
    </div>

    <div class="two" v-show="!lineflag">
      <ul>
        <router-link
          tag="li"
          :to="`/goodsdetail/${item.goodsId}`"
          v-for="item of goodslist"
          :key="item.goodsId"
        >
          <div class="pic">
            <img :src="item.goodsPhoto" />
          </div>
          <div class="goodbox">
            <div class="goodsDesc">{{item.goodsDesc}}</div>
            <div class="goodsCore">{{item.goodsCore}}</div>
            <div class="goodsIsActivity">
              <div v-show="item.goodsIsLowestPrice==1?true:false">同类最低价</div>
              <div
                v-show="item.goodsIsNewDiscount==1?true:false"
                style="color:#ffa45d;border:0.02rem solid #ffa45d;"
              >最新降价</div>
              <div
                v-show="item.goodsIsCountTag==1?true:false"
                style="color:#ffa45d;border:0.02rem solid #ffa45d;"
              >领券</div>
              <div v-show="item.goodsIsActivity==1?true:false">活动中</div>
            </div>
            <div class="nowprice">
              <span class="goodsPrice">￥{{item.goodsPrice}}</span>
              <span class="goodsDiscountPrice">￥{{item.goodsDiscountPrice}}</span>
            </div>
          </div>
        </router-link>
        <!-- <li v-for="item of goodslist" :key="item.goodsId">
         <div class="pic">
             <img :src="item.goodsPhoto">
           </div>
           <div class="goodbox">
            <div class="goodsDesc">{{item.goodsDesc}}</div>
            <div class="goodsCore">{{item.goodsCore}}</div>
            <div class="goodsIsActivity">
              <div v-show="item.goodsIsLowestPrice==1?true:false">同类最低价</div>
              <div v-show="item.goodsIsNewDiscount==1?true:false" style="color:#ffa45d;border:0.02rem solid #ffa45d;">最新降价</div>
              <div v-show="item.goodsIsCountTag==1?true:false" style="color:#ffa45d;border:0.02rem solid #ffa45d;">领券</div>
              <div v-show="item.goodsIsActivity==1?true:false">活动中</div>
            </div>
            <div class="nowprice">
              <span class="goodsPrice">￥{{item.goodsPrice}}</span>
              <span class="goodsDiscountPrice">￥{{item.goodsDiscountPrice}}</span>
            </div>
           </div>
        </li>-->
      </ul>
    </div>
    <!-- 遮盖层 -->
    <transition name="fade">
      <div class="shadow" v-show="show" :class="shadowShow?'active':''">
        <div class="back">
          <div class="pricesort">
            <span class="titleprice">价格区间</span>
            <ul>
              <li
                @click="changeprice(item,index)"
                v-for="(item,index) of price"
                :key="item.id"
                class="priceli"
              >{{item.value}}</li>
            </ul>
            <div class="priceinp">
              <input type="number" v-model="minvalue" @change="inputprice(0)" />
              <div class="line"></div>
              <input type="number" v-model="maxvalue" @change="inputprice(1)" />
            </div>
          </div>

          <div class="edition pricesort">
            <span class="titleprice">版本</span>
            <ul>
              <li style="background:red;color:white;border:none">国行</li>
            </ul>
          </div>

          <div class="color pricesort">
            <span class="titleprice">颜色</span>
            <ul>
              <li
                @click="changecolor(item,index)"
                v-for="(item,index) of color"
                :key="item.id"
                class="colorli"
              >{{item}}</li>
            </ul>
          </div>

          <div class="memory pricesort">
            <span class="titleprice">内存</span>
            <ul>
              <li class="sizeli" @click="changesize(0)">4G+64G</li>
              <li class="sizeli" @click="changesize(1)">4G+128G</li>
            </ul>
          </div>

          <div class="button">
            <div class="button1" @click="cancel">取消</div>
            <div class="button2" @click="confirm(2)">确认</div>
          </div>
        </div>
        <div class="filtertip" v-show="confirmflag">筛选信息不完整</div>
      </div>
    </transition>

    <!-- 遮盖层2 -->
    <transition name="fade">
      <div class="modelshadow shadow" v-show="modelshow" :class="shadowShow?'active':''">
        <div class="back">
          <div class="filtermodel">
            <div class="title">请筛选机型</div>
            <ul>
              <li
                v-for="(item,index) of goodstypenamelist"
                :key="index"
                class="typename"
                @click="typename(item,index)"
              >{{item}}</li>
            </ul>
          </div>
          <div class="button">
            <div class="button1" @click="cancel2">取消</div>
            <div class="button2" @click="confirm(1)">确认</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      msg: "",
      shangsrc: "./images/shang.jpg",
      xiasrc: "./images/xia.jpg",
      filtersrc: "/images/filter.jpg",
      filtericon: "&#xe729;",
      show: false,
      backshow: false,
      shadowShow: false,
      modelshow: false,
      lineflag: false,
      LowestPriceflag: false,
      NewDiscountfalg: false,
      CountTagflag: false,
      Activityflag: false,
      price: [
        { id: 0, value: "0-1499" },
        { id: 1, value: "1500-1999" },
        { id: 2, value: "2000-2999" },
        { id: 3, value: "3000-4000" },
        { id: 4, value: "4000以上" }
      ],
      color: [],
      pregoodslist: [],
      goodslist: [],
      nowgoodslist: [],
      option: "0",
      goodstypenamelist: [],
      typenamenow: "",
      minprice: "",
      maxprice: "",
      goodsColor: "",
      goodsMemory: "",
      minvalue: "",
      maxvalue: "",
      confirmflag: false
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    inputprice(index) {
      if (index == 0) {
        if (this.minvalue) {
          this.minprice = this.minvalue;
          if (!this.maxvalue) {
            this.maxvalue = 99999;
          }
        }
      } else {
        if (this.maxvalue) {
          this.maxprice = this.maxvalue;
          if (!this.minvalue) {
            this.minvalue = 0;
          }
        }
      }
      $(".priceli").css({
        border: "0.02rem solid #6d6d6d",
        color: "#6f6f6f",
        background: "white"
      });
    },
    typename(item, index) {
      $(".typename").css({ color: "black", background: "#f5f5f5" });
      $(".typename")
        .eq(index)
        .css({ background: "white", color: "red" });
      this.typenamenow = item;
    },
    confirm(index) {
      if (index == 1) {
        this.goodslist = this.pregoodslist.filter(ele => {
          return ele.goodsTypeName == this.typenamenow;
        });
        this.modelshow = false;
      } else {
        if (this.msg && this.maxprice && this.goodsColor && this.goodsMemory) {
          axios
            .create({
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8"
              }
            })
            .post("/MobilePlatform/preciseScreen", {
              goodsDesc: this.msg,
              minPrice: this.minprice,
              maxPrice: this.maxprice,
              goodsColor: this.goodsColor,
              goodsMemory: this.goodsMemory
            })
            .then(res => {
              if (res.data.code == "1") {
                this.goodslist = res.data.data;
              }
            });
          this.cancel();
        } else {
          this.confirmflag = true;
          setTimeout(() => {
            this.confirmflag = false;
          }, 2000);
        }
      }
    },
    getdata() {
      this.msg = this.$route.params.goodName;
      axios
        .create({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        })
        .post("MobilePlatform/pricesort", {
          goodsDesc: this.msg,
          option: this.option
        })
        .then(res => {
          if ((res.data.code = "1")) {
            this.goodslist = res.data.data;
            this.pregoodslist = res.data.data;
            this.goodslist.forEach(item => {
              if (this.goodstypenamelist.indexOf(item.goodsTypeName) == -1) {
                this.goodstypenamelist.push(item.goodsTypeName);
              }
              if (this.color.indexOf(item.goodsColor) == -1) {
                this.color.push(item.goodsColor);
              }
            });
          }
        });
    },
    filterActive() {
      if (
        !this.NewDiscountfalg &&
        !this.CountTagflag &&
        !this.Activityflag &&
        !this.LowestPriceflag
      ) {
        this.goodslist = this.pregoodslist;
      } else {
        axios
          .create({
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          })
          .post("/MobilePlatform/tagScreenGoods", {
            goodsDesc: this.msg,
            goodsIsNewDiscount: this.NewDiscountfalg ? "1" : "0",
            goodsIsCountTag: this.CountTagflag ? "1" : "0",
            goodsIsActivity: this.Activityflag ? "1" : "0",
            goodsIsLowestPrice: this.LowestPriceflag ? "1" : "0"
          })
          .then(res => {
            console.log(
              this.msg,
              this.NewDiscountfalg,
              this.CountTagflag,
              this.LowestPriceflag,
              this.Activityflag
            );
            console.log(res);
            if (res.data.code == "1") {
              this.goodslist = res.data.data;
            }
          });
      }
    },
    changeprice(item, index) {
      $(".priceli").css({
        border: "0.02rem solid #6d6d6d",
        color: "#6f6f6f",
        background: "white"
      });
      $(".priceli")
        .eq(index)
        .css({ background: "red", color: "white", border: "none" });
      if (item.id == 0) {
        this.minprice = 0;
        this.maxprice = 1499;
      } else if (item.id == 1) {
        this.minprice = 1500;
        this.maxprice = 1999;
      } else if (item.id == 2) {
        this.minprice = 2000;
        this.maxprice = 2999;
      } else if (item.id == 3) {
        this.minprice = 3000;
        this.maxprice = 4000;
      } else if (item.id == 4) {
        this.minprice = 4000;
        this.maxprice = 99999;
      }
      // console.log(this.minprice,this.maxprice)
    },
    changecolor(item, index) {
      $(".colorli").css({
        border: "0.02rem solid #6d6d6d",
        color: "#6f6f6f",
        background: "white"
      });
      $(".colorli")
        .eq(index)
        .css({ background: "red", color: "white", border: "none" });
      this.goodsColor = item;
      // console.log(this.goodsColor)
    },
    changesize(index) {
      $(".sizeli").css({
        border: "0.02rem solid #6d6d6d",
        color: "#6f6f6f",
        background: "white"
      });
      $(".sizeli")
        .eq(index)
        .css({ background: "red", color: "white", border: "none" });
      if (index == 0) {
        this.goodsMemory = "4G+64G";
      } else {
        this.goodsMemory = "4G+128G";
      }
      // console.log(this.goodsMemory)
    },
    active(a) {
      switch (a) {
        case "price":
          console.log($(".price").css("color"));
          if ($(".price").css("color") == "rgb(0, 0, 0)") {
            $(".price").css("color", "#fe4212");
            this.option = "1";
            this.getdata();
          } else {
            $(".price").css("color", "#000000");
            this.option = "0";
            this.getdata();
          }
          break;
        case "model":
          $(".model").css("color", "#fe4212");
          this.modelshow = true;
          setTimeout(() => {
            this.shadowShow = true;
          }, 290);
          break;
        case "line":
          this.filtericon =
            this.filtericon == "&#xe7f8;" ? "&#xe729;" : "&#xe7f8;";
          this.lineflag = this.lineflag ? false : true;
          break;
        case "low":
          //   console.log($(".low").css("color"))
          if ($(".low").css("color") == "rgb(235, 45, 13)") {
            $(".low").css({ color: "white", background: "red" });
            this.LowestPriceflag = true;
          } else {
            $(".low").css({ color: "#eb2d0d", background: "#fef4f3" });
            this.LowestPriceflag = false;
          }
          this.filterActive();
          break;
        case "newlow":
          if ($(".newlow").css("color") == "rgb(235, 45, 13)") {
            $(".newlow").css({ color: "white", background: "red" });
            this.NewDiscountfalg = true;
          } else {
            $(".newlow").css({ color: "#eb2d0d", background: "#fef4f3" });
            this.NewDiscountfalg = false;
          }
          this.filterActive();
          break;
        case "quan":
          if ($(".quan").css("color") == "rgb(235, 45, 13)") {
            $(".quan").css({ color: "white", background: "red" });
            this.CountTagflag = true;
          } else {
            $(".quan").css({ color: "#eb2d0d", background: "#fef4f3" });
            this.CountTagflag = false;
          }
          this.filterActive();
          break;
        case "actives":
          if ($(".actives").css("color") == "rgb(235, 45, 13)") {
            $(".actives").css({ color: "white", background: "red" });
            this.Activityflag = true;
          } else {
            $(".actives").css({ color: "#eb2d0d", background: "#fef4f3" });
            this.Activityflag = false;
          }
          this.filterActive();
          break;
      }
    },
    filter() {
      this.show = true;
      setTimeout(() => {
        this.shadowShow = true;
      }, 290);
    },
    cancel() {
      this.show = false;
      this.shadowShow = false;
    },
    cancel2() {
      this.modelshow = false;
    },
    isreturn() {
      this.$router.go(-1);
    },
    search() {
      this.$router.push({
        path: "/search"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.GoodsList {
  z-index: 9999;
  position: relative;
  background: #f5f5f5;
  min-height: 100vh;
  .goodTop {
    width: 100%;
    height: 1.04rem;
    border-bottom: #d4d4d4 solid 0.02rem;
    background: white;
    position: fixed;
    top: 0;
    overflow: hidden;
    .icon {
      width: 0.3rem;
      height: 0.3rem;
      border-left: 0.04rem solid #595959;
      border-bottom: 0.04rem solid #595959;
      transform: rotate(45deg);
      float: left;
      margin-top: 0.38rem;
      margin-left: 0.34rem;
    }
    .search {
      width: 6.15rem;
      height: 0.66rem;
      border-radius: 0.27rem;
      background: #f7f7f7;
      float: left;
      margin-top: 0.2rem;
      margin-left: 0.4rem;
      line-height: 0.66rem;
      .box {
        width: 1.96rem;
        height: 0.43rem;
        border-radius: 0.17rem;
        background: #b0b0b0;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        line-height: 0.43rem;
        color: white;
      }
      .icon2 {
        vertical-align: middle;
        margin-left: 0.2rem;
        margin-right: 0.27rem;
        color: #b0b0b0;
      }
    }
  }
  .sortList {
    width: 100%;
    height: 1.66rem;
    overflow: hidden;
    background: white;
    position: fixed;
    top: 1.04rem;
    .sort1 {
      display: flex;
      justify-content: space-around;
      height: 0.7rem;
      width: 100%;
      font-size: 0.32rem;
      padding-top: 0.3rem;
      img {
        vertical-align: middle;
      }
      .simg {
        position: absolute;
        top: 1.45rem;
        left: 1.35rem;
      }
      .ximg {
        position: absolute;
        top: 1.58rem;
        left: 1.35rem;
      }
      .fimg {
        margin-left: 0.1rem;
      }
    }
    .sort2 {
      display: flex;
      justify-content: space-around;
      height: 1rem;
      line-height: 0.9rem;
      border-bottom: 0.02rem solid #ededed;
      li {
        width: 1.66rem;
        height: 0.6rem;
        line-height: 0.6rem;
        background: #fef4f3;
        color: #eb2d0d;
        border-radius: 0.25rem;
        text-align: center;
        margin-top: 0.17rem;
        display: inline-block;
      }
    }
  }
}
.common {
  width: 1.66rem;
  text-align: center;
}
.shadow {
  width: 100%;
  height: 100vh;
  background: rgba($color: white, $alpha: 0);
  position: fixed;
  top: 0;
  overflow: hidden;
  .back {
    position: absolute;
    width: 6.1rem;
    right: 0;
    background-color: #fff;
    height: 100vh;
    .pricesort {
      font-size: 0.32rem;
      margin-top: 0.3rem;
      .titleprice {
        margin: 0.2rem 0.3rem;
      }
      .priceinp {
        margin-top: 0.6rem;
        border-top: 0.02rem solid #ededed;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.34rem;
        input {
          width: 2rem;
          height: 0.7rem;
          border: 0.02rem solid #ededed;
          border-radius: 0.03rem;
          font-size: 0.24rem;
          padding-left: 0.2rem;
        }
        .line {
          width: 0.4rem;
          border-bottom: 0.02rem solid black;
          margin: 0 0.2rem;
        }
      }
      ul {
        overflow: hidden;
        li {
          float: left;
          width: 1.8rem;
          height: 0.7rem;
          border-radius: 0.08rem;
          border: 0.02rem solid #6d6d6d;
          text-align: center;
          line-height: 0.7rem;
          font-size: 0.24rem;
          color: #6f6f6f;
          margin-left: 0.2rem;
          margin-top: 0.2rem;
        }
      }
    }
    .button {
      height: 1rem;
      .button1 {
        border-top: 0.02rem solid #e5e5e5;
        text-align: center;
        line-height: 0.98rem;
        position: fixed;
        bottom: 0;
        left: 1.4rem;
        width: 2.5rem;
        color: #8d8d8d;
      }
      .button2 {
        width: 3.6rem;
        background: #ff4312;
        text-align: center;
        line-height: 1rem;
        position: fixed;
        bottom: 0;
        right: 0;
        color: white;
      }
    }
  }
}
.modelshadow {
  .filtermodel {
    .title {
      height: 1.18rem;
      line-height: 1.18rem;
      padding-left: 0.36rem;
      border-bottom: 0.02rem solid #ececec;
      font-size: 0.3rem;
    }
  }
}

.active {
  background: rgba($color: #565555, $alpha: 0.6);
}
.fade-enter-active,
.fade-leave-active {
  animation: bounce-in 0.3s linear;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  animation: bounce-in2 0.3s linear;
}
@keyframes bounce-in {
  0% {
    left: 6.1rem;
  }
  100% {
    left: 0;
  }
}
@keyframes bounce-in2 {
  0% {
    left: 0;
  }
  100% {
    left: 6.1rem;
  }
}
.one {
  margin-top: 2.7rem;
  z-index: -1;
  li {
    padding-top: 0.43rem;
    padding-right: 0.13rem;
    overflow: hidden;
    background: white;
    .pic {
      width: 2.7rem;
      padding-right: 0.62rem;
      float: left;
    }
    .goodbox {
      float: right;
      border-bottom: 0.02rem solid #eeeeee;
      height: 2.6rem;
      width: 4.67rem;
      .goodsIsActivity {
        margin-top: 0.65rem;
        margin-bottom: 0.12rem;
        div {
          display: inline-block;
          padding: 0.04rem 0.1rem;
          border: 0.02rem solid #ff583d;
          border-radius: 0.08rem;
          margin-right: 0.1rem;
          color: #ff583d;
          font-size: 0.2rem;
        }
      }
      .goodsDesc {
        font-size: 0.3rem;
        color: #8b8b8b;
      }
      .goodsCore {
        font-size: 0.22rem;
        color: #646464;
        background: #f7f7f7;
        padding: 0.05rem;
        display: inline-block;
        margin-top: 0.1rem;
        color: #575757;
      }
      .nowprice {
        .goodsPrice {
          font-size: 0.32rem;
          color: #eb2d0d;
        }
        .goodsDiscountPrice {
          font-size: 0.2rem;
          color: #8a8a8a;
          text-decoration: line-through;
          margin-left: 0.1rem;
        }
      }
    }
  }
}
.two {
  padding: 0 0.25rem;
  background: #f5f5f5;
  padding-top: 0.02rem;
  margin-top: 2.7rem;
  z-index: 99;
  ul {
    li:nth-child(2n) {
      margin-left: 0.08rem;
    }
    li {
      width: 3.45rem;
      background: white;
      padding: 0.16rem;
      font-size: 0.26rem;
      margin-bottom: 0.2rem;
      border-radius: 0.15rem;
      float: left;
      .pic {
        text-align: center;
      }
      .goodbox {
        .goodsCore {
          font-size: 0.2rem;
          color: #8c8c8c;
          margin-top: 0.2rem;
          margin-bottom: 0.18rem;
        }
        .goodsIsActivity {
          height: 0.76rem;
          div {
            display: inline-block;
            padding: 0.04rem 0.1rem;
            border: 0.02rem solid #ff583d;
            border-radius: 0.08rem;
            margin-right: 0.1rem;
            color: #ff583d;
            font-size: 0.16rem;
          }
        }
        .nowprice {
          .goodsPrice {
            font-size: 0.32rem;
            color: #eb2d0d;
          }
          .goodsDiscountPrice {
            font-size: 0.2rem;
            color: #8a8a8a;
            text-decoration: line-through;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
}
.goodsDesc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.typename {
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.24rem;
  background: #f5f5f5;
  border-bottom: 0.02rem solid #ededed;
  padding-left: 0.36rem;
}
.filtertip {
  position: fixed;
  top: 9.9rem;
  width: 3rem;
  height: 0.8rem;
  background: rgba($color: #6e6d6d, $alpha: 0.8);
  z-index: 999;
  border-radius: 0.1rem;
  text-align: center;
  line-height: 0.8rem;
  color: white;
  letter-spacing: 0.01rem;
  left: 2.25rem;
}
.pic {
  img {
    width: 2.4rem;
    height: 2.36rem;
  }
}
</style>