<script setup>
import { ref, defineModel, watch } from 'vue';
const model = defineModel();
const timeValue = ref();

const show = ref(false);
const fieldValue = ref();

watch(
  model,
  (newV) => {
    fieldValue.value = `${`${newV[0] % 24}`.padStart(2, '0')} ${`${newV[1] % 60}`.padStart(2, '0')}`;
  },
  { immediate: true },
);

function handleOpen() {
  timeValue.value = model.value;
}
function handleFocus() {
  show.value = true;
}
function handleConfirm({ selectedValues }) {
  show.value = false;
  model.value = selectedValues;
}
</script>
<template>
  <van-field v-bind="$attrs.fieldConfig" readonly v-model="fieldValue" @focus="handleFocus"> </van-field>
  <van-action-sheet @open="handleOpen" v-bind="$attrs.actionSheetConfig" v-model:show="show">
    <van-time-picker v-model="timeValue" cancel-button-text="" @confirm="handleConfirm"></van-time-picker>
  </van-action-sheet>
</template>
<style></style>
