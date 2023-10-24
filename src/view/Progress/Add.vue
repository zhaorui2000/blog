<script setup>
import { ref, watch } from 'vue';
import { Button, Popup, Form, Field, CellGroup } from 'vant';
import TimePickerField from '@components/TimePickerField.vue';
import { useStore } from '@nanostores/vue';
import { progressList } from '@store/progressStore';
const $progressList = useStore(progressList);

const show = ref(false);
const startTime = ref();
const endTime = ref();
const durationTime = ref();

function handleClickAdd() {
  startTime.value = $progressList.value?.at(-1).end ?? [];
  endTime.value = [];
  durationTime.value = [];
  show.value = true;
}
</script>
<template>
  <Button @click="handleClickAdd"><span class="icon-[material-symbols--add-rounded]"></span>新增</Button>
  <Popup position="bottom" v-model:show="show" title="新增">
    <Form>
      <CellGroup inset>
        <TimePickerField
          label="开始时间"
          v-model="startTime"
          :columns-type="['hour', 'minute', 'second']"
        ></TimePickerField>
        <TimePickerField
          :disabled="startTime?.length < 1"
          label="结束时间"
          :columns-type="['hour', 'minute', 'second']"
          v-model="endTime"
        ></TimePickerField>
        <TimePickerField
          :disabled="startTime?.length < 1"
          label="持续时间"
          :columns-type="['hour', 'minute', 'second']"
          v-model="durationTime"
        ></TimePickerField>
      </CellGroup>
      <Button round block type="primary">确定</Button>
    </Form>
  </Popup>
</template>
