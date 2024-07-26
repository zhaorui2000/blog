<script setup>
import { $count, $isLock, $isFast } from './../_store';
import { useStore } from '@nanostores/vue';
import { Subject, interval } from 'rxjs';
import { ref, watch } from 'vue';
import { log } from '@/store';
const count = useStore($count);
const isLock = useStore($isLock);
const isFast = useStore($isFast);
const subscription = ref();
const time = ref(200);

watch(
  isFast,
  (newV, oldV) => {
    if (newV) {
      time.value = 50;
    } else {
      time.value = 200;
    }
  },
  { immediate: true },
);
const handleTouchLeftStart = function () {
  log.trace('touchLeftStart');
  if (isLock.value) {
    return;
  }
  $count.set(count.value - 1);
  subscription.value = interval(time.value).subscribe(() => {
    $count.set(count.value - 1);
  });
};
const handleTouchRightStart = function () {
  log.trace('touchRightStart');
  if (isLock.value) {
    return;
  }
  $count.set(count.value + 1);
  subscription.value = interval(time.value).subscribe(() => {
    $count.set(count.value + 1);
  });
};
const handleTouchEnd = function () {
  subscription.value?.unsubscribe();
};
</script>
<template>
  <div class="absolute bg-red h-full w-full grid top-0" style="grid-template-columns: 1fr 1fr">
    <div
      class="active:bg-MR opacity-25"
      @touchcancel="handleTouchEnd"
      @touchend="handleTouchEnd"
      @touchstart="handleTouchLeftStart"
    ></div>
    <div
      class="active:bg-MG opacity-25"
      @touchcancel="handleTouchEnd"
      @touchend="handleTouchEnd"
      @touchstart="handleTouchRightStart"
    ></div>
  </div>
</template>
<style></style>
