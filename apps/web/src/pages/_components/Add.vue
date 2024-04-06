<script setup>
import { PrimaryButton, CancelButton, Popup, TimePickerField, Field, DelButton } from '@blog/ui';
import { isNil } from '@blog/utils';
import { log } from './../store';
import { ref, watch } from 'vue';
import { v4 as uuid } from 'uuid';
import { $isShowAdd, $addData, resetList, sortList } from './../_store';
import { useStore } from '@nanostores/vue';
import { produce } from 'immer';
import { $list } from './../_store';
const isShowAdd = useStore($isShowAdd);
const addData = useStore($addData);
const start = ref({ hour: 0, minute: 0, second: 0 });
const end = ref({ hour: 0, minute: 0, second: 0 });
const title = ref('');

watch(isShowAdd, (newV) => {
  if (newV) {
    if (isNil(addData.value?.id)) {
      reset();
    } else {
      const initData = $addData.get();
      start.value = initData.start;
      end.value = initData.end;
      title.value = initData.title;
    }
  }
});

const reset = () => {
  start.value = { hour: 0, minute: 0, second: 0 };
  end.value = { hour: 0, minute: 0, second: 0 };
  title.value = '';
};
const handleClick = () => {
  log.trace('点击【新增】');
  $addData.set(undefined);
  $isShowAdd.set(true);
};
const handleReset = () => {
  log.trace('点击【重置】');
  resetList();
};
const handleCancel = () => {
  log.trace('点击【取消】');
  $isShowAdd.set(false);
};
const handleComfire = () => {
  log.trace('点击【确定】');
  $list.set(
    produce($list.get(), (draft) => {
      const itemObj = {
        startTime: { ...start.value, second: 0 },
        duration: {
          hour: end.value.hour - start.value.hour,
          minute: end.value.minute - start.value.minute,
          second: 0,
        },
        startTimeOffset: { hour: 0, minute: 0, second: 0 },
        durationOffset: { hour: 0, minute: 0, second: 0 },
        title: title.value,
      };
      if (isNil(addData.value?.id)) {
        draft.push({ ...itemObj, index: draft.length, id: uuid(), isLock: false });
      } else {
        draft[addData.value.index] = { ...draft[addData.value.index], ...itemObj };
      }
    }),
  );
  sortList();
  $isShowAdd.set(false);
};
const timeFilter = (type, options) => {
  if (type === 'minute') {
    return options.filter((option) => Number(option.value) % 5 === 0);
  }
  return options;
};
</script>
<template>
  <div>
    <div class="flex">
      <DelButton block @click="handleReset">重置</DelButton>
      <PrimaryButton block @click="handleClick">新增</PrimaryButton>
    </div>
    <Popup :show="isShowAdd" position="bottom">
      <Field label="标题" v-model="title"></Field>
      <TimePickerField
        v-model="start"
        :timePickerConfig="{
          filter: timeFilter,
        }"
        :fieldConfig="{ label: '开始时间' }"
      ></TimePickerField>
      <TimePickerField
        v-model="end"
        :timePickerConfig="{
          filter: timeFilter,
        }"
        :fieldConfig="{ label: '结束时间' }"
      ></TimePickerField>
      <div class="flex">
        <CancelButton class="grow" @click="handleCancel">取消</CancelButton>
        <PrimaryButton class="grow" @click="handleComfire">确定</PrimaryButton>
      </div>
    </Popup>
  </div>
</template>
<style></style>
