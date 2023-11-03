<script setup>
import clsx from 'clsx';
const emit = defineEmits(['click']);
const props = defineProps({
  iconClass: { required: true },
});
</script>
<template>
  <div
    @click="emit('click')"
    class="inline-flex p-2 border border-solid rounded-full text-[1em] leading-none h-[1em] w-[1em] justify-center items-center"
  >
    <i :class="clsx(props.iconClass)"></i>
    <span class="text-sm text-N7">
      <slot></slot>
    </span>
  </div>
</template>
<style></style>
