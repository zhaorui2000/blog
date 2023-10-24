<script setup>
import TimeProgress from '@components/TimeProgress.vue';
import { Cell, SwipeCell, Button } from 'vant';

const emit = defineEmits(['finish']);
const props = defineProps({
  title: { require: false, default: '' },
  startTime: { type: Array, require: true },
  endTime: { type: Array, require: true },
});

function handleClickFinish() {
  emit('finish');
}
</script>
<template>
  <SwipeCell>
    <Cell center :title="props.title">
      <template #label><TimeProgress :startTime="props.startTime" :endTime="props.endTime"></TimeProgress> </template>
    </Cell>
    <template #right><Button class="h-full" square type="primary" @click="handleClickFinish">完成</Button></template>
  </SwipeCell>
</template>
