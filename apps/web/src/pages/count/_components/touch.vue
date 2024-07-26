<script setup>
import { $count, $isLock, $isFast, $isAutoLock } from './../_store';
import { useStore } from '@nanostores/vue';
import { interval, timeout } from 'rxjs';
import { ref, watch } from 'vue';
import { log } from '@/store';
const count = useStore($count);
const isLock = useStore($isLock);
const isFast = useStore($isFast);
const isAutoLock = useStore($isAutoLock);
const autoLockTimer = ref();
const pressSub = ref();
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
watch(isAutoLock, (newV, oldV) => {
  if (newV) {
    autoLockTimer.value = setTimeout(() => {
      $isLock.set(true);
    }, 10000);
  }
});
const commonTouchEvent = function () {
  log.trace('commonTouchEvent');
  if (isLock.value) {
    return false;
  }
  clearTimeout(autoLockTimer.value);
  return true;
};
const handleTouchLeftStart = function () {
  log.trace('touchLeftStart');
  if (!commonTouchEvent()) {
    return;
  }
  $count.set(count.value - 1);
  pressSub.value = interval(time.value).subscribe(() => {
    $count.set(count.value - 1);
  });
};
const handleTouchRightStart = function () {
  log.trace('touchRightStart');
  if (!commonTouchEvent()) {
    return;
  }
  $count.set(count.value + 1);
  pressSub.value = interval(time.value).subscribe(() => {
    $count.set(count.value + 1);
  });
};
const handleTouchEnd = function () {
  log.trace('handleTouchEnd');
  pressSub.value?.unsubscribe();
  if (isAutoLock.value) {
    autoLockTimer.value = setTimeout(() => {
      $isLock.set(true);
    }, 10000);
  }
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
