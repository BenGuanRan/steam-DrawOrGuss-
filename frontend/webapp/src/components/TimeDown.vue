<template>
  <div id="time_down">
    <DrawTimer class="draw_timer" :width="200"></DrawTimer>
  </div>
</template>

<script setup>
import DrawTimer from "./DrawTimer.vue";
// import { reactive, ref } from "vue";

// const num = ref(0);
// const data = reactive({});
</script>

<style lang='scss' scoped>
#time_down {
  top: 0;
  background-color: #000000a3;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  .draw_timer {
    position: absolute;
    top: 35%;
    left: 45%;
  }
}
</style>