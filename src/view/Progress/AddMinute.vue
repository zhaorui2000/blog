<script setup>
import { ActionSheet } from 'vant';
import { ref } from 'vue';
const actions = [{ name: '+5' }, { name: '+10' }, { name: '+20' }];
const show = ref();
function handleSelect(action, index) {}
</script>
<template>
  <ActionSheet v-model:show="show" :actions="actions" @select="handleSelect"></ActionSheet>
</template>
