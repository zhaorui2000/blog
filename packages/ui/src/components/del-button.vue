<script setup>
import { ref } from 'vue';
const emit = defineEmits(['onRevoke']);
const show = ref(false);
const handleClick = () => {
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 7000);
};
const handleClickRevoke = () => {
  show.value = false;
  emit('onRevoke');
};
</script>
<template>
  <div class="inline">
    <van-button type="danger" @click="handleClick"><slot>删除</slot></van-button>
    <van-notify position="bottom" v-model:show="show" type="warning" @click="handleClickRevoke">
      <span>删除成功，点击撤销删除 </span>
      <van-icon name="revoke" size="1rem" />
    </van-notify>
  </div>
</template>
<style></style>
