<template>
  <UBadge
    class="cell flex items-center justify-center"
    @click="handleKeyButtonClick"
    >{{ props.keyLetter }}</UBadge
  >
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  keyLetter: {
    type: String,
    required: true,
  },
  keyHex: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["key-button-clicked"]);

const handleKeyButtonClick = () => {
  emit("key-button-clicked", {
    keyLetter: props.keyLetter,
    keyHex: props.keyHex,
  });
};
</script>
