<script setup>
import { PrimaryButton, Popup, TimePickerField } from '@blog/ui';
import { useStore } from '@nanostores/vue';
import { log } from './../store';
import { ref } from 'vue';
import { $list } from './../store';
import { produce } from 'immer';
const show = ref(false);
const start = ref();
const end = ref();
const handleClick = () => {
  log.trace('新增');
  show.value = true;
};
const handleComfire = () => {
  $list.set(
    produce($list.get(), (draft) => {
      draft.push({
        start: { hour: start.value[0], minute: start.value[1], second: 0 },
        end: { hour: end.value[0], minute: end.value[1], second: 0 },
        isLock: false,
        title: '测试',
      });
    }),
  );
};
</script>
<template>
  <div class="inline-block">
    <PrimaryButton @click="handleClick">新增</PrimaryButton>
    <Popup v-model:show="show" position="bottom">
      <TimePickerField v-model:value="start" :fieldConfig="{ label: '开始时间' }"></TimePickerField>
      <TimePickerField v-model:value="end" :fieldConfig="{ label: '结束时间' }"></TimePickerField>
      <PrimaryButton @click="handleComfire" block>确定</PrimaryButton>
    </Popup>
  </div>
</template>
<style></style>
