<script setup>
import { ref, watch, defineModel } from 'vue';
const show = ref(false);
const fieldValue = ref();
const model = defineModel();
watch(
  model,
  () => {
    fieldValue.value = model.value;
  },
  { immediate: true },
);
const handleFocus = function () {
  show.value = true;
};
const handleSelect = function ({ name }) {
  model.value = name;
  show.value = false;
};
</script>
<template>
  <van-field v-bind="$attrs.fieldConfig" readonly v-model="fieldValue" @focus="handleFocus"></van-field>
  <van-action-sheet v-bind="$attrs.actionSheetConfig" v-model:show="show" @select="handleSelect"> </van-action-sheet>
</template>
<style></style>
