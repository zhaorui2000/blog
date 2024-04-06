<script setup>
import Item from './Item.vue';
import { $list, $endOfDay } from './../_store';
import { useStore } from '@nanostores/vue';
import { CellGroup, Cell, TimeTag } from '@blog/ui';
const list = useStore($list);
const endOfDay = useStore($endOfDay);
</script>
<template>
  <CellGroup>
    <Cell title="结束时间">
      <template #title>
        <div class="flex items-center gap-2">
          <div>一天结束时间</div>
          <TimeTag :time="endOfDay"></TimeTag>
        </div>
      </template>
    </Cell>
    <Item v-for="({ id }, index) of list" :index="index" :key="id"></Item>
  </CellGroup>
</template>
<style></style>
