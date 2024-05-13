<script setup>
function onClickLeft() {
  history.back();
}
</script>
<template>
  <van-nav-bar left-text="返回" left-arrow safe-area-inset-top @click-left="onClickLeft" />
</template>
<style></style>
