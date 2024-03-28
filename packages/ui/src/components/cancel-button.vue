<script setup>
const emit = defineEmits(['click']);
const handleClick = () => {
  emit('click');
};
</script>
<template>
  <van-button v-bind="$attrs" type="danger" @click="handleClick"><slot>取消</slot></van-button>
</template>
<style></style>
