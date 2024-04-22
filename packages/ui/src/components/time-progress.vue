<script setup>
import { ref, onMounted, onUnmounted, computed, watch, popScopeId } from 'vue';
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
const computedPivotText = computed(() => {
  let result = percentage.value;
  if (result <= 0) {
    return '未开始';
  }
  if (result >= 100) {
    return '结束';
  }
  return percentage.value.toFixed(2);
});
const computedStart = computed(() => {
  let result = transToDayjs(props.start);
  if (transToDayjs(props.end).diff(result) < 0) {
    result = result.add(-1, 'day');
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
  () => [props.end, computedStart.value],
  () => {
    total.value = transToDayjs(props.end).diff(computedStart.value);
  },
  {
    immediate: true,
  },
);
onMounted(() => {
  interval$.subscribe((n) => {
    current.value = dayjs().diff(computedStart.value);
  });
});
onUnmounted(() => {});
</script>
<template>
  <Progress :percentage="percentage" :pivot-text="computedPivotText"></Progress>
</template>
<style></style>
