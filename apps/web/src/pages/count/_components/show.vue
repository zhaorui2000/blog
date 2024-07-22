<script setup>
import { $count } from './../_store';
import { useStore } from '@nanostores/vue';
const count = useStore($count);
</script>
<template>
  <div class="text-[200px] flex items-center justify-around">{{ count }}</div>
</template>
<style></style>
