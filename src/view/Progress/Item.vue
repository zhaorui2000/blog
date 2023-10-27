<script setup>
import { ref } from 'vue';
import TimeProgress from '@components/TimeProgress.vue';
import { Cell, SwipeCell, Button, Tag } from 'vant';
import convertTime from '@utils/convertTime';

const emit = defineEmits(['finish', 'del', 'start']);
const props = defineProps({
  title: { require: false, default: '' },
  startTime: { type: Array, require: true },
  endTime: { type: Array, require: true },
  iconClass: { type: Array, require: false },
  disabled: { type: Boolean, require: false, default: false },
});
const active = ref(false);

function handleClickStart() {
  emit('start');
}
function handleClickFinish() {
  emit('finish');
}
function handleClickDel() {
  emit('del');
}
function handleChangeProcentage(value) {
  active.value = value > 0 && value < 100;
}
</script>
<template>
  <SwipeCell>
    <template #left><Button class="h-full" type="danger" @click="handleClickDel">删除</Button></template>
    <Cell center>
      <template #title>
        <div class="flex gap-2" v-show="iconClass.length > 0">
          <i v-for="icon of iconClass" :key="icon" :class="icon" class="text-N8 text-base"></i>
        </div>
        <div class="w-full flex py-4">
          <Tag :type="active ? 'primary' : 'default'">{{ convertTime(props.startTime).format('HH:mm:ss') }}</Tag>
          <span class="ml-2">{{ props.title }}</span>
          <Tag class="ml-auto" :type="active ? 'primary' : 'default'">{{
            convertTime(props.endTime).format('HH:mm:ss')
          }}</Tag>
        </div>
      </template>
      <template #label
        ><TimeProgress
          @change="handleChangeProcentage"
          :startTime="props.startTime"
          :endTime="props.endTime"
          :disabled="props.disabled"
        ></TimeProgress>
      </template>
    </Cell>
    <template #right>
      <Button class="h-full" square type="success" @click="handleClickFinish">完成</Button>
      <Button class="h-full" square type="primary" @click="handleClickStart">开始</Button>
    </template>
  </SwipeCell>
</template>
<style></style>
