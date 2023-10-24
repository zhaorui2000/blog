<script setup>
import { ref, computed } from 'vue';
import { TimePicker, Field, Popup } from 'vant';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits();

const props = defineProps({
  label: { type: String },
  disabled: { type: Boolean },
  modelValue: { type: Array, default: [] },
});

const showPicker = ref(false);
const dateArr = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
function handleComfirm() {
  showPicker.value = false;
}
</script>
<template>
  <Field
    :disabled="disabled"
    is-link
    readonly
    :label="props.label"
    @click="() => (showPicker = true)"
    :model-value="dateArr.join(':')"
  ></Field>
  <Popup v-model:show="showPicker" position="bottom" :title="props.label">
    <TimePicker v-bind="$attrs" @confirm="handleComfirm" @cancel="() => (showPicker = false)" v-model="dateArr" />
  </Popup>
</template>
