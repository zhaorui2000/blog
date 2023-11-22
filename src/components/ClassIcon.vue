<script setup>
import clsx from 'clsx';

const emit = defineEmits(['click']);
const props = defineProps({
  iconClass: { required: false },
  round: { required: false, default: false },
  border: { required: false, default: false },
  shadow: { required: false, default: false },
});
</script>
<template>
  <div
    :class="
      clsx('inline-flex p-2 text-[1em] leading-none h-[1em] w-[1em] justify-center items-center', {
        'rounded-full': props.round,
        'border border-solid': props.border,
        shadow: props.shadow,
      })
    "
    @click="emit('click')"
  >
    <i v-if="props.iconClass" :class="clsx(props.iconClass)"></i>
    <span class="text-sm text-N7">
      <slot></slot>
    </span>
  </div>
</template>
<style></style>