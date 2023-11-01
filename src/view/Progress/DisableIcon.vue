<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: Boolean, required: false, default: false },
});
function handleClick() {
  emit('update:modelValue', !props.modelValue);
}
</script>
<template>
  <div
    @click="handleClick"
    :class="{ 'border-N3': !props.modelValue, 'border-MR': props.modelValue }"
    class="flex p-2 border border-solid rounded-full"
  >
    <i
      :class="{
        'icon-[material-symbols--disabled-by-default]': props.modelValue,
        'icon-[material-symbols--disabled-by-default-outline]': !props.modelValue,
      }"
    ></i>
  </div>
</template>
<style></style>
