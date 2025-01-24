<template>
  <div>
    <p>Visitor Count: {{ visitCount }}</p>
  </div>
</template>

<script setup>
const visitorNumber = useCookie("visitorNumber", {
  maxAge: 60 * 60 * 24 * 7, // 1 week, after that it counts as a new visitor
});

const getVisitors = async () => {
  try {
    if (!visitorNumber.value) {
      const response = await fetch("/api/visitor-count");
      const data = await response.json();
      visitorNumber.value = data;
    }
    return visitorNumber.value;
  } catch (error) {
    console.error("Error fetching visit count:", error);
    return -1;
  }
};

const visitCount = await getVisitors();
</script>

<style scoped></style>
