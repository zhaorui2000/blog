<script setup>
import Item from './Item.vue';
import { progressList } from '@store/progressStore';
import { useStore } from '@nanostores/vue';
const $progressList = useStore(progressList);

</script>
<template>
  <div>
    <Item
      v-for="({ title, start, end }, index) of $progressList"
      :title="title"
      :key="index"
      :startTime="start"
      :endTime="end"
    ></Item>
  </div>
</template>
