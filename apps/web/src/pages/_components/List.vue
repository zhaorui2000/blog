<script setup>
import Item from './Item.vue';
import { $list, $endOfDay, $currentSelectLabel } from './../_store';
import { useStore } from '@nanostores/vue';
import { CellGroup, Cell, TimeTag } from '@blog/ui';
import LabelList from './LabelList.vue';
import { isNil } from '@blog/utils';
import { computed, onMounted, ref } from 'vue';
const list = useStore($list);
const currentSelectLabel = useStore($currentSelectLabel);
const endOfDay = useStore($endOfDay);
const stickyElement = ref();
const itemElement = ref();
const titleElement = ref();
const computedList = computed(() => {
  return list.value.filter((item) => {
    if (isNil(item.label) || item.label === '') {
      return true;
    }
    return item.label === currentSelectLabel.value;
  });
});
onMounted(() => {
  const { height: stickyHeight } = window.getComputedStyle(stickyElement.value);
  const { height: titleHeight } = window.getComputedStyle(stickyElement.value);
  itemElement.value.style.height = `calc(100% + ${stickyHeight} + ${titleHeight})`;
});
</script>
<template>
  <CellGroup>
    <Cell title="结束时间" ref="titleElement">
      <template #title>
        <div class="flex items-center gap-2">
          <div>一天结束时间</div>
          <TimeTag :time="endOfDay"></TimeTag>
        </div>
      </template>
    </Cell>
    <div class="sticky top-0 z-10" ref="stickyElement">
      <LabelList></LabelList>
    </div>
    <div ref="itemElement">
      <Item v-for="{ id, index } of computedList" :index="index" :key="id"></Item>
    </div>
  </CellGroup>
</template>
<style></style>
