<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: [String, Number],
    required: false,
  },
});
</script>
<template>
  <van-swipe-cell>
    <template #left>
      <slot name="left"></slot>
    </template>

    <template #right>
      <slot name="right"></slot>
    </template>
    <div class="grid p-2 shadow-sm rounded-sm">
      <div class="flex items-center justify-between">
        <div>
          {{ props.title }}
        </div>
        <div>
          <slot name="operate"></slot>
        </div>
      </div>
      <div class="flex-1 pt-1">
        <slot></slot>
      </div>
    </div>
  </van-swipe-cell>
</template>
<style></style>
