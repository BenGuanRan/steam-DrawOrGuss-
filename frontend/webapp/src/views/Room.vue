<template>
  <div id="room">
    <div class="room_left">
      <SetingsBoard></SetingsBoard>
    </div>
    <div class="room_right">
      <UserList class="user_list"></UserList>
      <div class="room_right--footer">
        <span class="room_code">房间代码： {{ roomID }}</span
        ><br />
        <span class="word_store">词库： 默认词库</span>
      </div>
    </div>
    <div class="goback" v-if="userStatus == 0" @click="goBack"></div>
    <div class="end_game" v-if="userStatus == 1" @click="endGame">关闭</div>
    <div class="start_game" v-if="userStatus == 1" @click="startGame">开始</div>
    <div class="start_game" v-if="userStatus == 0" @click="startGame">准备</div>
    <div class="game_rules" @click="showRules">游戏规则</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import SetingsBoard from "@/components/SetingsBoard";
import UserList from "@/components/UserList";
import { inject } from "vue";

const roomID = window.sessionStorage.getItem("roomID");
const userStatus = window.sessionStorage.getItem("userStatus");
console.log(userStatus);
const router = useRouter();
const socket = inject("socket");
const showRules = () => {
  alert("rules!");
};
const goBack = () => {
  window.sessionStorage.removeItem("userStatus");
  window.sessionStorage.removeItem("roomID");
  // 删除房间
  socket.emit;
};
// const num = ref(0);
// const data = reactive({});
const startGame = () => {
  router.push("/drawboard");
};
// 关闭房间
const endGame = () => {
  socket.emit(roomID + "closeRoom", roomID);
  router.push("/home");
};
</script>

<style lang='scss' scoped>
#room {
  position: relative;
  height: 100%;
  width: 100%;
  // transform: scale(-1);
  background-image: url(../assets/images/room_background.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .room_left,
  .room_right {
    float: left;
    height: 100%;
    width: 50%;
  }
  .room_right {
    overflow: auto;
    .user_list {
      margin-left: 40px;
    }
  }
  .goback {
    background-image: url(../assets/images/back.png);
    background-repeat: no-repeat;
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
  .start_game {
    font-size: 30px;
    cursor: pointer;
    position: absolute;
    right: 350px;
    bottom: 50px;
    color: #3caa33;
  }
  .start_game:hover {
    color: #3d853c;
  }
  .end_game {
    font-size: 30px;
    cursor: pointer;
    position: absolute;
    right: 450px;
    bottom: 50px;
    color: #dd233c;
  }
  .end_game:hover {
    color: #963d34;
  }
  .room_right--footer {
    position: absolute;
    height: 100px;
    width: 100%;
    bottom: 30px;
  }
  .room_code {
    margin-left: 30px;
    color: #878787;
    font-size: 25px;
    margin-bottom: 20px;
  }
  .word_store {
    margin-left: 30px;
    color: #565656;
    font-size: 25px;
  }
}
</style>