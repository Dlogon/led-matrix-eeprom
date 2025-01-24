<template>
  <div>
    <p>Page Count: {{ pageVisitCount }}</p>
  </div>
</template>

<script setup>
const pageVisitCount = ref(0);

const route = useRoute();

const getVisitors = async () => {
  try {
    const response = await fetch("/api/page-count");
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching visit count:", error);
    return -1;
  }
};

watch(
  () => route.path,
  async () => {
    pageVisitCount.value = await getVisitors();
  },
  { immediate: true }
);
</script>

<style scoped></style>
