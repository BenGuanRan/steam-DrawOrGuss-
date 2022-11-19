<template>
  <router-view></router-view>
</template>
<script setup>
import { onMounted, inject } from "vue";

const socket = inject("socket");
onMounted(() => {
  const userID = sessionStorage.getItem("userID") || "";
  socket.on("connection", (res) => {
    if (!sessionStorage.getItem("userID"))
      window.sessionStorage.setItem("userID", res);
  });
  socket.on(userID + "disconnected", () => {
    sessionStorage.removeItem("userID");
  });
});
</script>

<style lang="scss">
</style>
