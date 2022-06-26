<template>
  <div id="SetingsBoard">
    <div class="game_info--container"></div>
    <h1>游戏设置</h1>
    <div class="settings_item">
      <h2>游戏词库</h2>
      <el-select
        :disabled="userStatus != 1"
        v-model="settings.wordsSource"
        placeholder="Select"
        size="large"
      >
        <el-option v-for="k in keys" :key="k" :value="k" />
      </el-select>
    </div>
    <div class="settings_item">
      <h2>人数限制</h2>
      <el-slider
        :disabled="userStatus != 1"
        v-model="settings.memberLimits"
        :min="4"
        :max="16"
        :step="1"
        show-stops
      />
    </div>
    <div class="settings_item">
      <h2>作画时间</h2>
      <el-slider
        :disabled="userStatus != 1"
        :min="30"
        :step="10"
        :max="120"
        v-model="settings.timeLimits"
        show-input
        show-stops
      />
    </div>
    <div class="btn_container">
      <div v-if="userStatus == 1" @click="saveSettings"></div>
      <div v-if="userStatus == 1" @click="backToDefault"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, inject, onMounted } from "vue";
import { getKeys } from "@/utils/getWords";
import { ElNotification } from "element-plus";

const userStatus = window.sessionStorage.getItem("userStatus");
const socket = inject("socket");
const keys = ref(getKeys());
const settings = reactive({
  wordsSource: "流行语",
  memberLimits: 10,
  timeLimits: 60,
});
const roomID = window.sessionStorage.getItem("roomID");
const userID = window.sessionStorage.getItem("userID");

// 保存修改
const saveSettings = () => {
  socket.emit(userID + "saveSettings", { roomID, settings, userID });
};
// 恢复默认
const backToDefault = () => {
  settings.memberLimits = 10;
  settings.timeLimits = 60;
  settings.wordsSource = "流行语";
  socket.emit(userID + "saveSettings", { roomID, settings, userID });
};

// 修改成功的回调
onMounted(() => {
  const sessionSettings = JSON.parse(
    window.sessionStorage.getItem("roomSettings")
  );
  settings.memberLimits = sessionSettings.memberLimits;
  settings.timeLimits = sessionSettings.timeLimits;
  settings.wordsSource = sessionSettings.wordsSource;
  socket.on(roomID + "settingsHasChanged", (res) => {
    console.log(res);
    ElNotification({
      title: "OK",
      message: "房间设置已修改！",
      type: "success",
    });
    settings.memberLimits = res.memberLimits;
    settings.timeLimits = res.timeLimits;
    settings.wordsSource = res.wordsSource;
    window.sessionStorage.setItem("roomSettings", JSON.stringify(settings));
  });
});
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
    margin: 100px;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  & > div:nth-child(1) {
    background-image: url(../assets/images/saveChange.png);
  }
  & > div:nth-child(2) {
    background-image: url(../assets/images/default.png);
  }
}
</style>