<script setup>
import { Tabs, Tab } from '@blog/ui';
import { $labelList } from './../_store';
import { useStore } from '@nanostores/vue';
const labelList = useStore($labelList);
const handleChangeTab = function () {};
</script>
<template>
  <Tabs @change="handleChangeTab">
    <Tab title="全部"></Tab>
    <Tab v-for="(item, index) of labelList" :key="index" :title="item.name"></Tab>
  </Tabs>
</template>
<style></style>
