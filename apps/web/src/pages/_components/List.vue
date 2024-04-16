<script setup>
import Item from './Item.vue';
import { $list, $endOfDay, $currentSelectLabel } from './../_store';
import { log } from './../store';
import { useStore } from '@nanostores/vue';
import { CellGroup, Cell, TimeTag } from '@blog/ui';
import LabelList from './LabelList.vue';
import { isNil } from '@blog/utils';
import { computed, onMounted, ref, watch } from 'vue';
const list = useStore($list);
const currentSelectLabel = useStore($currentSelectLabel);
const endOfDay = useStore($endOfDay);
const itemElement = ref();
const titleElement = ref();
const cellGroupElement = ref();

const computedList = computed(() => {
  return list.value.filter((item) => {
    if (isNil(item.label) || item.label === '') {
      return true;
    }
    return item.label === currentSelectLabel.value;
  });
});
watch(
  () => [itemElement.value, computedList.value],
  (newV) => {
    if (newV[0]) {
      log.trace('重新计算 grid template row 布局');
      newV[0].style['grid-template-rows'] = `repeat(${newV[1].length}, min-content) 1fr`;
    }
  },
);
watch(currentSelectLabel, () => {
  cellGroupElement.value?.scrollToTop();
});
onMounted(() => {
  log.trace('计算 列表 min-height');
  const { height: titleHeight } = getComputedStyle(titleElement.value);
  itemElement.value.style['min-height'] = `calc( 100% - ${titleHeight} + .125rem )`;
});
</script>
<template>
  <CellGroup ref="cellcellGroupElement">
    <div ref="titleElement">
      <Cell title="结束时间">
        <template #title>
          <div class="flex items-center gap-2">
            <div>一天结束时间</div>
            <TimeTag :time="endOfDay"></TimeTag>
          </div>
        </template>
      </Cell>
    </div>
    <div class="sticky top-0 z-10">
      <LabelList></LabelList>
    </div>
    <div class="grid gap-1" ref="itemElement">
      <Item v-for="{ id, index } of computedList" :index="index" :key="id"></Item>
    </div>
  </CellGroup>
</template>
<style></style>
