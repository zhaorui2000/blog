<script setup>
import Item from './Item.vue';
import { $progressList, $isShowEdit, $editIndex, $isShowAddMinute } from '@store/progressStore';
import { useStore } from '@nanostores/vue';
import { produce } from 'immer';
import dayjs from 'dayjs';
import { computed } from 'vue';
import { Button, CellGroup } from 'vant';
import convertTime from '@utils/convertTime';
import time2Arr from '@utils/time2Arr.js';
import SwitchIcon from '@components/SwitchIcon.vue';
import ClassIcon from '@components/ClassIcon.vue';
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
      draft[index].realStart = draft[index].realStart ?? time2Arr(convertTime(draft[index].start).add(draft[index].diffSecond ?? 0, 'second'));
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
function handleClickResetMinute(index) {
  $isShowAddMinute.set(true)
  $editIndex.set(index)
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
        <template #icon-bar-right="{ resetMinute }">
          <ClassIcon v-show="resetMinute > 0" @click="() => handleClickResetMinute(index)">{{
            resetMinute
          }}</ClassIcon></template
        >
        <template #icon-bar-left>
          <SwitchIcon
            active-icon="icon-[material-symbols--lock]"
            in-active-icon="icon-[material-symbols--lock-open-right-outline]"
            @update:model-value="(value) => handleChangeLock(index, value)"
            :model-value="isLock"
          />
          <SwitchIcon
            active-icon="icon-[material-symbols--visibility-off-rounded]"
            in-active-icon="icon-[material-symbols--visibility-outline-rounded]"
            @update:model-value="(value) => handleChangeDisable(index, value)"
            :model-value="isDisable"
          ></SwitchIcon>
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
            :disabled="realEnd || realStart"
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
