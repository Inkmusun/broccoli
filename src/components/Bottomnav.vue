<template>
  <div>
    <ul>
      <router-link to="/home" tag="li" activeClass="active">
        <div>
          <i class="iconfont">&#xe6b8;</i>
          <p>首页</p>
        </div>
      </router-link>
      <router-link to="/sort" tag="li" activeClass="active">
        <div>
          <i class="iconfont">&#xe729;</i>
          <p>分类</p>
        </div>
      </router-link>
      <router-link to="/showlist" tag="li" activeClass="active">
        <div>
          <i class="iconfont">&#xe665;</i>
          <p>晒单</p>
        </div>
      </router-link>
      <router-link to="/service" tag="li" activeClass="active">
        <div>
          <i class="iconfont">&#xe6ff;</i>
          <p>客服</p>
        </div>
      </router-link>
      <router-link to="/personal" tag="li" activeClass="active">
        <div>
          <i class="iconfont">&#xe78b;</i>
          <p>个人</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  ul {
    border-top: 1px solid #e0e0e0;
    list-style-type: none;
    padding: 0;
    font-size: 0.28rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    height: 1rem;
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-around;
    li {
      padding-top: 0.12rem;
      font-family: "KaiTi";
      p {
        height: 0.4rem;
        font-size: 0.2rem;
        margin-top: 0.05rem;
      }
    }
    .active {
      color: #ff4828 !important;
    }
  }
}
</style>