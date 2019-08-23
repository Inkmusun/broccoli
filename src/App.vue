<template>
  <div id="app">
    <router-view></router-view>
    <Bottomnav />
  </div>
</template>

<script>
import Bottomnav from "./components/Bottomnav";
export default {
  name: "app",
  components: {
    Bottomnav
  }
};
</script>

<style>
</style>
