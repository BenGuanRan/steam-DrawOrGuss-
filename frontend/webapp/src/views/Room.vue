<template>
  <div id="room">
    <div class="room_left">
      <SetingsBoard></SetingsBoard>
    </div>
    <div class="room_right">
      <UserList class="user_list"></UserList>
      <div class="room_right--footer">
        <span>房间代码： BJMBDSMF《J》112</span><br />
        <span>词库： 默认</span>
      </div>
    </div>
    <div class="goback" @click="goBack">返回</div>
    <div class="game_rules" @click="showRules">游戏规则</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import SetingsBoard from "@/components/SetingsBoard";
import UserList from "@/components/UserList";

const router = useRouter();
const showRules = () => {
  alert("rules!");
};
const goBack = () => {
  router.push("/home");
};
// const num = ref(0);
// const data = reactive({});
</script>

<style lang='scss' scoped>
#room {
  position: relative;
  height: 100%;
  width: 100%;
  .room_left,
  .room_right {
    float: left;
    height: 100%;
    width: 50%;
  }
  .room_right {
    background-color: #eaeaea;
    overflow: auto;
    .user_list {
      margin-left: 40px;
    }
  }
  .goback {
    width: 50px;
    height: 50px;
    background-color: #ccc;
    position: absolute;
    right: 50px;
    bottom: 50px;
    cursor: pointer;
  }
  .game_rules {
    font-size: 30px;
    cursor: pointer;
    position: absolute;
    right: 150px;
    bottom: 50px;
    color: rgba(0, 0, 0, 0.681);
  }
  .game_rules:hover {
    color: #000;
  }
  .room_right--footer {
    position: absolute;
    height: 100px;
    width: 100%;
    bottom: 0;
  }
}
</style>