<template>
  <div class="thirdLogin">
      <div class="box">
          <div class="font">第三方登录</div>
          <div class="img">
              <img src="../assets/images/person-wx.jpg" alt="">
              <img src="../assets/images/person-zf.jpg" alt="">
              <img src="../assets/images/person-qq.jpg" alt="">
          </div>
      </div>
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
.thirdLogin{
    .box{
        width:6.85rem;
        border-top:0.02rem solid #c0c0c0;
        margin:0 auto;
        margin-top:0.95rem;
        position: relative;
        .font{
            width: 2.25rem;
            padding:0 0.5rem;
            position: absolute;
            top:-0.15rem;
            left: 2.3rem;
            background: white;
            font-size: 0.24rem;
            color:#c0c0c0;
        }
        .img{
            display: flex;
            justify-content: space-between;
            width:4.57rem;
            margin:0 auto;
            margin-top:0.44rem;
        }
    }
}
</style>