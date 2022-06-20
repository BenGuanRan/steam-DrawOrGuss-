<template>
  <div id="draw_tools--container">
    <!-- 笔 -->
    <div
      class="draw_tools--pen"
      @click="changeTools({ color: '#000', width: 3 })"
    >
      🖊
    </div>
    <!-- 橡皮 -->
    <div
      class="draw_tools--eraser"
      @click="changeTools({ color: '#fdfef2', width: 10 })"
    >
      橡皮
    </div>
    <div class="draw_tools--clear" @click="clear">重置</div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { defineEmits } from "vue";
import { clearCanvas } from "@/utils/draw.js";

// 改变工具
// 告知父组件改变了工具
const emit = defineEmits(["hasChangeTools"]);
const store = useStore();
const changeTools = (config) => {
  store.commit("changeConfig", config);
  emit("hasChangeTools", config);
};
const clear = () => {
  console.log(store.state);
  clearCanvas(store.state.canvasNode);
};
</script>

<style lang='scss' scoped>
#draw_tools--container {
  display: flex;
  justify-content: space-between;
  width: 200px;
  height: 100%;
}
#draw_tools--container > div {
  cursor: pointer;
  line-height: 50px;
  text-align: center;
  width: 50px;
  height: 50px;
  background-color: pink;
}
</style>