<template>
  <div @click="selectClick">
    <div v-if="selectChecked">
      <i class="iconfont selIcon">&#xe614;</i>
    </div>
    <div id="selectEmpty" v-else></div>
  </div>
</template>

<script>
import eventBus from "../../util/eventBus";

export default {
  props: ["selChecked"],
  data() {
    return {
      selectChecked: null
    };
  },
  mounted() {
    this.selectChecked = this.selChecked;
    eventBus.$on("allSel", item => (this.selectChecked = item));
  },
  methods: {
    selectClick() {
      this.selectChecked = !this.selectChecked;
      this.$emit("click", { isChecked: this.selectChecked });
    }
  }
};
</script>

<style lang="scss" scoped>
#selectEmpty {
  border: 0.01rem solid #a7a7a7;
  width: 0.4rem;
  height: 0.41rem;
  border-radius: 50%;
}
.selIcon {
  color: #ff2600 !important;
}
</style>