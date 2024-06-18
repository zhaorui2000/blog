<script setup>
import { ref, onMounted } from 'vue';
import MainSence from '../_utils/MainSence';
const container = ref(null);
onMounted(async function() {
  const mainSence = new MainSence(container.value);
  await mainSence.init()
  mainSence.start();
});
</script>
<template>
  <div ref="container" class="h-full w-full"></div>
</template>
<style></style>