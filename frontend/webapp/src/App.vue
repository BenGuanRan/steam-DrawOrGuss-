<template>
  <router-view></router-view>
</template>
<script setup>
import { onMounted, inject } from "vue";

const socket = inject("socket");
onMounted(() => {
  socket.on("connection", (res) => {
    window.sessionStorage.setItem("userID", res);
  });
});
</script>

<style lang="scss">
</style>
