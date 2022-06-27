<template>
  <div id="draw_timer">
    <el-progress
      type="circle"
      color="#000"
      :width="props.width"
      :stroke-width="3"
      :percentage="(time / sumTime) * 100"
      >{{ time }}s</el-progress
    >
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onUnmounted } from "vue";

const props = defineProps({
  startTime: {
    type: Number,
    default: 3,
  },
  width: {
    type: Number,
    default: 50,
  },
  sumTime: {
    type: Number,
    default: 3,
  },
});
// 倒计时结束
const emit = defineEmits(["theCountdownEnds"]);
const time = ref(0);
const timer = ref(() => {});

onMounted(() => {
  sessionStorage.removeItem("time");
  time.value = Number(sessionStorage.getItem("time") || props.startTime);
  sessionStorage.setItem("time", time.value);
  timer.value = window.setInterval(() => {
    time.value = Number(sessionStorage.getItem("time"));
    time.value--;
    sessionStorage.setItem("time", time.value);
    if (time.value <= 0) {
      sessionStorage.removeItem("time");
      window.clearInterval(timer.value);
      emit("theCountdownEnds"); // 告知父组件计时结束
    }
  }, 1000);
});
onUnmounted(() => {
  sessionStorage.setItem("time", time.value);
});
</script>

<style lang='scss' scoped>
#draw_timer {
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  display: inline-block;
  width: 50px;
  height: 50px;
}
.el-progress {
  width: v-bind("props.width+'px'");
  height: v-bind("props.width+'px'");
}
</style>