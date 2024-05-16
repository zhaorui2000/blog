<script setup>
import { ref, onMounted } from 'vue';
import Word from '../_utils/Word';
const container = ref(null);
onMounted(() => {
  const word = new Word(container.value);
  word.render();
});
</script>
<template>
  <div ref="container" class="h-full w-full"></div>
</template>
<style></style>
