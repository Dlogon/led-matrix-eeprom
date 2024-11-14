<template>
  <div>
    <p>Visit Count: {{ visitCount }}</p>
  </div>
</template>

<script setup>
const getVisitors = async () => {
  try {
    const response = await fetch("/api/page-count");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching visit count:", error);
  } finally {
  }
};

const visitCount = await getVisitors();
</script>

<style scoped></style>
