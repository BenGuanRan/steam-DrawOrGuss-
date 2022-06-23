<template>
  <div id="SetingsBoard">
    <div class="game_info--container"></div>
    <h1>游戏设置</h1>
    <div class="settings_item">
      <!-- <h2>游戏词库</h2>
      <el-select v-model="value" placeholder="Select" size="large">
        <el-option />
        <el-option />
        <el-option />
      </el-select> -->
    </div>
    <div class="settings_item">
      <h2>人数限制</h2>
      <!-- <el-slider v-model="value" show-input /> -->
    </div>
    <div class="settings_item">
      <h2>作画时间</h2>
      <!-- <el-slider v-model="value" show-input /> -->
    </div>
    <div class="btn_container">
      <div>保存修改</div>
      <div>恢复默认</div>
    </div>
  </div>
</template>

<script setup>
// import { reactive, ref } from "vue";

// const num = ref(0);
// const data = reactive({});
</script>

<style lang='scss' scoped>
#SetingsBoard {
  position: relative;
  padding: 20px;
  .game_info--container {
    width: 100px;
    height: 100px;
    position: absolute;
    right: 50px;
    background-image: url(../assets/images/information.png);
    background-repeat: no-repeat;
    background-size: contain;
  }
}
.settings_item {
  padding: 20px 100px;
  h2 {
    margin: 30px 0;
  }
}
.btn_container {
  display: flex;
  width: 100%;
  justify-content: center;
  & > div {
    width: 100px;
    height: 50px;
    background-color: pink;
    margin: 100px;
    cursor: pointer;
  }
}
</style>