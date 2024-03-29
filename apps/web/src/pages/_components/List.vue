<script setup>
import Item from './Item.vue';
import { $list } from './../store';
import { useStore } from '@nanostores/vue';
import { CellGroup } from '@blog/ui';
import { watch } from 'vue';
import { produce } from 'immer';
const list = useStore($list);
watch(list, () => {
  $list.set(
    produce($list.get(), (draft) => {
      draft.sort((a, b) => {
        return (a.start.hour - b.start.hour) * 12 + (a.start.minute - b.start.minute) * 60;
      });
      console.log(JSON.stringify(draft));
    }),
  );
});
</script>
<template>
  <CellGroup>
    <Item v-for="({ id }, index) of list" :index="index" :key="id"></Item>
  </CellGroup>
</template>
<style></style>
