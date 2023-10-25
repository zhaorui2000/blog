<script setup>
import { ref, watch } from 'vue';
import { Button, Popup, Form, Field, CellGroup } from 'vant';
import TimePickerField from '@components/TimePickerField.vue';
import { useStore } from '@nanostores/vue';
import { $progressList } from '@store/progressStore';
import { produce } from 'immer';
import dayjs from 'dayjs';
import convertTime from '@utils/convertTime';
const progressList = useStore($progressList);

const show = ref(false);
const startTime = ref();
const endTime = ref();
const durationTime = ref();
const title = ref();

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
  startTime.value = progressList.at?.(-1)?.end ?? [];
  endTime.value = [];
  durationTime.value = [];
  show.value = true;
}
function handleComfirm() {
  $progressList.set(
    produce($progressList.get(), (draft) => {
      draft.push({ title: title.value, start: startTime.value, end: endTime.value });
      draft.sort((a, b) => {
        return convertTime(a.start).diff(convertTime(b.start), 'second');
      });
    }),
  );
  show.value = false;
}
</script>
<template>
  <Button @click="handleClickAdd"><span class="icon-[material-symbols--add-rounded]"></span>新增</Button>
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
      </CellGroup>
      <Button round block type="primary" @click="handleComfirm">确定</Button>
    </Form>
  </Popup>
</template>
