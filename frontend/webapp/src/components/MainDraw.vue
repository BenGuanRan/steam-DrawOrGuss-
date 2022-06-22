<template>
  <div id="main_draw">
    <canvas id="user_canvas" :width="w" :height="h"></canvas>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from "vue";
import { useStore } from "vuex";
import { draw, unmountedDraw } from "@/utils/draw.js";

// 将初识canvas加入vuex
const store = useStore();
onMounted(() => {
  store.state.canvasNode = document.querySelector("#user_canvas");
});
// 始终保持长宽随屏幕缩放
const w = ref(window.innerWidth);
const h = ref(window.innerHeight);
window.onresize = () => {
  h.value = window.innerHeight;
  w.value = window.innerWidth;
};
onBeforeUnmount(() => (window.onresize = null));

// 绘画逻辑
// 基础配置
onMounted(() => {
  const canvas = document.querySelector("canvas");
  draw(canvas);
});
onBeforeUnmount(() => {
  const canvas = document.querySelector("canvas");
  unmountedDraw(canvas);
});
</script>

<style lang='scss' scoped>
#main_draw {
  width: 100%;
  height: 100%;
  canvas {
    position: absolute;
    z-index: 2;
    background-color: #fdfef200;
  }
}
</style>