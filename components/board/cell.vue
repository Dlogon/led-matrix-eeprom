<template>
  <UBadge
    :class="[{ clicked: isActive }]"
    class="cell"
    @click="handleClick"
  ></UBadge>
</template>

<script setup>
import { computed, defineProps } from "vue";

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
  width: 50px;
  height: 50px;
  /* background-color: #3498db; */
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
