<script setup>
import { $count } from './../_store';
import { useStore } from '@nanostores/vue';
const count = useStore($count);
function handleClickLeft() {
  $count.set(count.value - 1);
}
function handleClickRight() {
  $count.set(count.value + 1);
}
</script>
<template>
  <div class="absolute bg-red h-full w-full grid" style="grid-template-columns: 1fr 1fr">
    <div class="active:bg-MR opacity-25" @click="handleClickLeft"></div>
    <div class="active:bg-MG opacity-25" @click="handleClickRight"></div>
  </div>
</template>
<style></style>
