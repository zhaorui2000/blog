<script setup>
function onClickLeft() {
  const resultHref = location.pathname.split('/').filter((item) => item);
  location.href = `${location.origin}${resultHref.slice(0, -1).join('/')}`;
}
</script>
<template>
  <van-nav-bar left-text="返回" left-arrow safe-area-inset-top @click-left="onClickLeft" />
</template>
<style></style>
