<template>
  <div id="draw_board">
    <DrawHeader
      @drawOver="handleDGOver"
      class="draw_header"
      v-if="gameStatus === 'DRAW'"
    ></DrawHeader>
    <MainDraw v-if="gameStatus === 'DRAW'"></MainDraw>
    <MainGuss v-if="gameStatus === 'GUSS'" :base64="draw"></MainGuss>
    <DrawFooter
      :word="word"
      :gameStatus="gameStatus"
      @gussOver="handleDGOver"
    ></DrawFooter>
    <HasDrawed
      :counts="drawCounts"
      :sumCounts="sumCounts"
      v-if="gameStatus === 'WAITING'"
    ></HasDrawed>
    <!-- <TimeDown></TimeDown> -->
  </div>
</template>

<script setup>
import MainDraw from "@/components/MainDraw.vue";
import MainGuss from "@/components/MainGuss.vue";
import DrawHeader from "../components/DrawHeader.vue";
import DrawFooter from "../components/DrawFooter.vue";
import { inject, onMounted, reactive, ref } from "vue";
import HasDrawed from "../components/HasDrawed.vue";
import { useRouter } from "vue-router";
// import TimeDown from "../components/TimeDown.vue";

const socket = inject("socket");

const drawCounts = ref(0);
const sumCounts = ref(0);
onMounted(() => {
  drawCounts.value = sessionStorage.getItem("drawCounts");
  // 画提交监听
  socket.on(roomID + "submitDrawSuccess", (res) => {
    drawCounts.value = res.drawCounts;
    sumCounts.value = res.sumCounts;
    sessionStorage.setItem("actionStack", JSON.stringify(res.actionStack));
  });
  // 猜测提交监听
  socket.on(roomID + "submitWordSuccess", (res) => {
    drawCounts.value = res.drawCounts;
    sumCounts.value = res.sumCounts;
    sessionStorage.setItem("actionStack", JSON.stringify(res.actionStack));
    console.log(res);
  });
});
const gameStatus = ref("DRAW");
const actionStack = reactive({
  data: {},
});
const handleDGOver = () => {
  sessionStorage.setItem("gameStatus", "WAITING");
  gameStatus.value = "WAITING";
};
const word = ref("");
onMounted(() => {
  gameStatus.value = sessionStorage.getItem("gameStatus");
  actionStack.data = JSON.parse(sessionStorage.getItem("actionStack"));
  if (sessionStorage.getItem("gameStep") == "1") {
    word.value =
      actionStack.data[Number(sessionStorage.getItem("memberIndex")) - 1][0];
  }
});
const roomID = sessionStorage.getItem("roomID");

// 转化为猜
const draw = ref("");
onMounted(() => {
  socket.on(roomID + "turnToGuss", (res) => {
    sessionStorage.setItem(
      "gameStep",
      Number(sessionStorage.getItem("gameStep")) + 1
    );
    sessionStorage.setItem("actionStack", JSON.stringify(res.actionStack));
    gameStatus.value = "GUSS";
    sessionStorage.setItem("gameStatus", "GUSS");
    actionStack.data = JSON.parse(sessionStorage.getItem("actionStack"));
    draw.value =
      res.actionStack[
        (Number(sessionStorage.getItem("memberIndex")) +
          Number(sessionStorage.getItem("gameStep")) -
          2) %
          res.sumCounts
      ][Number(sessionStorage.getItem("gameStep")) - 1][1];
  });
});
// 转化为画
onMounted(() => {
  socket.on(roomID + "turnToDraw", (res) => {
    sessionStorage.setItem(
      "gameStep",
      Number(sessionStorage.getItem("gameStep")) + 1
    );
    sessionStorage.setItem("actionStack", JSON.stringify(res.actionStack));
    gameStatus.value = "DRAW";
    sessionStorage.setItem("gameStatus", "DRAW");
    actionStack.data = JSON.parse(sessionStorage.getItem("actionStack"));
    word.value =
      res.actionStack[
        (Number(sessionStorage.getItem("memberIndex")) +
          Number(sessionStorage.getItem("gameStep")) -
          2) %
          res.sumCounts
      ][Number(sessionStorage.getItem("gameStep")) - 1][1];
  });
});
const timer = ref(null);
// 复盘
const router = useRouter();
onMounted(() => {
  socket.on(roomID + "turnToReview", (res) => {
    sessionStorage.setItem("actionStack", JSON.stringify(res.actionStack));
    timer.value = window.setTimeout(() => {
      router.push("/review");
    }, 1000);
  });
});
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