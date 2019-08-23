<template>
  <div class="login">
    <Top title="登录" subtitle="注册"></Top>
    <logo></logo>
    <LoginContent></LoginContent>
    <ThirdLogin></ThirdLogin>
    <div class="font2">
        登录代表你已同意<span style="color:#ff2600;">《找靓机隐私政策》</span>
    </div>
  </div>
</template>

<script>
import Top from '../components/Top'
import logo from '../components/logo'
import LoginContent from '../components/LoginContent'
import ThirdLogin from '../components/ThirdLogin'
export default {
  data() {
    return {};
  },
  components:{
    Top,
    logo,
    LoginContent,
    ThirdLogin
  }
};
</script>

<style lang="scss" scoped>
.login{
  z-index: 9999;
  position: relative;
  height: 100vh;
  background: white;
}
.font2{
            margin:0 auto;
            text-align: center;
            font-size: 0.24rem;
            color:#c0c0c0;
            margin-top:0.38rem;
        }
</style>