<script setup>
import Item from './Item.vue';
import { $progressList } from '@store/progressStore';
import { useStore } from '@nanostores/vue';
import { produce } from 'immer';
import dayjs from 'dayjs';
import convertTime from '@utils/convertTime';
const progressList = useStore($progressList);
import { computed } from 'vue';
import clsx from 'clsx';

const computedProgressList = computed(() => {
  return progressList.value.map((item) => {
    const { start, end, diffSecond = 0, isLock } = item;

    if (isLock) {
      return item;
    }
    return {
      ...item,
      start: convertTime(start).add(diffSecond, 'second').format('HH:mm:ss').split(':'),
      end: convertTime(end).add(diffSecond, 'second').format('HH:mm:ss').split(':'),
    };
  });
});

function handleFinish(index) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      const diffSecond = dayjs().diff(convertTime(draft[index].end), 'second');
      for (let j = index; j < draft.length; ++j) {
        draft[j].diffSecond = diffSecond;
      }
      return draft;
    }),
  );
}
function handleStart(index) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      const diffSecond = dayjs().diff(convertTime(draft[index].start), 'second');
      for (let j = index; j < draft.length; ++j) {
        draft[j].diffSecond = diffSecond;
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
  <div class="flex gap-1 flex-col">
    <Item
      v-for="({ title, start, end, isLock }, index) of computedProgressList"
      :title="title"
      :key="index"
      :startTime="start"
      :endTime="end"
      :iconClass="clsx({ 'icon-[material-symbols--lock-outline]': isLock }).split(' ')"
      @finish="() => handleFinish(index)"
      @del="() => handleDel(index)"
      @start="() => handleStart(index)"
    ></Item>
  </div>
</template>
