<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['confirm', 'update:value']);
const show = ref(false);
const fieldValue = ref('');
function handleFocus() {
  show.value = true;
}
function handleConfirm({ selectedValues }) {
  show.value = false;
  fieldValue.value = selectedValues.join(' ');
  emit('confirm', selectedValues);
  emit('update:value', selectedValues);
}
</script>
<template>
  <van-field v-bind="$attrs.fieldConfig" readonly v-model="fieldValue" @focus="handleFocus"> </van-field>
  <van-action-sheet v-bind="$attrs.actionSheetConfig" v-model:show="show" title="标题">
    <van-time-picker @confirm="handleConfirm"></van-time-picker>
  </van-action-sheet>
</template>
<style></style>
