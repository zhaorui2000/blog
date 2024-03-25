<script setup>
import { PrimaryButton, Popup, TimePickerField, Field } from '@blog/ui';
import { log } from './../store';
import { ref } from 'vue';
import { $list, $isShowAdd } from './../store';
import { produce } from 'immer';
import { useStore } from '@nanostores/vue';
const isShowAdd = useStore($isShowAdd);
const start = ref();
const end = ref();
const title = ref();
const handleClosed = () => {
  $isShowAdd.set(false);
};
const handleClick = () => {
  log.trace('新增');
  $isShowAdd.set(true);
};
const handleComfire = () => {
  log.trace('确定');
  $list.set(
    produce($list.get(), (draft) => {
      draft.push({
        start: { hour: start.value[0], minute: start.value[1], second: 0 },
        end: { hour: end.value[0], minute: end.value[1], second: 0 },
        isLock: false,
        title: title.value,
      });
    }),
  );
  $isShowAdd.set(false);
};
</script>
<template>
  <div class="inline-block">
    <PrimaryButton @click="handleClick">新增</PrimaryButton>
    <Popup :show="isShowAdd" position="bottom" @closed="handleClosed">
      <Field label="标题" v-model="title"></Field>
      <TimePickerField v-model:value="start" :fieldConfig="{ label: '开始时间' }"></TimePickerField>
      <TimePickerField v-model:value="end" :fieldConfig="{ label: '结束时间' }"></TimePickerField>
      <PrimaryButton @click="handleComfire" block>确定</PrimaryButton>
    </Popup>
  </div>
</template>
<style></style>
