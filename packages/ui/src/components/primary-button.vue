<script setup>
import { Subject, debounceTime } from 'rxjs';
import { ref } from 'vue';
const emit = defineEmits(['click']);
const subject = new Subject();
const isWait = ref(false);
subject.pipe(debounceTime(700)).subscribe(() => {
  isWait.value = false;
});
const handleClick = () => {
  if (!isWait.value) {
    emit('click');
  }
  isWait.value = true;
  subject.next();
};
</script>
<template>
  <van-button type="primary" @click="() => handleClick()"><slot></slot></van-button>
</template>
<style></style>
