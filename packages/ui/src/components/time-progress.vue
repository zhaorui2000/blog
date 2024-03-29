<script setup>
import { defineProps, ref, onMounted, onUnmounted, computed, watch, popScopeId } from 'vue';
import { interval } from 'rxjs';
import dayjs from 'dayjs';
import Progress from './progress.vue';
import * as mathjs from 'mathjs';
import { transToDayjs } from '@blog/utils';
const props = defineProps({
  start: { type: Object, required: true },
  end: { type: Object, required: true },
});
const emit = defineEmits(['start', 'end']);
const current = ref(0);
const total = ref(0);
const interval$ = interval(1000);
const percentage = computed(() => mathjs.chain(current.value).divide(total.value).multiply(100).fix(2).done());
const computedEnd = computed(() => {
  let result = transToDayjs(props.end);
  if (result.diff(transToDayjs(props.start)) < 0) {
    result = result.add(1, 'day');
  }
  return result;
});

watch(percentage, (newV, oldV) => {
  if (newV >= 0 && newV <= 100) {
    if (oldV < 0) {
      emit('start');
    }
  }
  if (newV > 100) {
    if (oldV <= 100) {
      emit('end');
    }
  }
});
watch(
  () => [props.end, props.start],
  (newV) => {
    total.value = computedEnd.value.diff(transToDayjs(props.start));
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
