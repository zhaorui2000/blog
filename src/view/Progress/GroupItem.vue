<script setup>
import { Cell, Button } from 'vant';
const emit = defineEmits(['del', 'click']);
const props = defineProps({
  title: { type: String, required: false, default: '' },
});
function handleDel() {
  emit('del');
}
function handleClick() {
  emit('click');
}
</script>
<template>
  <Cell :title="props.title" class="flex items-center p-2">
    <template #value>
      <div class="flex gap-2 justify-end">
        <Button type="primary" size="small" icon="success" round @click.prevent="handleClick"></Button>
        <Button type="danger" size="small" icon="delete-o" round @click.prevent="handleDel"></Button>
      </div>
    </template>
  </Cell>
</template>
<style></style>
