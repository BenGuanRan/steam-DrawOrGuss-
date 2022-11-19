<template>
  <div id="main_guss">
    <img :src="props.base64" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  base64: {
    type: String,
  },
});
</script>

<style lang='scss' scoped>
#main_guss {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #fdfef2;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>