<template>
  <UBadge
    :class="[{ clicked: isActive }]"
    class="cell w-16 h-16 flex items-center justify-center"
    @click="handleClick"
  ></UBadge>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["cell-clicked"]);

const handleClick = () => {
  emit("cell-clicked", { x: props.x, y: props.y });
};
</script>

<style scoped>
.cell {
  transition: transform 0.3s ease;
  border: #333 solid 1px;
}

.cell:hover {
  cursor: pointer;
  background-color: aqua;
}

.cell.clicked {
  transform: scale(1.05);
  background-color: red;
}
</style>
