<script setup>
import Item from './Item.vue';
import { $editIndex, $isShowAddMinute, $isShowEdit, $progressList } from '@store/progressStore';
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
const isShowEdit = useStore($isShowEdit);

const computedList = computed(() => {
  let today = [];
  let tomorrow = [];
  let result = [];

  progressList.value.forEach((item, index) => {
    const { start, end, realStart, realEnd, diffSecond = 0, isLock } = item;
    result = {
      ...item,
      start: time2Arr(convertTime(start).add(diffSecond, 'second')),
      end: time2Arr(convertTime(end).add(diffSecond, 'second')),
    };
    const startObj = convertTime(result.start);
    const endObj = convertTime(result.end);
    if (
      startObj.diff(dayjs(), 'second') >= -1 ||
      (dayjs().diff(startObj, 'second') >= -1 &&
        endObj.add(Number(startObj.diff(endObj, 'second') > 0), 'day').diff(dayjs(), 'second') >= -1)
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
      draft[index].realStart =
        draft[index].realStart ?? time2Arr(convertTime(draft[index].start).add(draft[index].diffSecond ?? 0, 'second'));
      const diffSecond = dayjs().diff(convertTime(draft[index].end), 'second');
      for (let j = index; j < draft.length; ++j) {
        if (draft[j].isLock && j !== index) {
          break;
        }
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
      for (let j = 0; j < draft.length; ++j) {
        if (j >= index) {
          if (draft[j].isLock && j !== index) {
            break;
          }
          draft[j].diffSecond = diffSecond;
        } else {
          if (convertTime(draft[j].end).diff(dayjs(), 'second') > 0) {
            draft[j].diffSecond = diffSecond;
          }
        }
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

function handleClickEdit(index) {
  $editIndex.set(index);
  $isShowEdit.set(true);
}

function handleClickResetMinute(index) {
  $isShowAddMinute.set(true);
  $editIndex.set(index);
}
</script>
<template>
  <div class="overflow-y-scroll h-full">
    <CellGroup v-for="(list, index) of computedList" :title="['今天', '明天'][index]" class="bg-N1 px-3">
      <Item
        v-for="{ title, start, end, isLock, isDisable, index, realStart, realEnd, key } of list"
        :key="key"
        :disabled="isDisable"
        :endTime="realEnd ?? end"
        :startTime="realStart ?? start"
        :title="title"
        class="mb-2"
        @del="() => handleDel(index)"
        @finish="() => handleFinish(index)"
        @start="() => handleStart(index)"
      >
        <template #icon-bar-right="{ resetMinute }">
          <ClassIcon v-show="resetMinute > 0" border="true" round="true" @click="() => handleClickResetMinute(index)"
            >{{ resetMinute }}
          </ClassIcon>
        </template>
        <template #icon-bar-left>
          <SwitchIcon
            :model-value="isLock"
            active-icon="icon-[material-symbols--lock]"
            in-active-icon="icon-[material-symbols--lock-open-right-outline]"
            @update:model-value="(value) => handleChangeLock(index, value)"
          />
          <SwitchIcon
            :model-value="isDisable"
            active-icon="icon-[material-symbols--visibility-off-rounded]"
            in-active-icon="icon-[material-symbols--visibility-outline-rounded]"
            @update:model-value="(value) => handleChangeDisable(index, value)"
          ></SwitchIcon>
        </template>
        <template #swipe-cell-right>
          <Button class="h-full w-12" plain size="small" square type="primary" @click="() => handleClickEdit(index)"
            >编辑
          </Button>
        </template>
      </Item>
    </CellGroup>
  </div>
</template>
