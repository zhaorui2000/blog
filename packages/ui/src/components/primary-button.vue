<script setup>
import { debounce } from '@blog/utils';
const emit = defineEmits(['click']);

const handleClick = debounce(() => {
  emit('click');
}, 700);
</script>
<template>
  <van-button type="primary" @click="handleClick"><slot></slot></van-button>
</template>
<style></style>
