<script setup>
import { useStore } from '@nanostores/vue';
import { nextTick, ref } from 'vue';
import TimeProgress from '@components/TimeProgress.vue';
import { Button, Cell, SwipeCell, Tag } from 'vant';
import convertTime from '@utils/convertTime';
import dayjs from 'dayjs';
import { useMachine } from '@xstate/vue';
import { machine } from './machine';
import { $isShowEdit } from '@store/progressStore';
import clsx from 'clsx';

const isShowEdit = useStore($isShowEdit);

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
  return (
    convertTime(props.startTime).diff(dayjs(context.currentTime), 'second') <= 0 &&
    convertTime(props.endTime)
      .add(Number(convertTime(props.endTime).diff(convertTime(props.startTime), 'second') < 0), 'day')
      .diff(dayjs(context.currentTime), 'second') > 0
  );
}

function didFinish(context, event) {
  return (
    convertTime(props.endTime)
      .add(Number(convertTime(props.endTime).diff(convertTime(props.startTime), 'second') < 0), 'day')
      .diff(dayjs(context.currentTime), 'second') <= 0
  );
}

function handleStart() {
  emit('start');
  nextTick(() => {
    send('START');
  });
}

function handleFinish() {
  emit('finish');
  nextTick(() => {
    send('FINISH');
  });
}

function onReStart() {
  emit('start');
}

function onStart() {
  emit('start');
}

function onFinish() {
  emit('finish');
}

const { state, send, service } = useMachine(machine, {
  guards: {
    didStart,
    didFinish,
  },
  actions: {
    onReStart,
    onStart,
    onFinish,
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
    <template #left>
      <Button class="h-full" type="danger" @click="handleClickDel">删除</Button>
    </template>
    <Cell
      :class="{ 'border-MR border-2': active, 'border-N4 border': !active }"
      center
      class="border-solid shadow rounded-md"
    >
      <template #title>
        <div class="text-xl flex">
          <div class="flex gap-2 items-center">
            <slot name="icon-bar-left"></slot>
          </div>
          <div v-show="!props.disabled" class="flex gap-2 ml-auto items-center">
            <slot :resetMinute="resetMinute" name="icon-bar-right"></slot>
          </div>
        </div>
        <div :class="clsx('w-full flex pt-2 pb-1 items-center', { 'gap-2': !props.disabled })">
          <Tag v-show="!props.disabled" :type="active ? 'primary' : 'default'"
            >{{ convertTime(props.startTime).format('HH:mm:ss') }}
          </Tag>
          <span>{{ props.title }}</span>
          <Tag v-show="!props.disabled" :type="active ? 'primary' : 'default'" class="ml-auto"
            >{{ convertTime(props.endTime).format('HH:mm:ss') }}
          </Tag>
        </div>
      </template>
      <template #label>
        <TimeProgress
          v-show="!props.disabled"
          :disabled="props.disabled"
          :endTime="props.endTime"
          :startTime="props.startTime"
          @change="handleChangeProcentage"
        ></TimeProgress>
      </template>
    </Cell>
    <template #right>
      <Button class="h-full w-12" size="small" square type="primary" @click="() => handleStart()">开始</Button>
      <Button class="h-full w-12" size="small" square type="success" @click="() => handleFinish()">完成</Button>
      <slot name="swipe-cell-right"></slot>
    </template>
  </SwipeCell>
</template>
<style></style>