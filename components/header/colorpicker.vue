<template>
  <div class="p-2 m-2">
    <UIcon
      name="i-heroicons-paint-brush"
      class="w-5 h-5"
      @click="isModalOpen = true"
    />

    <UModal v-model="isModalOpen">
      <UAlert title="Select a color for componets" />
      <div class="grid grid-cols-8 p-2 m-2">
        <div
          v-for="available in colors"
          :key="available"
          class="w-10 h-8 rounded-full cursor-pointer m-0"
          :style="{ backgroundColor: available }"
          @click="updateColor(available)"
        ></div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const color = ref("#3490dc");
const isModalOpen = ref(false);
const selectedColorCookie = useCookie("selectedColors");

const colors = [
  "#3498db", // Blue
  "#e74c3c", // Red
  "#f1c40f", // Yellow
  "#2ecc71", // Green
  "#9b59b6", // Purple
  "#34495e", // Dark Blue
  "#1abc9c", // Teal
  "#e67e22", // Orange
  "#ecf0f1", // Light Gray
  "#95a5a6", // Gray
  "#c0392b", // Dark Red
  "#2980b9", // Darker Blue
  "#d35400", // Dark Orange
  "#16a085", // Dark Teal
  "#8e44ad", // Dark Purple
  "#2c3e50", // Midnight Blue
  "#27ae60", // Dark Green
  "#f39c12", // Amber
  "#bdc3c7", // Silver
  "#7f8c8d", // Dark Gray
];

onMounted(() => {
  setColorFromCookie();
  console.log("Color picker mounted");
  console.log("Selected color", selectedColorCookie.value);
});

const setColorFromCookie = () => {
  if (selectedColorCookie.value) {
    updateColor(selectedColorCookie.value);
  }
};

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r} ${g} ${b}`;
};

const updateColor = (selectedColor: string) => {
  const rgbColor = hexToRgb(selectedColor);
  document.documentElement.style.setProperty("--color-primary-400", rgbColor);
  document.documentElement.style.setProperty("--color-primary-500", rgbColor);
  document.documentElement.style.setProperty("--main-bg-color", rgbColor);
  selectedColorCookie.value = selectedColor;
  isModalOpen.value = false;
};

// watch(color, updateColor);
</script>

<style>
:root {
  --main-bg-color: #f1f1f1;
}
</style>
