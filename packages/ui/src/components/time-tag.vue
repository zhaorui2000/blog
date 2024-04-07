<script setup>
import { computed } from 'vue';
import { transToDayjs } from '@blog/utils';
const props = defineProps({
  time: {
    type: Object,
    required: true,
  },
});
const computedContent = computed(() => transToDayjs(props.time).format('HH:mm'));
</script>
<template>
  <van-tag plain type="primary">{{ computedContent }}</van-tag>
</template>
<style></style>
