<template>
  <div id="draw_header">
    <!-- 绘画工具 -->
    <DrawTools class="draw_tools" @hasChangeTools="handelChange"></DrawTools>
    <DrawTimer
      :startTime="60"
      :sumTime="60"
      @theCountdownEnds="handelTimeOver"
      class="draw_timer"
    ></DrawTimer>
    <div class="draw_point--contioner">
      <div class="pointbox" @click="changeWidth(3)">
        <div class="draw_point">
          <span v-show="nowWidth === 3"></span>
        </div>
      </div>
      <div class="pointbox" @click="changeWidth(5)">
        <div class="draw_point">
          <span v-show="nowWidth === 5"></span>
        </div>
      </div>
      <div class="pointbox" @click="changeWidth(7)">
        <div class="draw_point">
          <span v-show="nowWidth === 7"></span>
        </div>
      </div>
      <div class="pointbox" @click="changeWidth(10)">
        <div class="draw_point">
          <span v-show="nowWidth === 10"></span>
        </div>
      </div>
    </div>
    <div class="draw_color--container">
      <el-color-picker size="large" v-model="nowColor" show-alpha />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import DrawTimer from "@/components/DrawTimer";
import DrawTools from "@/components/DrawTools";
import { useStore } from "vuex"; // 引入useStore 方法

// 颜色改变
const store = useStore(); // 该方法用于返回store 实例
const drawConfig = store.state.drawConfig;
const nowColor = ref("#000");
watch(nowColor, (newValue) => {
  store.commit("changeColor", newValue);
});
// 选择哪一个粗细
const nowWidth = ref(3);
const changeWidth = (w) => {
  nowWidth.value = w;
  store.commit("changeWidth", nowWidth.value);
};
// 选择工具栏式更新状态
const handelChange = (config) => {
  nowColor.value = config.color;
  nowWidth.value = config.width;
};
// 时间结束的回调
const handelTimeOver = () => {
  sessionStorage.removeItem("time");
};
</script>

<style lang='scss' scoped>
#draw_header {
  margin-top: 10px;
  height: 50px;
  width: 100%;
  .draw_tools {
    position: absolute;
    top: 0;
    left: 100px;
  }
  .draw_color--container {
    z-index: 3;
    position: absolute;
    right: 80px;
    top: 5px;
  }
  .draw_timer {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .draw_point--contioner {
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    right: 150px;
    height: 100%;
    width: 100px;
  }
  .draw_point {
    box-sizing: border-box;
    border: 1px solid #ccc;
    cursor: pointer;
    position: relative;
    display: inline-block;
    background-color: v-bind("drawConfig.color");
    border-radius: 50%;
  }
  .pointbox {
    cursor: pointer;
    line-height: 50px;
    width: 25%;
    height: 100%;
  }
  .pointbox:nth-child(1) .draw_point {
    width: 3px;
    height: 3px;
  }
  .pointbox:nth-child(2) .draw_point {
    width: 5px;
    height: 5px;
  }
  .pointbox:nth-child(3) .draw_point {
    width: 10px;
    height: 10px;
  }
  .pointbox:nth-child(4) .draw_point {
    width: 15px;
    height: 15px;
  }
  .draw_point > span {
    display: inline-block;
    left: 50%;
    bottom: -15px;
    position: absolute;
    width: 5px;
    height: 5px;
    transform: rotate(-45deg) translateX(-50%);
    border: 1px solid #90908b;
    border-bottom: 0;
    border-left: 0;
  }
}
</style>