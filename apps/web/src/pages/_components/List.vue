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
        return (
          (a.start.hour + a.diff.hour - b.start.hour - b.diff.hour) * 12 +
          (a.start.minute + a.diff.minute - b.start.minute - b.diff.minute) * 60
        );
      });
      for (let i = 0; i < draft.length; ++i) {
        const { start, diff, isLock, endDiff } = draft[i];
        if (isLock) {
          break;
        }
      }
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
