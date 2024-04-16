<script setup>
import Item from './Item.vue';
import { $list, $endOfDay, $currentSelectLabel } from './../_store';
import { useStore } from '@nanostores/vue';
import { CellGroup, Cell, TimeTag } from '@blog/ui';
import LabelList from './LabelList.vue';
import { isNil } from '@blog/utils';
import { computed } from 'vue';
const list = useStore($list);
const currentSelectLabel = useStore($currentSelectLabel);
const endOfDay = useStore($endOfDay);
const computedList = computed(() => {
  return list.value.filter((item) => {
    if (isNil(item.label) || item.label === '') {
      return true;
    }
    return item.label === currentSelectLabel.value;
  });
});
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
    <LabelList></LabelList>
    <Item v-for="{ id, index } of computedList" :index="index" :key="id"></Item>
  </CellGroup>
</template>
<style></style>
