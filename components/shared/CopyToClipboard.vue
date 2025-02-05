<template>
  <SharedResultString :result="props.result">
    <CopyToClipboardButton :result="props.result" />
  </SharedResultString>
</template>

<script setup lang="ts">
const props = defineProps({
  result: {
    type: String,
    required: true,
  },
});
</script>
