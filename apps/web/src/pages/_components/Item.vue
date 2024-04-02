<script setup>
import { produce } from 'immer';
import { PrimaryButton, DelButton, TimeTag, Cell, TimeProgress, StatusIcon } from '@blog/ui';
import { defineProps, computed, ref } from 'vue';
import { $addData, $list, $isShowAdd, updateList, resetList } from './../_store';
import { useStore } from '@nanostores/vue';
import { log } from './../store';
import dayjs from 'dayjs';
import { transToDayjs, secondToObj, objTimeOperate } from '@blog/utils';
const list = useStore($list);
const cellElementRef = ref(null);
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
      const endDate = transToDayjs(computedEnd.value);
      if (draft[props.index].isFinish) {
        draft[props.index].endDiff = objTimeOperate(secondToObj(dayjs().diff(endDate, 'second')))
          .add(draft[props.index].endDiff)
          .done();
      } else {
        draft[props.index].endDiff = secondToObj(dayjs().diff(endDate, 'second'));
      }
      draft[props.index].isFinish = true;
    }),
  );
  resetList(props.index + 1);
  updateList();
}
function handleClickStart() {
  log.trace('开始按钮');
  $list.set(
    produce($list.get(), (draft) => {
      draft[props.index].diff = secondToObj(dayjs().diff(transToDayjs(draft[props.index].start), 'seconds'));
      draft[props.index].endDiff = { hour: 0, minute: 0, second: 0 };
      draft[props.index].isFinish = false;
      draft[props.index].isStart = true;
    }),
  );
  resetList(props.index + 1);
  updateList();
  cellElementRef.value.active();
}
function handleStart() {
  log.trace('进度条自动开始');
  $list.set(
    produce($list.get(), (draft) => {
      draft[props.index].isStart = true;
    }),
  );
}
function handleEnd() {
  log.trace('进度条结束');
  $list.set(
    produce($list.get(), (draft) => {
      draft[props.index].isFinish = true;
    }),
  );
}
function handleChangeIsLock({ value }) {
  log.trace('是否锁定', '参数:修改值', value, '参数:坐标', props.index);
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
  <Cell ref="cellElementRef">
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
