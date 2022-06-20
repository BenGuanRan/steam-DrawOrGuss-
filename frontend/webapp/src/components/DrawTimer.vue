<template>
  <div id="draw_timer">
    <el-progress type="circle" :width="50" :stroke-width="3" :percentage="time" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const time = ref(60);
</script>

<style lang='scss' scoped>
#draw_timer {
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  display: inline-block;
  width: 50px;
  height: 50px;
}
.el-progress {
  width: 50px;
  height: 50px;
}
</style>