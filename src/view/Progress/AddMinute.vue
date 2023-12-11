<script setup>
import { useStore } from '@nanostores/vue';
import { $editIndex, $isShowAddMinute, $progressList } from '@store/progressStore';
import { produce } from 'immer';
import { ActionSheet } from 'vant';
import convertTime from '@utils/convertTime.js';
import time2Arr from '@utils/time2Arr.js';

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
      const { realStart, start, diffSecond = 0 } = draft[editIndex.value];
      draft[editIndex.value].realStart = realStart ?? time2Arr(convertTime(start).add(diffSecond, 'second'));
      for (let i = editIndex.value; i < draft.length; ++i) {
        if (draft[i].isLock) {
          return;
        }
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
  <ActionSheet :actions="actions" :show="isShowAddMinute" @close="handleClosed" @select="handleSelect"></ActionSheet>
</template>