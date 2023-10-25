<script setup>
import { ref, onMounted, watch } from 'vue';
import { Progress } from 'vant';
import dayjs from 'dayjs';
import Timer from './../utils/Timer';

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

onMounted(() => {
  const timer = new Timer(() => {
    precentage.value = ((dayjs().diff(start, 'second') / max) * 100).toFixed(2);
    if (precentage.value >= 100) {
      precentage.value = 100;
      timer?.clear();
    }
  }, 100);
});
</script>
<template>
  <div>
    <Progress :percentage="precentage"></Progress>
  </div>
</template>
