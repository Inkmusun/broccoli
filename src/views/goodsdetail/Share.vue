<template>
  <div v-show="isShare" class="detailShadow">
    <div class="shareBottom">
      <ul>
        <li>
          <img :src="sharePicList.wx1" alt />
          <p>微信朋友圈</p>
        </li>
        <li>
          <img :src="sharePicList.wx2" alt />
          <p>微信好友</p>
        </li>
        <li>
          <img :src="sharePicList.qq1" alt />
          <p>QQ</p>
        </li>
        <li>
          <img :src="sharePicList.qq2" alt />
          <p>QQ空间</p>
        </li>
        <li>
          <img :src="sharePicList.copy" alt />
          <p>复制口令</p>
        </li>
      </ul>
      <p @click="cancelBtn">取消</p>
    </div>
  </div>
</template>

<script>
import eventBus from "../../util/eventBus";

export default {
  data() {
    return {
      isShare: false,
      sharePicList: {
        wx1: "./images/share_friends.png",
        wx2: "./images/share_wechat.png",
        qq1: "./images/share_qq.png",
        qq2: "./images/share_qqzone.png",
        copy: "./images/share_shibboleth.png"
      }
    };
  },
  methods: {
    cancelBtn() {
      eventBus.$emit("cancelShare");
    }
  }
};
</script>

<style lang="scss" scoped>
.detailShadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.5);
  & > .shareBottom {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    & > ul {
      display: flex;
      & > li {
        flex: 1;
        padding: 0.4rem 0.1rem;
        text-align: center;
        background-color: #eee;
        font-size: 0.2rem;
        & > img {
          width: 0.7rem;
          margin-bottom: 0.1rem;
        }
      }
    }
    & > p {
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.3rem;
    }
  }
}
</style>