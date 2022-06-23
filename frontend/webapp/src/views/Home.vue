<template>
  <div id="home">
    <div class="game_title">你画你的我猜我的</div>
    <div class="game_create" @click="createRoom">创建房间</div>
    <div class="game_join" @click="joinRoom">加入游戏</div>
    <el-dialog v-model="ifJoin">
      <div class="game_join--inner">
        <h1 class="game_join--title">请输入房间代码</h1>
        <div class="input_bgc"></div>
        <input class="game_join--input" type="text" />
        <div class="game_join--buttons">
          <div class="ok" @click="doJoin"></div>
          <div class="cancel" @click="doCancel"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, inject } from "vue";

const router = useRouter();
const socket = inject("socket");

const createRoom = () => {
  // 用户身份(0普通用户，1房主)
  window.sessionStorage.setItem("userStatus", 1);
  const userId = window.sessionStorage.getItem("userID");
  let username =
    window.sessionStorage.getItem("username") || prompt("请输入昵称");
  if (username) {
    window.sessionStorage.setItem("username", username);
    // 发送创建房间消息
    socket.emit(userId + "createRoom", username);
    // 监听创建房间消息
    socket.on(userId + "createRoom", (res) => {
      // 记录房间号
      window.sessionStorage.setItem("roomID", res);
      router.push("/room");
    });
  }
};
const joinRoom = () => {
  window.sessionStorage.setItem("userStatus", 0);
  ifJoin.value = true;
};

const ifJoin = ref(false);

// 加入
const doJoin = () => {
  router.push("/room");
};
// 取消加入
const doCancel = () => {
  ifJoin.value = false;
};
</script>

<style lang='scss' scoped>
#home {
  background-image: url(../assets/images/home_background.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  height: 100%;
  & > div {
    width: 100%;
    text-align: center;
    position: absolute;
    font-weight: 500;
    left: 50%;
    transform: translateX(-50%);
  }
  .game_title {
    font-size: 80px;
    top: 10%;
  }
  .game_create {
    font-size: 50px;
    bottom: 50%;
  }
  .game_join {
    font-size: 50px;
    bottom: 40%;
  }

  .game_join--inner {
    width: 100%;
    text-align: center;
    position: relative;
    .input_bgc {
      left: 50%;
      transform: translate(-50%, -13px);
      position: absolute;
      width: 350px;
      height: 70px;
      background-image: url(../assets/images/input.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
    .game_join--input {
      position: relative;
      z-index: 1;
      height: 50px;
      width: 300px;
      font-size: 25px;
      text-indent: 0.5em;
      outline: none;
      border: none;
      color: #696b6f;
      background-color: rgba(255, 255, 255, 0);
    }
    .game_join--title {
      width: 100%;
      text-align: center;
      margin-bottom: 80px;
    }
    .game_join--buttons {
      display: inline;
      display: flex;
      width: 100%;
      justify-content: center;
      & > div {
        display: inline-block;
        margin: 60px;
        cursor: pointer;
      }
    }
    .ok,
    .cancel {
      width: 50px;
      height: 50px;
    }
    .ok {
      background-image: url(../assets/images/OK.png);
      background-repeat: no-repeat;
    }
    .cancel {
      background-image: url(../assets/images/noOK.png);
      background-repeat: no-repeat;
    }
  }

  .game_create:hover,
  .game_join:hover {
    cursor: pointer;
    color: #3957a5;
  }
}
</style>