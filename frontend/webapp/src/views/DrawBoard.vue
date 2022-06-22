<template>
  <div id="draw_board">
    <DrawHeader class="draw_header"></DrawHeader>
    <MainDraw></MainDraw>
    <DrawFooter></DrawFooter>
  </div>
</template>

<script setup>
import MainDraw from "@/components/MainDraw.vue";
import DrawHeader from "../components/DrawHeader.vue";
import DrawFooter from "../components/DrawFooter.vue";
</script>

<style lang='scss' scoped>
#draw_board {
  position: relative;
  height: 100%;
  background-color: #fdfef2;
  .draw_header {
    position: absolute;
  }
}
</style>