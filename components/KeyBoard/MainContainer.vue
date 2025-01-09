<template>
  <div class="grid grid-cols-4 p-2 w-1/2">
    <div v-for="(keyHex, keyLetter) in segmentHex" :key="keyHex">
      <KeyBoardKey
        :keyLetter="keyLetter"
        :keyHex="keyHex"
        @key-button-clicked="handleKeyButtonClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { segmentHex } from "../../constants/keyHexCodes";

const handleKeyButtonClick = (keyLetter: string, keyHex: string) => {
  console.log(keyLetter, keyHex);
};
</script>
