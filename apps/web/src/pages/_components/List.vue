<script setup>
import { useStore } from '@nanostores/vue';
import { $list } from './../store';
import { CellGroup, Cell, TimeProgress } from '@blog/ui';
import Add from './Add.vue';
const list = useStore($list);
</script>
<template>
  <Fragment>
    <CellGroup>
      <Cell v-for="{ title, start, end } of list" :title="title">
        <TimeProgress :start="start" :end="end"></TimeProgress>
      </Cell>
    </CellGroup>
    <Add></Add>
  </Fragment>
</template>
<style></style>
