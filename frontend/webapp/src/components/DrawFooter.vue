<template>
  <div id="draw_footer">
    <div class="draw_container" v-if="!drawOrGuss">
      <span class="draw_reminder">请作画:</span>
      <br />
      <span class="draw_content">请客，斩首，留下当狗</span>
    </div>
    <div class="guss_container" v-else>
      <div class="input_bgc"></div>
      <input placeholder="这是什么？" />
      <span>``</span>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
const { drawOrGuss } = store.state.userStatus;
</script>

<style lang='scss' scoped>
#draw_footer {
  position: absolute;
  bottom: 0;
  text-align: center;
  height: 70px;
  width: 100%;
  .draw_container {
    text-align: center;
    transform: translateY(-20px);
    .draw_reminder {
      display: inline-block;
      transform: translateY(-10px);
      font-weight: 600;
      font-size: 20px;
      color: #82879a;
    }
    .draw_content {
      font-weight: 700;
      font-size: 30px;
      color: #273452;
      margin: 15px 0 20px;
    }
  }
  .guss_container > .input_bgc {
    position: absolute;
    width: 260px;
    height: 60px;
    left: 50%;
    transform: translate(-50%, -5px);
    margin-left: -25px;
    background-image: url(../assets/images/input.png);
  }
  .guss_container > input {
    z-index: 3;
    position: relative;
    height: 50px;
    outline: none;
    width: 250px;
    font-size: 25px;
    text-indent: 1em;
    background-color: #d9d7d100;
    border: none;
  }
  .guss_container > span {
    z-index: 3;
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 50px;
    height: 50px;
    font-size: 0;
    background-image: url(../assets/images/OK.png);
    background-repeat: no-repeat;
    margin-left: 20px;
    transform: translateY(-30px);
  }
}
</style>