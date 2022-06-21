<template>
  <div id="user">
    <div class="user_header">
      <Avator :num="props.num"></Avator>
    </div>
    <div class="user_footer">{{ props.userInfo.username }}</div>
  </div>
</template>

<script setup>
import Avator from "@/components/Avator";
import { defineProps } from "vue";

const props = defineProps({
  userInfo: Object,
  num: Number,
});
console.log(props.userInfo);
// import { reactive, ref } from "vue";

// const num = ref(0);
// const data = reactive({});
</script>

<style lang='scss' scoped>
#user {
  width: 200px;
  height: 200px;
  background-color: pink;
  //   .user_header {

  //   }
  .user_footer {
    text-align: right;
    color: green;
  }
}
</style>