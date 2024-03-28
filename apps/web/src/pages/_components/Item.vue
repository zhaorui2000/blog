<script setup>
import { produce } from 'immer';
import { PrimaryButton, DelButton, TimeTag, Cell, TimeProgress, StatusIcon } from '@blog/ui';
import { defineProps, computed } from 'vue';
import { $addData, $list, $isShowAdd } from './../store';
import { useStore } from '@nanostores/vue';
const list = useStore($list);
const content = computed(() => {
  return list.value[props.index] ?? {};
});
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});
function handleClickFinish() {}
function handleChangeIsLock() {
  $list.set(
    produce($list.get(), (draft) => {
      draft[props.index].isLock = value;
    }),
  );
}
function handleModify() {
  $addData.set({ index: props.index, ...content.value });
  $isShowAdd.set(true);
}
function handleClickDel() {
  $list.set(
    produce($list.get(), (draft) => {
      draft.splice(props.index, 1);
    }),
  );
}
</script>
<template>
  <Cell>
    <template #title>
      <div>
        <TimeTag :time="content.start"></TimeTag>
        <TimeTag class="ml-1" :time="content.end"></TimeTag>
        <span class="ml-2">
          {{ content.title }}
        </span>
      </div>
    </template>
    <template #right>
      <PrimaryButton class="h-full" @click="handleClickFinish">完成</PrimaryButton>
    </template>
    <template #left>
      <PrimaryButton class="h-full" @click="handleModify">修改</PrimaryButton>
      <DelButton class="h-full" @click="handleClickDel"></DelButton>
    </template>
    <template #operate>
      <StatusIcon
        @update:status="(value) => handleChangeIsLock({ value })"
        :status="content.isLock"
        offClass="icon-[material-symbols--lock-open-outline]"
        onClass="icon-[material-symbols--lock]"
      ></StatusIcon>
    </template>
    <TimeProgress :start="content.start" :end="content.end"></TimeProgress>
  </Cell>
</template>
<style></style>
