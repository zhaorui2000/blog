<script setup>
import { defineProps, ref, computed, defineEmits } from 'vue';
import clsx from 'clsx';
const props = defineProps({
  onClass: { type: String, require: true },
  offClass: { type: String, require: true },
  round: { type: Boolean, required: false, default: true },
  status: { type: Boolean, required: false, default: false },
});
const emit = defineEmits(['update:status']);
const status = ref(props.status);
const computedBorderClass = computed(() =>
  clsx('border border-N4 inline-flex p-[0.25em]', { 'rounded-full': props.round }),
);
const computedIconClass = computed(() => {
  return clsx(
    'text-[1.5em]',
    {
      [props.onClass]: status.value,
    },
    { [props.offClass]: !status.value },
  );
});
const handleClick = function () {
  status.value = !status.value;
  emit('update:status', status.value);
};
</script>
<template>
  <div :class="computedBorderClass" @click="handleClick">
    <span :class="computedIconClass"></span>
  </div>
</template>
<style></style>
