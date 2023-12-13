<script setup>
import { ActionSheet, Button, Field, Notify } from 'vant';
import { ref } from 'vue';
import GroupList from '@view/Progress/GroupList.vue';
import { useStore } from '@nanostores/vue';
import { $groupIndex, $progressGroup, $progressList } from '@store/progressStore.js';
import ClassIcon from '@components/ClassIcon.vue';
import { produce } from 'immer';

const progressGroup = useStore($progressGroup);
const progressList = useStore($progressList);
const groupIndex = useStore($groupIndex);
const show = ref(false);
const showNotify = ref(false);
const value = ref();

let oldProgressList = [];

function handleClick() {
  show.value = true;
  value.value = progressGroup.value[groupIndex.value]?.title ?? '';
}

function handleClearList() {
  oldProgressList = $progressList.get();
  $progressList.set([]);
  show.value = false;
  showNotify.value = true;
  setTimeout(() => {
    showNotify.value = false;
  }, 5000);
}

function handleUndo() {
  showNotify.value = false;
  $progressList.set(oldProgressList);
}

function handleRenameGroup() {
  $progressGroup.set(
    produce($progressGroup.get(), (draft) => {
      draft[$groupIndex.get()].title = value.value;
    }),
  );
}

function handleAddGroup() {
  $progressGroup.set(
    produce($progressGroup.get(), (draft) => {
      draft.push({ title: value.value, value: [] });
    }),
  );
}
</script>
<template>
  <div>
    <Button class="w-full" round @click="handleClick">分组</Button>
    <ActionSheet v-model:show="show" class="bg-N1" title="分组">
      <div class="flex">
        <Field v-model="value" border label="分组名"></Field>
      </div>
      <div class="grid gap-2 p-2" style="grid-template-rows: 1fr 1fr; grid-template-columns: 1fr 1fr">
        <Button class="shrink-0" @click="handleRenameGroup">重命名</Button>
        <Button class="shrink-0" type="primary" @click="handleAddGroup">新分组</Button>
        <Button class="shrink-0" type="danger" @click="handleClearList">清空列表</Button>
        <Button class="shrink-0" type="danger">删除分组</Button>
      </div>
      <GroupList class="mt-2"></GroupList>
    </ActionSheet>
    <Notify v-model:show="showNotify" position="bottom" type="warning" @click="handleUndo">
      <span>撤销清空</span>
      <span><ClassIcon icon-class="icon-[material-symbols--undo-rounded]"></ClassIcon></span>
    </Notify>
  </div>
</template>
<style></style>