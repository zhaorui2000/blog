<script setup>
import Item from './Item.vue';
import { $list } from './../store';
import { useStore } from '@nanostores/vue';
import { CellGroup } from '@blog/ui';
const list = useStore($list);
</script>
<template>
  <CellGroup>
    <Item v-for="(_, index) of list" :index="index" :key="index"></Item>
  </CellGroup>
</template>
<style></style>
