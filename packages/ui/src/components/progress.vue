<script setup>
import { ref, defineProps, watch } from 'vue';
const props = defineProps({
  percentage: [String, Number],
});
const color = ref();
const innerPercentage = ref();
watch(
  () => props.percentage,
  (newV, oldV) => {
    // 计算颜色
    if (Number(newV) <= 80) {
      color.value = '#1989FA';
    } else if (Number(newV) >= 80 && Number(newV) <= 100) {
      color.value = '#07C160';
    } else {
      color.value = '#EE0A24';
    }
    // 范围
    if (Number(newV) >= 100) {
      innerPercentage.value = 100;
    } else if (Number(newV) <= 0) {
      innerPercentage.value = 0;
    } else {
      innerPercentage.value = Number(newV);
    }
  },
  { immediate: true },
);
</script>
<template>
  <van-progress :inactive="props.percentage <= 0" :percentage="innerPercentage" stroke-width="16px" :color="color" />
</template>
<style></style>
