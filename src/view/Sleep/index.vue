<script setup>
import { onMounted, ref } from 'vue';
import { interval, take } from 'rxjs';

const player = ref();

onMounted(async () => {
  const { default: Player } = await import('xgplayer');
  const p = new Player({
    el: player.value,
    url: '/478.mp4',
    width: 648,
    height: 1080,
    fluid: true,
    fitVideoSize: 'fixHeight',
    loop: true,
    pip: true,
  });

  interval(1000)
    .pipe(take(601))
    .subscribe((x) => {
      console.log(x);
      if (x === 600) {
        p.destroy();
      }
    });
});
</script>

<template>
  <div>
    <div ref="player"></div>
  </div>
</template>

<style scoped></style>