<script setup>
import { ref, defineProps, watch } from 'vue';
const props = defineProps({
  percentage: [String, Number],
});
const color = ref();
watch(
  () => props.percentage,
  (newV, oldV) => {
    if (Number(newV) <= 80) {
      color.value = '#1989FA';
    } else if (Number(newV) >= 80 && Number(newV) <= 100) {
      color.value = '#07C160';
    } else {
      color.value = '#EE0A24';
    }
  },
  { immediate: true },
);
</script>
<template>
  <van-progress :inactive="props.percentage <= 0" :percentage="props.percentage" stroke-width="16px" :color="color" />
</template>
<style></style>
