<script setup>
import { PrimaryButton, CancelButton, Popup, TimePickerField, Field } from '@blog/ui';
import { log } from './../store';
import { ref, computed } from 'vue';
import { $list, $isShowAdd } from './../store';
import { produce } from 'immer';
import { useStore } from '@nanostores/vue';
import { isNil } from '@blog/utils';
const isShowAdd = useStore($isShowAdd);
const start = ref('');
const end = ref('');
const title = ref('');
const computedCanComfire = computed(() => {
  return !(isNil(start.value) || isNil(end.value));
});
const handleClick = () => {
  log.trace('新增');
  $isShowAdd.set(true);
};
const handleCancel = () => {
  log.trace('新增-取消');
  $isShowAdd.set(false);
};
const handleComfire = () => {
  log.trace('新增-确定');
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
  <div>
    <PrimaryButton block @click="handleClick">新增</PrimaryButton>
    <Popup :show="isShowAdd" position="bottom">
      <Field label="标题" v-model="title"></Field>
      <TimePickerField v-model:value="start" :fieldConfig="{ label: '开始时间' }"></TimePickerField>
      <TimePickerField v-model:value="end" :fieldConfig="{ label: '结束时间' }"></TimePickerField>
      <div class="flex">
        <CancelButton class="grow" @click="handleCancel">取消</CancelButton>
        <PrimaryButton class="grow" :disabled="!computedCanComfire" @click="handleComfire">确定</PrimaryButton>
      </div>
    </Popup>
  </div>
</template>
<style></style>
