<script setup></script>
<template>
  <div
    class="bg-N1 grid w-screen h-full overflow-hidden"
    style="
      grid-template-rows:
        min-content 1fr
        min-content;
    "
  >
    <div><slot name="header"></slot></div>
    <div class="overflow-y-hidden p-2 pt-0">
      <div class="h-2"></div>
      <slot>
        <van-empty />
      </slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style></style>
