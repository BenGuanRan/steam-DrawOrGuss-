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
import { ref } from "vue";

const router = useRouter();
const createRoom = () => {
  router.push("/room");
};
const joinRoom = () => {
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
      transform: translate(-50%, -10px);
      position: absolute;
      width: 340px;
      height: 70px;
      background-image: url(../assets/images/input.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
    .game_join--input {
      height: 50px;
      width: 300px;
      font-size: 25px;
      text-indent: 0.5em;
      outline: none;
      border: none;
      color: #696b6f;
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