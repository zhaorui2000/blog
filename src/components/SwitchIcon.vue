<script setup>
import clsx from 'clsx';
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
  <div
    @click="handleClick"
    :class="{
      [clsx('border-N3', inActiveClass)]: !props.modelValue,
      [clsx('border-MR', activeClass)]: props.modelValue,
    }"
    class="flex p-2 border border-solid rounded-full text-[1em] leading-none h-[1em] w-[1em] justify-center items-center"
  >
    <i
      :class="{
        [clsx(activeIcon)]: props.modelValue,
        [clsx(inActiveIcon)]: !props.modelValue,
      }"
    ></i>
    <span class="text-sm">
      <slot></slot>
    </span>
  </div>
</template>
<style></style>
