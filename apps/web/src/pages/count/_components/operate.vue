<script setup>
import { DelButton, StatusIcon } from '@blog/ui';
import { ref } from 'vue';
import { $count, $isLock, $isFast } from './../_store';
import { useStore } from '@nanostores/vue';
const count = useStore($count);
const isLock = useStore($isLock);
const isFast = useStore($isFast);
const handleClickRest = function () {
  $count.set(0);
};
</script>
<template>
  <div class="grid gap-x-2" style="grid-template-columns: 1fr min-content">
    <div class="flex items-center border border-solid border-N3 rounded-md">
      <StatusIcon
        @update:status="(value) => $isLock.set(value)"
        :status="isLock"
        offClass="icon-[material-symbols--lock-open-outline]"
        onClass="icon-[material-symbols--lock]"
      ></StatusIcon>
      <StatusIcon
        @update:status="(value) => $isFast.set(value)"
        :status="isFast"
        offClass="icon-[material-symbols--fast-forward-outline]"
        onClass="icon-[material-symbols--fast-forward]"
      ></StatusIcon>
    </div>
    <div>
      <DelButton @click="handleClickRest">重置</DelButton>
    </div>
  </div>
</template>
<style></style>
