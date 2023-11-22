<script setup>
import { ref, watch } from 'vue';
import { Button, CellGroup, Field, Form, Popup, showNotify } from 'vant';
import TimePickerField from '@components/TimePickerField.vue';
import { useStore } from '@nanostores/vue';
import { $editIndex, $isShowEdit, $progressList } from '@store/progressStore';
import { produce } from 'immer';
import dayjs from 'dayjs';
import convertTime from '@utils/convertTime';
import Group from '@view/Progress/Group.vue';
import time2Arr from '@utils/time2Arr.js';
import log from '@utils/log.js';

const progressList = useStore($progressList);
const isShowEdit = useStore($isShowEdit);
const editIndex = useStore($editIndex);

const startTime = ref();
const endTime = ref();
const durationTime = ref();
const title = ref();

watch(isShowEdit, (newV) => {
  if (newV) {
    title.value = progressList.value[editIndex.value]?.title ?? '';
    startTime.value = progressList.value[editIndex.value]?.start ?? progressList.value?.at?.(-1)?.end ?? [];
    endTime.value = progressList.value[editIndex.value]?.end ?? progressList.value?.at?.(-1)?.end ?? [];
    durationTime.value = time2Arr(
      dayjs()
        .startOf('day')
        .add(convertTime(endTime.value).diff(convertTime(startTime.value), 'second'), 'second'),
    );
  }
});

function filterTime(type, options) {
  if (type === 'second') {
    return options.filter((option) => Number(option.value) % 10 === 0);
  }
  if (type === 'minute') {
    return options.filter((option) => Number(option.value) % 5 === 0);
  }
  return options;
}

function handleChangeDurationTime({ selectedValues }) {
  endTime.value = convertTime(startTime.value)
    .add(selectedValues[0], 'hour')
    .add(selectedValues[1], 'minute')
    .add(selectedValues[2], 'second')
    .format('HH:mm:ss')
    .split(':');
}

function handleChangeStartTime({ selectedValues }) {
  if (endTime.value?.length > 0) {
    durationTime.value = dayjs()
      .startOf('day')
      .add(convertTime(endTime.value).diff(convertTime(selectedValues), 'second'), 'second')
      .format('HH:mm:ss')
      .split(':');
  }
}

function handleChangeEndTime({ selectedValues }) {
  if (startTime.value?.length > 0) {
    durationTime.value = dayjs()
      .startOf('day')
      .add(convertTime(selectedValues).diff(convertTime(startTime.value), 'second'), 'second')
      .format('HH:mm:ss')
      .split(':');
  }
}

function handleClickAdd() {
  log.debug('[Button] 新增');
  $editIndex.set($progressList.get()?.length ?? 0);
  $isShowEdit.set(true);
}

function handleClickRest() {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      for (let i = 0; i < draft.length; ++i) {
        draft[i].diffSecond = 0;
        draft[i].realStart = undefined;
        draft[i].realEnd = undefined;
      }
    }),
  );
  showNotify({ message: '重置成功', type: 'success' });
}

function handleComfirm() {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      draft[editIndex.value] = { title: title.value, start: startTime.value, end: endTime.value };
      draft.sort((a, b) => {
        return convertTime(a.start)
          .add(a.diffSecond ?? 0, 'second')
          .diff(convertTime(b.start).add(b.diffSecond ?? 0, 'second'), 'second');
      });
    }),
  );
  $isShowEdit.set(false);
  showNotify({ message: '新增成功', type: 'success' });
}
</script>
<template>
  <div>
    <div class="flex gap-2 p-1">
      <Button block class="w-1/4" round @click="handleClickRest"><span>重置</span></Button>
      <Group class="w-1/4">分组</Group>
      <Button block class="w-1/2" icon="plus" round type="primary" @click="handleClickAdd">新增</Button>
    </div>
    <Popup :show="isShowEdit" position="bottom" title="新增" @close="$isShowEdit.set(false)">
      <Form>
        <Field v-model="title" label="标题" placeholder="请输入标题"></Field>
        <CellGroup inset>
          <TimePickerField
            v-model="startTime"
            :columns-type="['hour', 'minute', 'second']"
            :filter="filterTime"
            label="开始时间"
            @change="handleChangeStartTime"
          ></TimePickerField>
          <TimePickerField
            v-model="endTime"
            :columns-type="['hour', 'minute', 'second']"
            :disabled="startTime?.length < 1"
            :filter="filterTime"
            label="结束时间"
            @change="handleChangeEndTime"
          ></TimePickerField>
          <TimePickerField
            v-model="durationTime"
            :columns-type="['hour', 'minute', 'second']"
            :disabled="startTime?.length < 1"
            :filter="filterTime"
            label="持续时间"
            @change="handleChangeDurationTime"
          ></TimePickerField>
        </CellGroup>
        <Button block round type="primary" @click="handleComfirm">确定</Button>
      </Form>
    </Popup>
  </div>
</template>