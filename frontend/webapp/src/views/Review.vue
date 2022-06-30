<template>
  <div id="review">
    <div class="switch">
      <div
        class="switch_item"
        v-for="(item, index) in data.actionStack"
        :key="index"
        @click="viewWors(index)"
        :style="{ color: nowWordIndex == index ? '#000' : '' }"
      >
        {{ item[0] }}
      </div>
    </div>
    <div class="exit" @click="goBack"></div>
    <el-carousel
      :height="height"
      trigger="hover"
      arrow="never"
      autoplay
      :interval="2000"
      :loop="false"
      :pause-on-hover="false"
    >
      <el-carousel-item
        v-for="(item, index) in data.actionStack[nowWordIndex]"
        :key="item"
      >
        <div class="num">
          <span>{{ index + 1 }}</span>
        </div>
        <h1 class="begin_word" v-if="typeof item === 'string'">
          初始词语：<span>{{ item }}</span>
        </h1>
        <h1 v-else>
          <div class="username">
            玩家
            <span>{{ item[0] }}</span>
            {{ index % 2 ? "画的是：" : "猜的是：" }}
          </div>
          <div v-if="!(index % 2)" class="word_display">{{ item[1] }}</div>
          <div v-if="index % 2" class="draw_display">
            <img :src="item[1]" />
          </div>
        </h1>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";

const height = ref("");
onMounted(() => {
  height.value = window.innerHeight + "px";
  window.onresize = () => [(height.value = window.innerHeight + "px")];
});
onUnmounted(() => {
  window.onresize = null;
});

const data = reactive({
  actionStack: [],
});
onMounted(() => {
  const actionStack = JSON.parse(sessionStorage.getItem("actionStack"));
  data.actionStack = actionStack;
});

const nowWordIndex = ref(0);
const viewWors = (i) => {
  sessionStorage.setItem("nowWordIndex", i);
  history.go(0);
};
onMounted(() => {
  nowWordIndex.value = Number(sessionStorage.getItem("nowWordIndex")) || 0;
});

// 返回主页
const router = useRouter();
const goBack = () => {
  router.push("/home");
};
</script>

<style lang='scss' scoped>
#review {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #fdfef2;
  .switch {
    padding: 10px;
    z-index: 5;
    text-align: center;
    position: absolute;
    right: 10px;
    top: 20%;
    // background-color: #ddded3;
    color: rgba(0, 0, 0, 0.506);
    .redo {
      cursor: pointer;
      height: 50px;
      line-height: 40px;
    }
    .switch_item {
      cursor: pointer;
      height: 40px;
    }
    & > div:hover {
      color: #000;
    }
  }
  .exit {
    z-index: 5;
    cursor: pointer;
    position: absolute;
    width: 50px;
    height: 50px;
    right: 30px;
    bottom: 30px;
    background-image: url(../assets/images/back.png);
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .num {
    height: 100px;
    line-height: 100px;
    font-size: 50px;
    padding-left: 50px;
    span {
      display: inline-block;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border: 5px solid #000;
      border-radius: 50%;
    }
  }
  .begin_word {
    text-align: center;
    height: 100%;
    line-height: 400px;
    font-size: 60px;
    color: rgba(47, 47, 47, 0.847);
    span {
      font-weight: 700;
      color: #000;
    }
  }
  .username {
    text-align: center;
    span {
      color: skyblue;
    }
  }
  .word_display {
    height: 400px;
    line-height: 400px;
    text-align: center;
    font-size: 160px;
  }
  .draw_display {
    img {
      width: 100%;
    }
  }
}
</style>