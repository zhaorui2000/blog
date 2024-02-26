<script setup>
import { ref } from "vue"


const show = ref(false)
const handleClick = () => {
  show.value = true
};
const handleClickRevoke = ()=>{

}
</script>
<template>
    <van-button type="danger" @click="handleClick"><slot>删除</slot></van-button>
    <van-notify v-model:show="show" type="warning">
      <span>撤销删除</span>
      <van-icon name="revoke" @click="handleClickRevoke" />
    </van-notify>
</template>
<style></style>
