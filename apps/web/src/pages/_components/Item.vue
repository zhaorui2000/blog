<script setup>
import { produce } from 'immer';
import { PrimaryButton, DelButton, TimeTag, Cell, TimeProgress, StatusIcon } from '@blog/ui';
import { defineProps, computed } from 'vue';
import { $addData, $list, $isShowAdd } from './../store';
import { useStore } from '@nanostores/vue';
import { log, updateList } from './../store';
import dayjs from 'dayjs';
import { transToDayjs, secodeToObj } from '@blog/utils';
const list = useStore($list);
const content = computed(() => {
  return list.value[props.index] ?? {};
});
const computedStart = computed(() => {
  return {
    hour: content.value.start.hour + content.value.diff.hour,
    minute: content.value.start.minute + content.value.diff.minute,
    second: content.value.start.second + content.value.diff.second,
  };
});
const computedEnd = computed(() => {
  return {
    hour: content.value.end.hour + content.value.diff.hour + content.value.endDiff.hour,
    minute: content.value.end.minute + content.value.diff.minute + content.value.endDiff.minute,
    second: content.value.end.second + content.value.diff.second + content.value.endDiff.second,
  };
});
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});
function handleClickFinish() {
  log.trace('完成按钮');
  $list.set(
    produce($list.get(), (draft) => {
      draft[props.index].endDiff = secodeToObj(dayjs().diff(transToDayjs(computedEnd.value), 'second'));
    }),
  );
}
function handleClickStart() {
  log.trace('开始按钮');
  $list.set(
    produce($list.get(), (draft) => {
      raft[props.index].isLock = true;
      draft[props.index].diff = secodeToObj(dayjs().diff(transToDayjs(content.value.start), 'seconds'));
      draft[props.index].endDiff = { hour: 0, minute: 0, second: 0 };
    }),
  );
  updateList();
}
function handleStart() {
  log.trace('进度条开始');
}
function handleEnd() {
  log.trace('进度条结束');
}
function handleChangeIsLock({ value }) {
  $list.set(
    produce($list.get(), (draft) => {
      draft[props.index].isLock = value;
    }),
  );
}
function handleModify() {
  $addData.set({
    index: props.index,
    ...content.value,
    start: computedStart.value,
    end: computedEnd.value,
    diff: { hour: 0, minute: 0, second: 0 },
    endDiff: { hour: 0, minute: 0, second: 0 },
  });
  $isShowAdd.set(true);
  updateList();
}
function handleClickDel() {
  $list.set(
    produce($list.get(), (draft) => {
      draft.splice(props.index, 1);
    }),
  );
  updateList();
}
</script>
<template>
  <Cell>
    <template #title>
      <TimeTag :time="computedStart"></TimeTag>
      <TimeTag class="ml-1" :time="computedEnd"></TimeTag>
      <span class="ml-2">
        {{ content.title }}
      </span>
    </template>
    <template #right>
      <PrimaryButton class="h-full" @click="handleClickStart">开始</PrimaryButton>
      <PrimaryButton class="h-full" type="default" plain @click="handleClickFinish">完成</PrimaryButton>
    </template>
    <template #left>
      <PrimaryButton type="default" class="h-full" @click="handleModify">修改</PrimaryButton>
      <DelButton class="h-full" @click="handleClickDel"></DelButton>
    </template>
    <template #operate>
      <StatusIcon
        @update:status="(value) => handleChangeIsLock({ value })"
        :status="content.isLock"
        offClass="icon-[material-symbols--lock-open-outline]"
        onClass="icon-[material-symbols--lock]"
      ></StatusIcon>
    </template>
    <TimeProgress
      class="mt-1"
      @start="handleStart"
      @end="handleEnd"
      :start="computedStart"
      :end="computedEnd"
    ></TimeProgress>
  </Cell>
</template>
<style></style>
