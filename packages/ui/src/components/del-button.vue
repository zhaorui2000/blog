<script setup>
import { ref } from 'vue';
const emit = defineEmits(['revoke']);
const show = ref(false);
const handleClick = () => {
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 7000);
  emit('click');
};
const handleClickRevoke = () => {
  show.value = false;
  emit('revoke');
};
</script>
<template>
  <van-button v-bind="$attrs" type="danger" @click="handleClick"><slot>删除</slot></van-button>
</template>
<style></style>
