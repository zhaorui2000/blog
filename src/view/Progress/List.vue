<script setup>
import { computed } from 'vue';
import Item from './Item.vue';
import { $progressList } from '@store/progressStore';
import { useStore } from '@nanostores/vue';
import { produce } from 'immer';
import { showToast } from 'vant';
import dayjs from 'dayjs';
import convertTime from '@utils/convertTime';
const progressList = useStore($progressList);

function handleFinish(index) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      const secondDiff = convertTime(draft[index].end).diff(dayjs(), 'second');
      draft[index].isFinish = true;
      for (let j = index + 1; j < draft.length; ++j) {
        draft[j].start = convertTime(draft[j].start).add(secondDiff, 'second').format('HH:mm:ss').split(':');
        draft[j].end = convertTime(draft[j].end).add(secondDiff, 'second').format('HH:mm:ss').split(':');
      }
      return draft;
    }),
  );
}
function handleDel(index) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      return [...draft.slice(0, index), ...draft.slice(index + 1)];
    }),
  );
}
</script>
<template>
  <div>
    <Item
      v-for="({ title, start, end, isFinish }, index) of progressList"
      v-show="!isFinish"
      :title="title"
      :key="index"
      :startTime="start"
      :endTime="end"
      @finish="() => handleFinish(index)"
      @del="() => handleDel(index)"
    ></Item>
  </div>
</template>
