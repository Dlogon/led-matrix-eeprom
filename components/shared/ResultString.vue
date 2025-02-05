<template>
  <div class="w-1/2 p-1 m-1 h-40 overflow-y-auto overflow-x-hidden">
    <div class="w-full h-1/2 p-2 m-2 break-words whitespace-pre-wrap">
      {{ result }}
    </div>
  </div>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  result: {
    type: String,
    required: true,
  },
});
</script>
