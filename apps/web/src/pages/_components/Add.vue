<script setup>
import { PrimaryButton } from '@blog/ui';
import { useStore } from '@nanostores/vue';
import { $list, log } from './../store';
const list = useStore($list);
const handleClick = () => {
  log.trace('新增');
};
</script>
<template>
  <PrimaryButton @click="handleClick">新增</PrimaryButton>
</template>
<style></style>
