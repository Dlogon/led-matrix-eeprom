<template>
  <div class="w-full flex flex-row">
    <div class="grid grid-cols-5">
      <div
        v-for="(keyHex, keyLetter) in segmentHex"
        :key="keyHex"
        class="flex justify-center p-3"
      >
        <KeyBoardKey
          class="w-16 h-16"
          :keyLetter="keyLetter"
          :keyHex="keyHex"
          @key-button-clicked="handleKeyButtonClick"
        />
      </div>

      <div class="flex justify-center p-3 col-span-4">
        <KeyBoardKey
          class="w-full h-16"
          keyLetter=" "
          keyHex="00"
          @key-button-clicked="handleKeyButtonClick"
        />
      </div>
    </div>
    <div class="w-full flex flex-col">
      <div class="w-full">
        {{ result }}
        <SharedResultString :result="result" />
      </div>
      <div>
        <SharedResultString :result="currentPhrase" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { segmentHex } from "../../constants/keyHexCodes";
import { ref } from "vue";

import { onMounted, onUnmounted } from "vue";

function handleKeyPress(e: KeyboardEvent) {
  console.log("Key pressed:", e.key);
}

onMounted(() => {
  window.addEventListener("keypress", handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener("keypress", handleKeyPress);
});

var currentMemoryLocation = 0;
var numberOfLettersInLine = 0; // TODO CHANGE THIS, with the option of delete the last letter
const result = ref("");
const currentPhrase = ref("");
var readableResult = ""; // TODO unused variable inherited from the original code

const handleKeyButtonClick = (keyPusehd: {
  keyLetter: string;
  keyHex: string;
}) => {
  const { keyLetter, keyHex } = keyPusehd;
  console.log(keyLetter, keyHex);
  currentPhrase.value = currentPhrase.value + keyLetter;
  handleHex(keyHex);
};

const handleHex = (keyHex: string) => {
  const stringResult: string = keyHex;

  if (!stringResult) return;

  numberOfLettersInLine++;
  if (numberOfLettersInLine == 1) {
    const location = generateLocationString(currentMemoryLocation);
    result.value = result.value + location + stringResult;
  } else if (numberOfLettersInLine == 32) {
    result.value = result.value + stringResult + "\n";
    numberOfLettersInLine = 0;
    currentMemoryLocation += 2;
  } else {
    result.value = result.value + stringResult;
  }

  console.log(result);
};
</script>
