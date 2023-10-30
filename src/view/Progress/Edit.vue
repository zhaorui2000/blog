<script setup>
import { ref } from 'vue';
import { Button, Popup, Form, Field, CellGroup, Switch, showNotify } from 'vant';
import TimePickerField from '@components/TimePickerField.vue';
import { useStore } from '@nanostores/vue';
import { $progressList } from '@store/progressStore';
import { produce } from 'immer';
import dayjs from 'dayjs';
import convertTime from '@utils/convertTime';
import Group from '@view/Progress/Group.vue';
const progressList = useStore($progressList);

const show = ref(false);
const startTime = ref();
const endTime = ref();
const durationTime = ref();
const title = ref();
const isLock = ref(false);

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
  startTime.value = convertTime(progressList.value?.at?.(-1)?.end ?? [])
    .add(progressList.value?.at?.(-1)?.diffSecond ?? 0, 'second')
    .format('HH:mm:ss')
    .split(':');
  endTime.value = [];
  durationTime.value = [];
  show.value = true;
  isLock.value = false;
}
function handleClickRest() {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      for (let i = 0; i < draft.length; ++i) {
        draft[i].diffSecond = 0;
        draft[i].realStart = 0;
        draft[i].realEnd = 0;
      }
    }),
  );
  showNotify({ message: '重置成功', type: 'success' });
}
function handleComfirm() {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      draft.push({ title: title.value, start: startTime.value, end: endTime.value, isLock: isLock.value });
      draft.sort((a, b) => {
        return convertTime(a.start).diff(convertTime(b.start), 'second');
      });
    }),
  );
  show.value = false;
  showNotify({ message: '新增成功', type: 'success' });
}
</script>
<template>
  <div>
    <div class="flex gap-2 p-1">
      <Button class="w-1/4" block round @click="handleClickRest"><span>重置</span></Button>
      <Group class="w-1/4">分组</Group>
      <Button class="w-1/2" type="primary" block round @click="handleClickAdd" icon="plus">新增</Button>
    </div>
    <Popup position="bottom" v-model:show="show" title="新增">
      <Form>
        <Field label="标题" v-model="title" placeholder="请输入标题"></Field>
        <CellGroup inset>
          <TimePickerField
            label="开始时间"
            v-model="startTime"
            :columns-type="['hour', 'minute', 'second']"
            @change="handleChangeStartTime"
          ></TimePickerField>
          <TimePickerField
            :disabled="startTime?.length < 1"
            label="结束时间"
            :columns-type="['hour', 'minute', 'second']"
            v-model="endTime"
            @change="handleChangeEndTime"
          ></TimePickerField>
          <TimePickerField
            :disabled="startTime?.length < 1"
            label="持续时间"
            :columns-type="['hour', 'minute', 'second']"
            v-model="durationTime"
            @change="handleChangeDurationTime"
          ></TimePickerField>
          <Field label="锁定">
            <template #input>
              <Switch v-model="isLock"></Switch>
            </template>
          </Field>
        </CellGroup>
        <Button round block type="primary" @click="handleComfirm">确定</Button>
      </Form>
    </Popup>
  </div>
</template>
