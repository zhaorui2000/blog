<script setup>
import { ref, defineModel, watch } from 'vue';
const model = defineModel();
const timeValue = ref();

const show = ref(false);
const fieldValue = ref();

watch(
  model,
  (newV) => {
    timeValue.value = [`${newV.hour}`, `${newV.minute}`];
    fieldValue.value = `${`${newV.hour}`.padStart(2, 0)} ${`${newV.minute}`.padStart(2, 0)}`;
  },
  { immediate: true },
);
function handleFocus() {
  show.value = true;
}
function handleConfirm({ selectedValues }) {
  show.value = false;
  model.value = { hour: selectedValues?.[0] ?? 0, minute: selectedValues?.[1] ?? 0 };
}
</script>
<template>
  <van-field v-bind="$attrs.fieldConfig" readonly v-model="fieldValue" @focus="handleFocus"></van-field>
  {{ timeValue.value }}
  <van-action-sheet v-bind="$attrs.actionSheetConfig" v-model:show="show">
    <van-time-picker
      :modelValue="timeValue"
      cancel-button-text=""
      @confirm="handleConfirm"
      v-bind="$attrs.timePickerConfig"
    ></van-time-picker>
  </van-action-sheet>
</template>
<style></style>
