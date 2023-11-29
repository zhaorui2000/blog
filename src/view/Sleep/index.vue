<script setup>
import { onMounted, ref } from 'vue';

const player = ref();

onMounted(async () => {
  const { default: Player } = await import('xgplayer');
  new Player({
    el: player.value,
    url: '/478.mp4',
    fluid: true,
  });
});
</script>

<template>
  <div>
    <div ref="player"></div>
  </div>
</template>

<style scoped></style>