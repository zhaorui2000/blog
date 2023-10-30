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
  showNotify({ message: `使用分组 ${title}`, type: 'success' });
}
</script>
<template>
  <CellGroup style="max-height: 40vh" class="overflow-y-scroll flex flex-col gap-2 bg-N1 p-4">
    <GroupItem
      v-for="({ title }, index) of progressGroup"
      :title="title"
      @click="() => handleClick(index)"
      @del="() => handleDel(index)"
    ></GroupItem>
  </CellGroup>
</template>
<style></style>
