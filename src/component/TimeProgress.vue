<script setup>
import { ref, onMounted, watch } from 'vue';
import { Progress } from 'vant';
import dayjs from 'dayjs';
import Timer from './../utils/Timer';

const props = defineProps({
  startTime: { require: false, default: dayjs().startOf('day') },
  endTime: { require: false, default: dayjs().endOf('day') },
});

const precentage = ref(0);
const start = dayjs(props.startTime);
const end = dayjs(props.endTime);
const total = dayjs().endOf('day').diff(dayjs().startOf('day'), 'second');
const max = end.diff(start, 'second');

if(max <= 0){
  max = max + total
}

onMounted(() => {
  const timer = new Timer(() => {
    precentage.value = (( dayjs().diff(start, 'second') / max) * 100).toFixed(2);
  }, 100);
  if (precentage.value >= 100) {
    precentage.value = 100;
    timer.clear();
  }
});
</script>
<template>
  <div>
    <Progress :percentage="precentage"></Progress>
  </div>
</template>
