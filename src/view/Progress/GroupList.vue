<script setup>
import { $progressGroup, $progressList } from '@store/progressStore.js';
import GroupItem from '@view/Progress/GroupItem.vue';
import { useStore } from '@nanostores/vue';
import { produce } from 'immer';
import { CellGroup, showNotify } from 'vant';

const progressGroup = useStore($progressGroup);
const progressList = useStore($progressList);

function handleDel(index) {
  $progressGroup.set(
    produce($progressGroup.get(), (draft) => {
      return [...draft.slice(0, index), ...draft.slice(index + 1)];
    }),
  );
}

function handleClick(index) {
  const { value, title } = $progressGroup.get()?.at?.(index) ?? {};
  $progressList.set(value ?? []);
  showNotify({ message: `使用分组【${title}】`, type: 'success' });
}
</script>
<template>
  <CellGroup class="overflow-y-scroll flex flex-col gap-2 p-4 max-h-[25vh] h-[25vh]">
    <GroupItem
      v-for="({ title }, index) of progressGroup"
      :title="title"
      class="shrink-0"
      @click="() => handleClick(index)"
      @del="() => handleDel(index)"
    ></GroupItem>
  </CellGroup>
</template>
<style></style>