<template>
  <div class="login">
    <Top title="注册" subtitle="登录"></Top>
    <logo></logo>
    <RegisterContent num=1></RegisterContent>
    <ThirdLogin></ThirdLogin>
  </div>
</template>

<script>
import Top from '../components/Top'
import logo from '../components/logo'
import RegisterContent from '../components/RegisterContent'
import ThirdLogin from '../components/ThirdLogin'
export default {
  data() {
    return {};
  },
  components:{
    Top,
    logo,
    RegisterContent,
    ThirdLogin
  }
};
</script>

<style lang="scss" scoped>
.login{
  z-index: 9999;
  position: relative;
  background: white;
  height: 100vh;
}
</style>