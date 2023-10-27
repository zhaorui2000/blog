<script setup>
import { ref, onMounted, watch, toRaw, computed } from 'vue';
import { Progress } from 'vant';
import dayjs from 'dayjs';
import Timer from './../utils/Timer';

const emit = defineEmits(['change']);

const props = defineProps({
  startTime: { require: false, default: dayjs().startOf('day') },
  endTime: { require: false, default: dayjs().endOf('day') },
});

const precentage = ref(0);

const start = ref();
const end = ref();
const max = ref();
const total = dayjs().endOf('day').diff(dayjs().startOf('day'), 'second');

watch(
  () => props,
  (newProps) => {
    const { startTime, endTime } = newProps;
    start.value = dayjs().hour(startTime[0]).minute(startTime[1]).second(startTime[2]);
    end.value = dayjs().hour(endTime[0]).minute(endTime[1]).second(endTime[2]);
    max.value = end.value.diff(start.value, 'second');
    if (max.value <= 0) {
      max.value = max.value + total;
    }
  },
  { immediate: true, deep: true },
);

watch(precentage, (oldV, newV) => {
  emit('change', newV);
});

const formatPrecentage = computed(() => {
  let result = precentage.value;
  if (precentage.value >= 100) {
    result = 100;
  }
  if (precentage.value < 0) {
    result = 0;
  }
  return result.toFixed(2);
});

onMounted(() => {
  new Timer(() => {
    precentage.value = (dayjs().diff(start.value, 'second') / max.value) * 100;
  }, 300);
});
</script>
<template>
  <div>
    <Progress :percentage="formatPrecentage"></Progress>
  </div>
</template>
