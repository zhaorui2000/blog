<script setup>
import { useStore } from '@nanostores/vue';
import { $list } from './../store';
import { CellGroup, Cell, TimeProgress, StatusIcon } from '@blog/ui';
import { PrimaryButton, DelButton, TimeTag } from '@blog/ui';
import { produce } from 'immer';
const list = useStore($list);
function handleChangeIsLock({ value, index }) {
  $list.set(
    produce($list.get(), (draft) => {
      draft[index].isLock = value;
    }),
  );
}
function handleClickFinish() {}
function handleModify() {}
function handleClickDel(index) {
  $list.set(
    produce($list.get(), (draft) => {
      draft.splice(index, 1);
    }),
  );
}
</script>
<template>
  <Fragment>
    <CellGroup>
      <Cell v-for="({ title, start, end, isLock }, index) of list">
        <template #title>
          <div class="flex gap-1">
            <TimeTag :time="start"></TimeTag>
            <TimeTag :time="end"></TimeTag>
            {{ title }}
          </div>
        </template>
        <template #right>
          <PrimaryButton class="h-full" @click="handleClickFinish">完成</PrimaryButton>
        </template>
        <template #left>
          <PrimaryButton class="h-full" @click="handleModify">修改</PrimaryButton>
          <DelButton class="h-full" @click="() => handleClickDel(index)"></DelButton>
        </template>
        <template #operate>
          <StatusIcon
            @update:status="(value) => handleChangeIsLock({ value, index })"
            :status="isLock"
            offClass="icon-[material-symbols--lock-open-outline]"
            onClass="icon-[material-symbols--lock]"
          ></StatusIcon>
        </template>
        <TimeProgress :start="start" :end="end"></TimeProgress>
      </Cell>
    </CellGroup>
  </Fragment>
</template>
<style></style>
