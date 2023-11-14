<script setup>
import { ref, watch } from 'vue';
import TimeProgress from '@components/TimeProgress.vue';
import { Cell, SwipeCell, Button, Tag } from 'vant';
import convertTime from '@utils/convertTime';
import dayjs from 'dayjs';
import { useMachine } from '@xstate/vue';
import { machine } from './machine';
import log from '@utils/log';
import { nextTick } from 'vue';

const emit = defineEmits(['active', 'del', 'inactive', 'start']);
const props = defineProps({
  title: { require: false, default: '' },
  startTime: { type: Array, require: true },
  endTime: { type: Array, require: true },
  iconClass: { type: Array, require: false },
  disabled: { type: Boolean, require: false, default: false },
});
const active = ref();
const resetMinute = ref(0);
function didStart(context, event) {
  log.debug('didStart');
  return convertTime(props.startTime).diff(dayjs(), 'second') < 0;
}
function didFinish(context, event) {
  log.debug('didFinish');
  return convertTime(props.endTime).diff(dayjs(), 'second') < 0;
}
function handleStart() {
  emit('start');
  nextTick(() => {
    send('START');
  });
}
function onReStart(){},
const { state, send, service } = useMachine(machine, {
  guards: {
    didStart,
    didFinish,
  },
  actions: {
    onReStart,
    onStart,
  },
});

function handleClickDel() {
  emit('del');
}
function handleChangeProcentage(value) {
  if (value > 0 && value < 100) {
    active.value = true;
    let diff = convertTime(props.endTime).diff(convertTime(props.startTime), 'second');
    if (diff < 0) {
      resetMinute.value =
        convertTime(props.endTime).diff(dayjs(), 'minute') +
        dayjs().endOf('day').diff(dayjs().startOf('day'), 'minute');
    } else {
      resetMinute.value = convertTime(props.endTime).diff(dayjs(), 'minute');
    }
  } else {
    active.value = false;
    resetMinute.value = -1;
  }
}
</script>
<template>
  <SwipeCell :disabled="props.disabled">
    <template #left><Button class="h-full" type="danger" @click="handleClickDel">删除</Button></template>
    <Cell
      center
      class="border-solid shadow rounded-md"
      :class="{ 'border-MR border-2': active, 'border-N4 border': !active }"
    >
      <template #title>
        <div class="text-xl flex">
          <span>{{ state.value }}</span>
          <div class="flex gap-2 items-center">
            <slot name="icon-bar-left"></slot>
          </div>
          <div v-show="!props.disabled" class="flex gap-2 ml-auto items-center">
            <slot name="icon-bar-right" :resetMinute="resetMinute"></slot>
          </div>
        </div>
        <div class="w-full flex pt-2 pb-1">
          <Tag v-show="!props.disabled" :type="active ? 'primary' : 'default'">{{
            convertTime(props.startTime).format('HH:mm:ss')
          }}</Tag>
          <span class="ml-2">{{ props.title }}</span>
          <Tag v-show="!props.disabled" class="ml-auto" :type="active ? 'primary' : 'default'">{{
            convertTime(props.endTime).format('HH:mm:ss')
          }}</Tag>
        </div>
      </template>
      <template #label
        ><TimeProgress
          v-show="!props.disabled"
          @change="handleChangeProcentage"
          :startTime="props.startTime"
          :endTime="props.endTime"
          :disabled="props.disabled"
        ></TimeProgress>
      </template>
    </Cell>
    <template #right>
      <Button v-show="!realStart" size="small" class="h-full w-12" square type="primary" @click="handleStart"
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
  </SwipeCell>
</template>
<style></style>
