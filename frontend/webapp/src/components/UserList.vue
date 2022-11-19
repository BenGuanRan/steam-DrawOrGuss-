<template>
  <div id="user_list">
    <User
      v-for="(item, index) in userList"
      :num="index + 1"
      :key="item.username"
      :userInfo="item"
      class="user"
    ></User>
  </div>
</template>

<script setup>
import { onMounted, inject, ref } from "vue";
import User from "@/components/User";
// import { useStore } from "vuex";

const socket = inject("socket");
const userList = ref([]);
// const {
//   userList,
//   userStatus: { username },
// } = useStore().state;
onMounted(() => {
  const room = window.sessionStorage.getItem("roomInfo");

  if (room) userList.value = JSON.parse(room);
  socket.on(sessionStorage.getItem("roomID") + "updateRoom", (res) => {
    userList.value = res;
    window.sessionStorage.setItem("roomInfo", JSON.stringify(res));
  });
});
// const num = ref(0);
// const userList = reactive([
// {
//   username: "小明",
//   ifOver: true,
//   ifMaster: true,
// },
// {
//   username: "BenGreen",
//   ifOver: true,
//   ifMaster: false,
// },
// {
//   username: "aran",
//   ifOver: false,
//   ifMaster: false,
// },
// {
//   username: "阿然",
//   ifOver: false,
//   ifMaster: false,
// },
// {
//   username: "我是时光鸡",
//   ifOver: true,
//   ifMaster: false,
// },
// ]);
</script>

<style lang='scss' scoped>
#user_list {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
  .user {
    margin: 30px;
  }
}
</style>