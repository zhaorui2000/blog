<script setup>
import { $count } from './../_store';
import { useStore } from '@nanostores/vue';
import { Subject, interval } from 'rxjs';
import { ref } from 'vue';
import { log } from '@/store';
const count = useStore($count);
const subscription = ref();

const handleTouchLeftStart = function () {
  log.trace('touchLeftStart');
  $count.set(count.value - 1);
  subscription.value = interval(200).subscribe(() => {
    $count.set(count.value - 1);
  });
};
const handleTouchRightStart = function () {
  log.trace('touchRightStart');
  $count.set(count.value + 1);
  subscription.value = interval(200).subscribe(() => {
    $count.set(count.value + 1);
  });
};
const handleTouchEnd = function () {
  subscription.value.unsubscribe();
};
</script>
<template>
  <div class="absolute bg-red h-full w-full grid" style="grid-template-columns: 1fr 1fr">
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
