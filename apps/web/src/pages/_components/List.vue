<script setup>
import { useStore } from '@nanostores/vue';
import { $list } from './../store';
import { CellGroup, Cell, TimeProgress, PrimaryButton } from '@blog/ui';
import Add from './Add.vue';
const list = useStore($list);
</script>
<template>
  <Fragment>
    <CellGroup>
      <Cell v-for="{ title, start, end } of list" :title="title">
        <template #operate>
          <PrimaryButton></PrimaryButton>
        </template>
        <TimeProgress :start="start" :end="end"></TimeProgress>
      </Cell>
    </CellGroup>
    <Add></Add>
  </Fragment>
</template>
<style></style>
