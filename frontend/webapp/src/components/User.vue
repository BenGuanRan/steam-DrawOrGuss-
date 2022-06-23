<template>
  <div id="user">
    <div class="user_header">
      <Avator :num="props.num"></Avator>
    </div>
    <div class="user_footer">
      {{ props.userInfo.username }}
      <div v-show="props.userInfo.ifOver" class="ifover"></div>
      <div v-if="props.userInfo.ifMaster" class="master"></div>
    </div>
  </div>
</template>

<script setup>
import Avator from "@/components/Avator";
import { defineProps } from "vue";

const colors = [
  "#1280d2",
  "#da1186",
  "#6a8bff",
  "#3caa33",
  "skyblue",
  "#f99c16",
  "#ec781d",
  "#0eb3d3",
  "pink",
  "#8d30e5",
  "#dd16d6",
  "#19e319",
  "#d9e40b",
  "#853131",
  "#6f68ad",
  "#ffb222",
];
const props = defineProps({
  userInfo: Object,
  num: Number,
});
// import { reactive, ref } from "vue";

// const num = ref(0);
// const data = reactive({});
</script>

<style lang='scss' scoped>
#user {
  width: 200px;
  height: 200px;
  background-color: v-bind("colors[num-1]");

  .user_header {
    height: 200px;
    overflow: hidden;
  }
  .user_footer {
    position: relative;
    text-align: right;
    font-weight: 600;
    font-size: 20px;
    color: v-bind("colors[num-1]");
    .ifover,
    .master {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 5px;
    }
    .ifover {
      background-image: url(../assets/images/OK.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
    .master {
      left: 30px;
      background-image: url(../assets/images/king.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}
</style>