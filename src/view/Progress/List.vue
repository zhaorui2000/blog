<script setup>
import Item from './Item.vue';
import { $progressList, $isShowEdit, $editIndex } from '@store/progressStore';
import { useStore } from '@nanostores/vue';
import { produce } from 'immer';
import dayjs from 'dayjs';
import { computed } from 'vue';
import { Button, CellGroup } from 'vant';
import convertTime from '@utils/convertTime';
import time2Arr from '@utils/time2Arr.js';
import LockIcon from '@view/Progress/LockIcon.vue';
import DisableIcon from '@view/Progress/DisableIcon.vue';
const progressList = useStore($progressList);
const editIndex = useStore($editIndex);

const computedList = computed(() => {
  let today = [];
  let tomorrow = [];
  let result = [];

  progressList.value.forEach((item, index) => {
    const { start, end, realStart, realEnd, diffSecond = 0, isLock } = item;
    result = {
      ...item,
      ...(isLock
        ? {}
        : {
            start: time2Arr(convertTime(start).add(diffSecond, 'second')),
          }),
      ...(isLock
        ? {}
        : {
            end: time2Arr(convertTime(end).add(diffSecond, 'second')),
          }),
    };

    const startObj = convertTime(result.start);
    const endObj = convertTime(result.end);

    if (
      startObj.diff(dayjs(), 'second') >= -1 ||
      (dayjs().diff(startObj, 'second') >= -1 && endObj.diff(dayjs(), 'second') >= -1)
    ) {
      today.push({ ...result, index, key: `today-${index}` });
    } else {
      tomorrow.push({ ...result, index, key: `tomorrow-${index}` });
    }
  });
  return [today, tomorrow];
});

function handleFinish(index) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      const diffSecond = dayjs().diff(convertTime(draft[index].end), 'second');
      for (let j = index; j < draft.length; ++j) {
        draft[j].diffSecond = diffSecond;
      }
      draft[index].realEnd = time2Arr();
      return draft;
    }),
  );
}
function handleCancelFinish(index) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      draft[index].realEnd = undefined;
      draft[index].diffSecond = 0;
      return draft;
    }),
  );
}
function handleClickEdit(index) {
  $isShowEdit.set(true);
  $editIndex.set(index);
}
function handleStart(index) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      const diffSecond = dayjs().diff(convertTime(draft[index].start), 'second');
      for (let j = 0; j < index; ++j) {
        if (convertTime(draft[j].end).diff(dayjs(), 'second') > 0) {
          draft[j].diffSecond = diffSecond;
        }
      }
      for (let j = index; j < draft.length; ++j) {
        draft[j].diffSecond = diffSecond;
      }
      draft[index].realStart = time2Arr();
      return draft;
    }),
  );
}
function handleCancelStart(index) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      draft[index].realStart = undefined;
      draft[index].diffSecond = 0;
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
function handleChangeDisable(index, value) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      draft[index].isDisable = value;
      return draft;
    }),
  );
}
function handleChangeLock(index, value) {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      const { start, end, diffSecond = 0 } = draft[index];
      draft[index].isLock = value;
      if (value) {
        draft[index].start = time2Arr(convertTime(start).add(diffSecond, 'second'));
        draft[index].end = time2Arr(convertTime(end).add(diffSecond, 'second'));
        draft[index].diffSecond = 0;
      }
      return draft;
    }),
  );
}
</script>
<template>
  <div class="overflow-y-scroll h-full">
    <CellGroup v-for="(list, index) of computedList" :title="['今天', '明天'][index]" class="bg-N1 px-3">
      <Item
        class="mb-2"
        v-for="{ title, start, end, isLock, isDisable, index, realStart, realEnd, key } of list"
        :title="title"
        :key="key"
        :disabled="isDisable"
        :startTime="realStart ?? start"
        :endTime="realEnd ?? end"
        @del="() => handleDel(index)"
      >
        <template #icon-bar>
          <LockIcon :model-value="isLock" @update:model-value="(value) => handleChangeLock(index, value)"></LockIcon>
          <DisableIcon
            :model-value="isDisable"
            @update:model-value="(value) => handleChangeDisable(index, value)"
          ></DisableIcon>
        </template>
        <template #right>
          <Button
            v-show="!realStart"
            size="small"
            class="h-full w-12"
            square
            type="primary"
            @click="() => handleStart(index)"
            >开始</Button
          >
          <Button
            v-show="realStart"
            size="small"
            class="h-full w-12"
            square
            type="primary"
            @click="() => handleCancelStart(index)"
            >取消开始</Button
          >
          <Button
            v-show="!realEnd"
            size="small"
            class="h-full w-12"
            square
            type="success"
            @click="() => handleFinish(index)"
            >完成</Button
          >
          <Button
            v-show="realEnd"
            size="small"
            class="h-full w-12"
            square
            type="success"
            @click="() => handleCancelFinish(index)"
            >取消完成</Button
          >
          <Button
            plain
            type="primary"
            v-show="!realEnd && !realStart"
            size="small"
            class="h-full w-12"
            square
            @click="() => handleClickEdit(index)"
            >编辑</Button
          >
        </template>
      </Item>
    </CellGroup>
  </div>
</template>
