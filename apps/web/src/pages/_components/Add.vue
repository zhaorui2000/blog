<script setup>
import { PrimaryButton, Popup } from '@blog/ui';
import { log } from './../store';
import { ref } from 'vue';
const handleClick = () => {
  log.trace('新增');
  show.value = true;
};
const show = ref(false);
</script>
<template>
  <div class="inline-block">
    <PrimaryButton @click="handleClick">新增</PrimaryButton>
    <Popup v-model:show="show" position="bottom"></Popup>
  </div>
</template>
<style></style>
