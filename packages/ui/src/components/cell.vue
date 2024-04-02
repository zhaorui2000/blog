<script setup>
import { defineProps, defineExpose, ref } from 'vue';
import anime from 'animejs';
const contentElement = ref(null);
const props = defineProps({
  title: {
    type: [String, Number],
    required: false,
  },
});
function active() {
  contentElement.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
  anime({
    targets: contentElement.value,
    backgroundColor: '#1989FA',
    easing: 'easeInOutQuad',
    duration: 700,
    direction: 'alternate',
  });
}
defineExpose({ active });
</script>
<template>
  <van-swipe-cell>
    <template #left>
      <slot name="left"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
    <div ref="contentElement" class="grid p-2 bg-N1 border-N4 border rounded-lg shadow-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>
        <div class="flex items-center">
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
