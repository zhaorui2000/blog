<script setup>
import { defineProps, ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { interval } from 'rxjs';
import dayjs from 'dayjs';
import Progress from './progress.vue';
import * as mathjs from 'mathjs';
import { transToDayjs } from '@blog/utils';
const props = defineProps({
  start: { type: Object, required: true },
  end: { type: Object, required: true },
});
const current = ref(0);
const total = ref(0);
const interval$ = interval(1000);
const percentage = computed(() => mathjs.chain(current.value).divide(total.value).multiply(100).fix(2).done());
watch(
  () => props.end,
  (newV) => {
    total.value = transToDayjs(props.end).diff(transToDayjs(props.start));
  },
  {
    immediate: true,
  },
);
onMounted(() => {
  interval$.subscribe((n) => {
    current.value = dayjs().diff(transToDayjs(props.start));
  });
});
onUnmounted(() => {});
</script>
<template>
  <Progress :percentage="percentage"></Progress>
</template>
<style></style>
