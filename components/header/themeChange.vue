<template>
  <div class="flex items-center justify-between">
    <button
      @click="toggleTheme"
      type="button"
      class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    >
      <svg
        :class="{ hidden: isDark }"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        ></path>
      </svg>
      <svg
        :class="{ hidden: !isDark }"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1
                    1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { isDarkTheme } from "@/theme";

const isDark = ref(false);
const localStorage = window.localStorage;

const isDarkTheme = (): boolean => {
  return (
    window.localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};

const setTheme = (theme: "light" | "dark"): void => {
  window.localStorage.setItem("color-theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
};

// Change the icons inside the button based on previous settings
if (isDarkTheme()) {
  isDark.value = true;
} else {
  isDark.value = false;
}

const toggleTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.remove("dark");
    window.localStorage.setItem("color-theme", "light");
    isDark.value = false;
  } else {
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("color-theme", "dark");
    isDark.value = true;
  }
};
</script>
