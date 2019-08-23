<template>
  <div class="showList">
    <Title title="晒单"></Title>
    <Nav></Nav>
    <ShowSort :comment="comment"></ShowSort>
    <Content></Content>
  </div>
</template>

<script>
import Title from '../components/Title'
import ShowSort from '../components/ShowSort'
import Content from './showList/Content'
import Nav from './showList/Nav'
export default {
  data() {
    return {
      comment:[1000,1000,1000]
    };
  },
  components:{
    Title,
    Content,
    ShowSort,
    Nav
  }
};
</script>

<style lang="scss" scoped>
.showList{
  width:100%;
  background:#f5f5f5;
  min-height: 100vh;
}
</style>