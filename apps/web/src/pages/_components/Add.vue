<script setup>
import { PrimaryButton, CancelButton, Popup, TimePickerField, Field, DelButton } from '@blog/ui';
import { isObject } from '@blog/utils';
import { log, updateList } from './../store';
import { ref, watch } from 'vue';
import { $list, $isShowAdd, $addData } from './../store';
import { produce } from 'immer';
import { useStore } from '@nanostores/vue';
import { v4 as uuidv4 } from 'uuid';
const isShowAdd = useStore($isShowAdd);
const addData = useStore($addData);
const start = ref(['00', '00']);
const end = ref(['00', '00']);
const title = ref('');

watch(isShowAdd, (newV) => {
  if (newV) {
    if (isObject(addData.value)) {
      const obj = $addData.get();
      start.value = [obj.start.hour, obj.start.minute];
      end.value = [obj.end.hour, obj.end.minute];
      title.value = obj.title;
    }
  } else {
    reset();
  }
});

const reset = () => {
  start.value = ['00', '00'];
  end.value = ['00', '00'];
  title.value = '';
  $addData.set(undefined);
};
const handleClick = () => {
  log.trace('新增/修改 弹框');
  $isShowAdd.set(true);
};
const handleCancel = () => {
  log.trace('取消');
  $isShowAdd.set(false);
};
const handleComfire = () => {
  let itemData = {
    isLock: false,
    diff: { hour: 0, minute: 0, second: 0 },
    endDiff: { hour: 0, minute: 0, second: 0 },
    ...($addData.get() ?? {}),
    title: title.value,
    end: { hour: Number(end.value[0]), minute: Number(end.value[1]), second: 0 },
    start: { hour: Number(start.value[0]), minute: Number(start.value[1]), second: 0 },
  };
  if (isObject(addData.value)) {
    log.trace('修改');
    const { index } = $addData.get();
    $list.set(
      produce($list.get(), (draft) => {
        draft[index] = { ...draft[index], ...itemData };
      }),
    );
  } else {
    log.trace('新增-新增');
    $list.set(
      produce($list.get(), (draft) => {
        draft.push({ id: uuidv4(), ...itemData });
      }),
    );
  }
  updateList();
  $isShowAdd.set(false);
};
</script>
<template>
  <div>
    <div class="flex">
      <DelButton block @click="handleClick">重置</DelButton>
      <PrimaryButton block @click="handleClick">新增</PrimaryButton>
    </div>
    <Popup :show="isShowAdd" position="bottom">
      <Field label="标题" v-model="title"></Field>
      <TimePickerField v-model="start" :fieldConfig="{ label: '开始时间' }"></TimePickerField>
      <TimePickerField v-model="end" :fieldConfig="{ label: '结束时间' }"></TimePickerField>
      <div class="flex">
        <CancelButton class="grow" @click="handleCancel">取消</CancelButton>
        <PrimaryButton class="grow" @click="handleComfire">确定</PrimaryButton>
      </div>
    </Popup>
  </div>
</template>
<style></style>
