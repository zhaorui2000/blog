<script setup>
import { defineExpose, ref } from 'vue';
const mainRef = ref(null);
const scrollToTop = function () {
  if (mainRef.value) {
    mainRef.value.scrollTop = 0;
  }
};
defineExpose({ scrollToTop });
</script>
<template>
  <van-cell-group ref="mainRef" class="h-full overflow-y-scroll p-1 pt-0 bg-W">
    <div class="h-1"></div>
    <slot></slot>
  </van-cell-group>
</template>
<style></style>
