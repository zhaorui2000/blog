<script setup>
import { ActionSheet, Button, Field, Notify } from 'vant';
import { ref, watch } from 'vue';
import GroupList from '@view/Progress/GroupList.vue';
import { useStore } from '@nanostores/vue';
import { $progressGroup, $progressList } from '@store/progressStore.js';
import { produce } from 'immer';
import ClassIcon from '@components/ClassIcon.vue';

const progressGroup = useStore($progressGroup);
const progressList = useStore($progressList);
const show = ref(false);
const showNotify = ref(false);
const value = ref();

let oldProgressList = [];

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
        <Button class="shrink-0" @click="handleClearList">清空当前列表</Button>
      </div>
      <GroupList class="mt-2"></GroupList>
    </ActionSheet>
    <Notify v-model:show="showNotify" type="warning" @click="handleUndo">
      <span>撤销清空</span>
      <span><ClassIcon icon-class="icon-[material-symbols--undo-rounded]"></ClassIcon></span>
    </Notify>
  </div>
</template>
<style></style>