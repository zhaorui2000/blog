<script setup>
import { NavBar } from 'vant';

function handleClickLeft() {
  location.href = `${location.origin}${location.pathname.split('/').slice(0, -1).join('/')}`;
}
</script>

<template>
  <NavBar left-arrow left-text="返回" @click-left="handleClickLeft"></NavBar>
</template>

<style scoped></style>