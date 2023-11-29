<script setup>
import { ref } from 'vue';
import { Tab, Tabs } from 'vant';
import Statistics from './Statistics.vue';
import List from './List.vue';
import Edit from './Edit.vue';

const active = ref();
</script>
<template>
  <Tabs v-model:active="active" class="h-full">
    <Tab title="列表">
      <div id="abcdefgh" class="grid h-full" style="grid-template-rows: 1fr min-content">
        <List />
        <Edit />
      </div>
    </Tab>
    <Tab title="统计">
      <Statistics></Statistics>
    </Tab>
  </Tabs>
</template>
<style></style>