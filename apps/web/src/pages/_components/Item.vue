<script setup>
import { produce } from 'immer';
import { PrimaryButton, DelButton, TimeTag, Cell, TimeProgress, StatusIcon } from '@blog/ui';
import { defineProps, computed, ref } from 'vue';
import { $list, $addData, $isShowAdd, updateList } from './../_store';
import { useStore } from '@nanostores/vue';
import { log } from './../store';
import { objTimeOperate, transToDayjs, secondToObj } from '@blog/utils';
import dayjs from 'dayjs';
const list = useStore($list);
const cellElementRef = ref(null);
const content = computed(() => {
  return list.value[props.index] ?? {};
});
const computedStartTime = computed(() => {
  return objTimeOperate(content.value.startTime).add(content.value.startTimeOffset).done();
});
const computedEndTime = computed(() => {
  return objTimeOperate(computedStartTime.value).add(content.value.duration).add(content.value.durationOffset).done();
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
      draft[props.index].durationOffset = objTimeOperate(dayjs())
        .subtract(computedStartTime.value)
        .subtract(draft[props.index].duration)
        .done();
    }),
  );
  updateList();
  $isShowAdd.set(false);
}
function handleClickStart() {
  log.trace('开始按钮');
  $list.set(
    produce($list.get(), (draft) => {
      draft[props.index].startTimeOffset = secondToObj(
        dayjs().diff(transToDayjs(draft[props.index].startTime), 'second'),
      );
    }),
  );
  updateList();
  cellElementRef.value.active();
}
function handleStart() {
  log.trace('进度条自动开始');
}
function handleEnd() {
  log.trace('进度条结束');
}
function handleChangeIsLock({ value }) {
  log.trace('点击【锁定】图标', '参数:修改值', value, '参数:坐标', props.index);
  $list.set(
    produce($list.get(), (draft) => {
      draft[props.index].isLock = value;
    }),
  );
}
function handleModify() {
  log.trace('点击【修改】');
  $addData.set({
    start: computedStartTime.value,
    end: computedEndTime.value,
    ...content.value,
  });
  $isShowAdd.set(true);
}
function handleClickDel() {
  $list.set(
    produce($list.get(), (draft) => {
      draft.splice(props.index, 1);
    }),
  );
}
</script>
<template>
  <Cell ref="cellElementRef">
    <template #title>
      <TimeTag :time="computedStartTime"></TimeTag>
      <TimeTag :time="computedEndTime" class="ml-1"></TimeTag>
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
      :start="computedStartTime"
      :end="computedEndTime"
      class="mt-1"
      @start="handleStart"
      @end="handleEnd"
    ></TimeProgress>
  </Cell>
</template>
<style></style>
