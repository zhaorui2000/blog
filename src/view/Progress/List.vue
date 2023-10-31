<script setup>
import Item from './Item.vue';
import { $progressList } from '@store/progressStore';
import { useStore } from '@nanostores/vue';
import { produce } from 'immer';
import dayjs from 'dayjs';
import { computed } from 'vue';
import { Button, CellGroup } from 'vant';
import convertTime from '@utils/convertTime';
import time2Arr from '@utils/time2Arr.js';
const progressList = useStore($progressList);

const computedList = computed(() => {
  let today = [];
  let tomorrow = [];
  let result = [];

  progressList.value.forEach((item, index) => {
    const { start, end, realStart, realEnd, diffSecond = 0, isLock } = item;

    let startObj = convertTime(start).add(diffSecond, 'second');
    let endObj = convertTime(end).add(diffSecond, 'second');

    if (isLock) {
      result = item;
    } else {
      result = {
        ...item,
        start: startObj.format('HH:mm:ss').split(':'),
        end: endObj.format('HH:mm:ss').split(':'),
      };
    }
    if (
      startObj.diff(dayjs(), 'second') >= -1 ||
      (dayjs().diff(startObj, 'second') >= -1 && endObj.diff(dayjs(), 'second') >= -1)
    ) {
      today.push({ ...result, index, key: `today-${index}` });
    } else {
      tomorrow.push({ ...result, index, key: `tomorrow-${index}` });
    }
  });
  return { today, tomorrow };
});

function handleFinish(index) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      const diffSecond = dayjs(convertTime(draft[index].start)).diff(convertTime(draft[index].end), 'second');
      const duration = dayjs().diff(convertTime(draft[index].start.diff(dayjs())), 'second');
      for (let j = index; j < draft.length; ++j) {
        draft[j].diffSecond = diffSecond;
      }
      draft[index].realEnd = time2Arr();
      return draft;
    }),
  );
}
function handleStart(index) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      const diffSecond = dayjs().diff(convertTime(draft[index].start), 'second');
      const duration = dayjs(convertTime(draft[index].end)).diff(convertTime(draft[index].start), 'second');
      for (let j = index; j < draft.length; ++j) {
        draft[j].diffSecond = diffSecond;
      }
      draft[index].realStart = time2Arr();
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
    <CellGroup inset title="今天">
      <Item
        v-for="{ title, start, end, isLock, index, realStart, realEnd, key } of computedList.today"
        :title="title"
        :startTime="realStart ?? start"
        :endTime="realEnd ?? end"
        @del="() => handleDel(index)"
      >
        <template #icon-bar></template>
        <template #right>
          <Button class="h-full" square type="primary" @click="() => handleStart(index)">开始</Button>
          <Button class="h-full" square type="success" @click="() => handleFinish(index)">完成</Button>
        </template>
      </Item>
    </CellGroup>
    <CellGroup inset title="明天">
      <Item
        v-for="{ title, start, realStart, end, realEnd, isLock, index, key } of computedList.tomorrow"
        :title="title"
        :key="key"
        :startTime="realStart ?? start"
        :endTime="realEnd ?? end"
        @del="() => handleDel(index)"
      >
        <template #icon-bar></template>
        <template #right>
          <Button class="h-full" square type="primary" @click="() => handleStart(index)">开始</Button>
          <Button class="h-full" square type="success" @click="() => handleFinish(index)">完成</Button>
        </template>
      </Item>
    </CellGroup>
  </div>
</template>
