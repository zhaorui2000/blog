<script setup></script>
<template>
  <div
    class="grid gap-1 text-nowrap pt-6 pl-3 block bg-N2 border border-N4 rounded-lg shadow"
    style="grid-template-rows: min-content 1fr"
  >
    <div class="font-bold text-[1.2em]">
      <slot name="title"></slot>
    </div>
    <div class="grid gap-2 p-6" style="grid-template-columns: min-content 1fr">
      <slot></slot>
    </div>
  </div>
</template>
<style></style>
