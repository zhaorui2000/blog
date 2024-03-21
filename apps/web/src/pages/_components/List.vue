<script setup>
import { useStore } from '@nanostores/vue';
import { $list } from './../store';
import { CellGroup, Cell, TimeProgress, StatusIcon } from '@blog/ui';
import Add from './Add.vue';
import { produce } from 'immer';
const list = useStore($list);
function handleChangeIsLock({ value, index }) {
  $list.set(
    produce($list.get(), (draft) => {
      draft[index].isLock = value;
    }),
  );
}
</script>
<template>
  <Fragment>
    <CellGroup>
      <Cell v-for="({ title, start, end, isLock }, index) of list" :title="title">
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
    <Add></Add>
  </Fragment>
</template>
<style></style>
