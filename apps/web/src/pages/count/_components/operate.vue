<script setup>
import { DelButton, StatusIcon } from '@blog/ui';
import { onMounted, ref } from 'vue';
import { $count, $isLock, $isFast, $isAutoLock } from './../_store';
import { useStore } from '@nanostores/vue';
const count = useStore($count);
const isLock = useStore($isLock);
const isAutoLock = useStore($isAutoLock);
const isFast = useStore($isFast);
onMounted(() => {
  $isLock.set(true);
});
const handleClickRest = function () {
  if (isLock.value) {
    return;
  }
  $count.set(0);
};
</script>
<template>
  <div class="grid gap-x-2" style="grid-template-columns: 1fr min-content">
    <div class="flex gap-x-4 px-4 items-center border border-solid border-N3 rounded-md text-[20px]">
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
      <StatusIcon
        @update:status="(value) => $isAutoLock.set(value)"
        :status="isAutoLock"
        onClass="icon-[material-symbols--time-auto]"
        offClass="icon-[material-symbols--time-auto-outline]"
      ></StatusIcon>
    </div>
    <div>
      <DelButton @click="handleClickRest" :disabled="isLock">重置</DelButton>
    </div>
  </div>
</template>
<style></style>
