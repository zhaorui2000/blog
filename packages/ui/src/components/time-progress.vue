<script setup>
import { defineProps, ref, onMounted, onUnmounted, computed } from 'vue';
import { interval } from 'rxjs';
import dayjs from 'dayjs';
import Progress from './progress.vue';
import * as mathjs from 'mathjs';
const props = defineProps({
  start: { type: [Object, String], required: true },
  end: { type: [Object, String], required: true },
});
const current = ref(0);
const total = ref(0);
const interval$ = interval(1000);
const percentage = computed(() => mathjs.chain(current.value).divide(total.value).multiply(100).fix(2).done());
onMounted(() => {
  total.value = dayjs(props.end).diff(dayjs(props.start));
  interval$.subscribe((n) => {
    current.value = dayjs().diff(dayjs(props.start));
  });
});
onUnmounted(() => {});
</script>
<template>
  <Progress :percentage="percentage"></Progress>
</template>
<style></style>
