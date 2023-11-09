<script setup>
import { ref } from 'vue';
import { Tab, Tabs } from 'vant';
import List from './List.vue';
import Edit from './Edit.vue';
import Statistics from './Statistics.vue';

const active = ref();
</script>
<template>
  <Tabs v-model:active="active" class="h-full" sticky>
    <Tab title="列表" >
      <div class="grid h-full" style="grid-template-rows: 1fr min-content">
        <List />
        <Edit />
      </div>
    </Tab>
    <Tab title="统计"><Statistics></Statistics></Tab>
  </Tabs>
</template>
<style></style>
