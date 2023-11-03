<script setup>
import clsx from 'clsx';
import ClassIcon from './ClassIcon.vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: Boolean, required: false, default: false },
  activeClass: { required: false },
  inActiveClass: { required: false },
  activeIcon: { required: false },
  inActiveIcon: { required: false },
});
function handleClick() {
  emit('update:modelValue', !props.modelValue);
}
</script>
<template>
  <ClassIcon
    @click="handleClick"
    :class="{
      [clsx('border-N3', inActiveClass)]: !props.modelValue,
      [clsx('border-MR', activeClass)]: props.modelValue,
    }"
    :icon-class="{
      [clsx(activeIcon)]: props.modelValue,
      [clsx(inActiveIcon)]: !props.modelValue,
    }"
  ></ClassIcon>
</template>
<style></style>
