<script setup>
import { ActionSheet, Button, Field } from 'vant';
import { ref, watch } from 'vue';
import GroupList from '@view/Progress/GroupList.vue';
import { useStore } from '@nanostores/vue';
import { $progressGroup, $progressList } from '@store/progressStore.js';
import { produce } from 'immer';
const progressGroup = useStore($progressGroup);
const progressList = useStore($progressList);
const show = ref(false);
const value = ref();
function handleClick() {
  show.value = true;
}
function handleSave() {
  $progressGroup.set(
    produce($progressGroup.get(), (draft) => {
      draft = [...draft, { title: value.value, value: $progressList.get() }];
      return draft;
    }),
  );
  value.value = '';
}
watch(show, (newV) => {
  if (newV) {
    value.value = '';
  }
});
</script>
<template>
  <div>
    <Button class="w-full" round @click="handleClick">分组</Button>
    <ActionSheet v-model:show="show" title="分组">
      <div class="flex">
        <Field v-model="value" placeholder="分组名"></Field>
        <Button class="shrink-0" @click="handleSave">保存当前列表</Button>
        <Button class="shrink-0">清空当前列表</Button>
      </div>
      <GroupList class="mt-2"></GroupList>
    </ActionSheet>
  </div>
</template>
<style></style>
