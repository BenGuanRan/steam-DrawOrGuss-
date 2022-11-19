<template>
  <div id="has_drawed">
    <el-card>
      <h1>~等待其他玩家~</h1>
      <div class="hourglass"></div>
      <div class="count">{{ props.counts }}/{{ props.sumCounts }}</div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  counts: {
    type: Number,
  },
  sumCounts: {
    type: Number,
  },
});
</script>

<style lang='scss' scoped>
#has_drawed {
  top: 0;
  background-color: #000000a3;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  .el-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background-color: #fdfef2;
  }
  h1 {
    text-align: center;
    margin-top: 40px;
  }
  .hourglass {
    margin: 30px auto;
    height: 150px;
    width: 150px;
    background-image: url(../assets/images/hourglass.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .count {
    text-align: center;
    font-size: 30px;
  }
}
</style>