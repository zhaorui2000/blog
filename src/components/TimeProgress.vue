<script setup>
import { ref, onMounted, watch } from 'vue';
import { Progress } from 'vant';
import dayjs from 'dayjs';
import Timer from './../utils/Timer';

const emit = defineEmits(['change']);

const { startTime, endTime } = defineProps({
  startTime: { require: false, default: dayjs().startOf('day') },
  endTime: { require: false, default: dayjs().endOf('day') },
});

const precentage = ref(0);
const start = dayjs().hour(startTime[0]).minute(startTime[1]).second(startTime[2]);
const end = dayjs().hour(endTime[0]).minute(endTime[1]).second(endTime[2]);
const total = dayjs().endOf('day').diff(dayjs().startOf('day'), 'second');
let max = end.diff(start, 'second');

if (max <= 0) {
  max = max + total;
}

watch(precentage, (oldV, newV) => {
  emit('change', newV);
});

onMounted(() => {
  const timer = new Timer(() => {
    precentage.value = (dayjs().diff(start, 'second') / max) * 100;
    if (precentage.value >= 100) {
      precentage.value = 100;
      timer?.clear();
    }
  }, 100);
});
</script>
<template>
  <div>
    <Progress :percentage="precentage.toFixed(2)"></Progress>
  </div>
</template>
