<template>
  <div id="draw_tools--container">
    <!-- 笔 -->
    <div
      class="draw_tools--pen"
      @click="changeTools({ color: '#000', width: 3 }, 'pen')"
    ></div>
    <!-- 橡皮 -->
    <div
      class="draw_tools--eraser"
      @click="changeTools({ color: '#fdfef2', width: 10 }, 'eraser')"
    ></div>
    <div class="draw_tools--clear" @click="clear"></div>
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
const changeTools = (config, tool) => {
  if (tool === "pen") store.state.canvasNode.style.cursor = "crosshair";
  if (tool === "eraser") store.state.canvasNode.style.cursor = "grab";
  store.commit("changeConfig", config);
  emit("hasChangeTools", config);
  // console.log(store.state.canvasNode.toDataURL());
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
  .draw_tools--eraser {
    background-image: url(../assets/images/eraser.png);
    background-repeat: no-repeat;
  }
  .draw_tools--pen {
    background-image: url(../assets/images/pen.png);
    background-repeat: no-repeat;
  }
  .draw_tools--clear {
    background-image: url(../assets/images/clear.png);
    background-repeat: no-repeat;
  }
}
#draw_tools--container > div {
  z-index: 3;
  cursor: pointer;
  line-height: 50px;
  text-align: center;
  width: 50px;
  height: 50px;
}
</style>