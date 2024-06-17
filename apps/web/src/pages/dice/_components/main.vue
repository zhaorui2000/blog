<script setup>
import { ref, onMounted } from 'vue';
import Word from '../_utils/World';
const container = ref(null);
onMounted(() => {
  const word = new Word(container.value);
  word.start();
});
</script>
<template>
  <div ref="container" class="h-full w-full"></div>
</template>
<style></style>