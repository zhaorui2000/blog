<script setup>
import { Tabs, Tab } from '@blog/ui';
import { $labelList, $currentSelectLabel } from './../_store';
import { log } from './../store';
import { useStore } from '@nanostores/vue';
import { onMounted } from 'vue';
import dayjs from 'dayjs';
const labelList = useStore($labelList);
const currentSelectLabel = useStore($currentSelectLabel);
onMounted(() => {
  $currentSelectLabel.set(labelList.value.at(dayjs().day()).name);
});
const handleChangeTab = function ({ title }) {
  log.trace('切换tab', '参数', title);
  $currentSelectLabel.set(title);
  // TODO:切换 tab 自动滚动开头
};
</script>
<template>
  <Tabs :active="currentSelectLabel" @click-tab="handleChangeTab">
    <Tab v-for="(item, index) of labelList" :key="index" :name="item.name" :title="item.name"></Tab>
  </Tabs>
</template>
<style></style>
