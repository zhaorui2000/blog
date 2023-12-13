<script setup>
import { onMounted, ref } from 'vue';
import { Tab, Tabs } from 'vant';
import Statistics from './Statistics.vue';
import List from './List.vue';
import Edit from './Edit.vue';
import { $groupIndex, $progressGroup, $progressList } from '@store/progressStore';
import { useStore } from '@nanostores/vue';

const groupIndex = useStore($groupIndex);
const progressGroup = useStore($progressGroup);
const progressList = useStore($progressList);

onMounted(() => {
  $progressList.set($progressGroup.get()?.[groupIndex.value]?.value ?? []);
});

const active = ref();
</script>
<template>
  <Tabs v-model:active="active" class="h-full">
    <Tab title="列表">
      <div class="grid h-full" style="grid-template-rows: 1fr min-content">
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