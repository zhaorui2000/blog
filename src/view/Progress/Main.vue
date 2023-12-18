<script setup>
import { onMounted } from 'vue';
import List from './List.vue';
import Edit from './Edit.vue';
import { $groupIndex, $progressGroup, $progressList } from '@store/progressStore';
import { useStore } from '@nanostores/vue';

const groupIndex = useStore($groupIndex);
const progressGroup = useStore($progressGroup);

onMounted(() => {
  $progressList.set($progressGroup.get()?.[groupIndex.value]?.value ?? []);
});
</script>
<template>
  <div class="grid h-full" style="grid-template-rows: 1fr min-content">
    <List />
    <Edit />
  </div>
</template>
<style></style>