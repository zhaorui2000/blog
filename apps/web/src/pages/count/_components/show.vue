<script setup>
import { $count } from './../_store';
import { useStore } from '@nanostores/vue';
const count = useStore($count);
</script>
<template>
  <div class="h-full select-none text-[200px] flex items-center justify-around bg-W">
    <div>{{ count }}</div>
  </div>
</template>
<style></style>
