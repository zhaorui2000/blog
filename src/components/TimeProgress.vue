<script setup>
import { ref, onMounted, watch, toRaw, computed } from 'vue';
import { Progress } from 'vant';
import dayjs from 'dayjs';
import Timer from '@utils/Timer';
import convertTime from '@utils/convertTime';

const emit = defineEmits(['change']);

const props = defineProps({
  startTime: { require: false, default: dayjs().startOf('day') },
  endTime: { require: false, default: dayjs().endOf('day') },
  disabled: { require: false, default: false },
});

const precentage = ref(0);

const start = ref();
const end = ref();
const max = ref();
const total = dayjs().endOf('day').diff(dayjs().startOf('day'), 'second');
const timer = ref();

watch(
  () => props.disabled,
  (newV) => {
    console.log(newV, props.startTime);
    if (!newV) {
      timer.value = new Timer(() => {
        precentage.value = (dayjs().diff(start.value, 'second') / max.value) * 100;
      }, 300);
    } else {
      timer.value?.clear();
    }
  },
  { immediate: true },
);

watch(
  () => [props.startTime, props.endTime],
  ([startTime, endTime]) => {
    start.value = convertTime(startTime);
    end.value = convertTime(endTime);
    max.value = end.value.diff(start.value, 'second');
    if (max.value <= 0) {
      max.value = max.value + total;
    }
  },
  { immediate: true, deep: true },
);

watch(precentage, (newV) => {
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
</script>
<template>
  <div>
    <Progress :percentage="formatPrecentage"></Progress>
  </div>
</template>
