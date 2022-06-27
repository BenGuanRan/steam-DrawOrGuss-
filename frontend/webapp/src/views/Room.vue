<template>
  <div id="room">
    <div class="room_left">
      <SetingsBoard></SetingsBoard>
    </div>
    <div class="room_right">
      <UserList class="user_list"></UserList>
      <div class="room_right--footer">
        <div class="room_code">
          房间代码： {{ roomID }}
          <span class="copy" @click="handleCopy(roomID)"></span>
        </div>
        <div class="member_counter">
          房间人数：{{ memberNums }}/{{ sumNums }}
        </div>
      </div>
    </div>
    <div class="goback" v-if="userStatus == 0" @click="goBack"></div>
    <div class="end_game" v-if="userStatus == 1" @click="endGame">关闭</div>
    <div class="start_game" v-if="userStatus == 1" @click="startGame">开始</div>
    <div
      class="prepare_game"
      v-if="userStatus == 0"
      v-show="!ifPrepared"
      @click="prepareGame"
    >
      准备
    </div>
    <div
      class="cancelprepare_game"
      v-if="userStatus == 0"
      @click="cancelPrepareGame"
      v-show="ifPrepared"
    >
      取消准备
    </div>
    <div class="game_rules" @click="showRules">游戏规则</div>
  </div>
  <div class="game_countdown" v-if="ifShowTimerdown">
    <DrawTimer
      @theCountdownEnds="handelTimeOver"
      :width="300"
      class="draw_timer"
    ></DrawTimer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import SetingsBoard from "@/components/SetingsBoard";
import UserList from "@/components/UserList";
import DrawTimer from "@/components/DrawTimer";
import { inject, onMounted, ref } from "vue";
import { ElNotification } from "element-plus";
import { handleCopy } from "../utils/copy";
import { clearUnnecessarySession } from "../utils/clearUnnecessarySession";

const roomID = window.sessionStorage.getItem("roomID");
const userID = window.sessionStorage.getItem("userID");
const userStatus = window.sessionStorage.getItem("userStatus");
const router = useRouter();
const socket = inject("socket");
const showRules = () => {
  alert("rules!");
};
const goBack = () => {
  clearUnnecessarySession();
  // 删除房间
  socket.emit(userID + "exitRoom", { roomID, userID });
  router.push("/home");
};

// 时间结束，开始游戏
const ifShowTimerdown = ref(false);
const handelTimeOver = () => {
  router.push("/drawboard");
};
const startGame = () => {
  const roomID = sessionStorage.getItem("roomID");
  socket.emit(userID + "startGame", { roomID, userID });
  socket.on(roomID + "startGame", (res) => {
    // 更新session防止用户篡改
    sessionStorage.setItem("roomInfo", JSON.stringify(res.roomInfo));
    sessionStorage.setItem("roomSettings", JSON.stringify(res.roomSettings));
    ifShowTimerdown.value = true;
  });
  // 禁止开始游戏回调
  socket.on(userID + "forbidStartGame", (msg) => {
    ElNotification({
      title: "焯！",
      message: msg,
      type: "error",
    });
  });
};
// 关闭房间
const endGame = () => {
  clearUnnecessarySession();
  socket.emit(roomID + "closeRoom", roomID);
  router.push("/home");
};

// 房间关闭的回调
onMounted(() => {
  socket.on(roomID + "roomHasClosed", () => {
    ElNotification({
      title: "警告",
      message: "房主已关闭该房间！",
      type: "warning",
    });
    clearUnnecessarySession();
    router.push("/home");
  });
});

const ifPrepared = ref(false);

onMounted(() => {
  ifPrepared.value = window.sessionStorage.getItem("prepare") || false;
});
// 准备游戏
const prepareGame = () => {
  ifPrepared.value = true;
  window.sessionStorage.setItem("prepared", "All ready prepared!");
  // 准备游戏
  socket.emit(userID + "prepare", { userID, roomID });
};

const cancelPrepareGame = () => {
  ifPrepared.value = false;
  window.sessionStorage.removeItem("prepared");
  // 准备游戏
  socket.emit(userID + "cancelPrepare", { userID, roomID });
};

// 监听房间人数变化
const memberNums = ref(0);
const sumNums = ref(0);
onMounted(() => {
  const peopleCounting = JSON.parse(
    window.sessionStorage.getItem("peopleCounting")
  ) || {
    memberNums: NaN,
    sumNums: NaN,
  };
  memberNums.value = peopleCounting.memberNums;
  sumNums.value = peopleCounting.sumNums;
  socket.on(roomID + "roomMemberHasChanged", (res) => {
    memberNums.value = res.memberNums;
    sumNums.value = res.sumNums;
    window.sessionStorage.setItem("peopleCounting", JSON.stringify(res));
  });
});
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
  .start_game,
  .prepare_game {
    font-size: 30px;
    cursor: pointer;
    position: absolute;
    right: 350px;
    bottom: 50px;
    color: #3caa33;
  }

  .start_game:hover,
  .prepare_game:hover {
    color: #3d853c;
  }
  .end_game,
  .cancelprepare_game {
    font-size: 30px;
    cursor: pointer;
    position: absolute;
    right: 450px;
    bottom: 50px;
    color: #dd233c;
  }
  .cancelprepare_game {
    right: 350px;
  }
  .end_game:hover,
  .cancelprepare_game:hover {
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
    line-height: 30px;
    .copy {
      visibility: hidden;
      display: inline-block;
      width: 25px;
      height: 25px;
      cursor: pointer;
      background-position: 0 0;
      background-image: url(../assets/images/copy.png);
      background-repeat: no-repeat;
    }
  }
  .room_code:hover .copy {
    visibility: visible;
  }
  .member_counter {
    margin-left: 30px;
    color: #565656;
    font-size: 25px;
  }
}
.game_countdown {
  z-index: 5;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.728);
  .draw_timer {
    position: absolute;
    left: 40%;
    top: 30%;
  }
}
</style>