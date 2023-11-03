<script setup>
import { ref, watch } from 'vue';
import TimeProgress from '@components/TimeProgress.vue';
import { Cell, SwipeCell, Button, Tag } from 'vant';
import convertTime from '@utils/convertTime';
import dayjs from 'dayjs';
import { computed } from 'vue';

const emit = defineEmits(['active', 'del', 'inactive']);
const props = defineProps({
  title: { require: false, default: '' },
  startTime: { type: Array, require: true },
  endTime: { type: Array, require: true },
  iconClass: { type: Array, require: false },
  disabled: { type: Boolean, require: false, default: false },
});
const active = ref();
const resetMinute = ref(0);

watch(active, (newV, oldV) => {
  if (oldV === false && newV === true) {
    emit('active');
  }
  if (oldV === true && newV === false) {
    emit('inactive');
  }
});

function handleClickDel() {
  emit('del');
}
function handleChangeProcentage(value) {
  if (value > 0 && value < 100) {
    active.value = true;
    resetMinute.value = convertTime(props.endTime).diff(dayjs(), 'minute');
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
      <slot name="right"></slot>
    </template>
  </SwipeCell>
</template>
<style></style>
