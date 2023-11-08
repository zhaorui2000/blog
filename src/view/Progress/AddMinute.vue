<script setup>
import { useStore } from '@nanostores/vue';
import { $isShowAddMinute, $editIndex, $progressList } from '@store/progressStore';
import { produce } from 'immer';
import { ActionSheet } from 'vant';
const actions = [
  { name: '+5 min', value: 300 },
  { name: '+10 min', value: 600 },
  { name: '+20 min', value: 1200 },
];
const isShowAddMinute = useStore($isShowAddMinute);
const progressList = useStore($progressList);
const editIndex = useStore($editIndex);
function handleSelect(action) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      draft[editIndex.value].realStart = draft[editIndex.value].realStart ?? draft[editIndex.value].start;
      for (var i = editIndex.value; i < draft.length; ++i) {
        draft[i].diffSecond = (draft[i].diffSecond ?? 0) + action.value;
      }
      return draft;
    }),
  );
  handleClosed();
}
function handleClosed() {
  $isShowAddMinute.set(false);
  $editIndex.set(-1);
}
</script>
<template>
  <ActionSheet :show="isShowAddMinute" :actions="actions" @select="handleSelect" @close="handleClosed"></ActionSheet>
</template>
