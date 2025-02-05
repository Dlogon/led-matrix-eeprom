<template>
  <MyUIButton @click="copyToClipboard" class="w-1/2"
    >Copy to Clipboard</MyUIButton
  >
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import AlertToast from "~/composables/useToast";

const props = defineProps({
  result: {
    type: String,
    required: true,
  },
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.result);
  AlertToast.showToast(
    "Copied to clipboard",
    AlertToast.SUCCESS,
    AlertToast.TOP_TOAST_CONTAINER
  );
};
</script>
