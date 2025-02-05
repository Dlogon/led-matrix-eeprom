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
      <div class="flex justify-center p-3 col-span-4">
        <MyUIButton @click="clearAll" class="text-center"> CLEAR </MyUIButton>
      </div>
    </div>
    <div class="w-full flex flex-col">
      <div class="w-full">
        {{ currentMemoryLocation }}
        <SharedCopyToClipboard :result="result" />
      </div>
      <div>
        <SharedResultString :result="currentPhrase" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { segmentHex } from "../../constants/keyHexCodes";

//Cookies
const currentPhrase = useCookie<string>("currentPhrase", { default: () => "" });
const result = useCookie<string>("result", {
  default: () => "",
});

const currentMemoryLocation = useCookie<number>("currentMemoryLocation", {
  default: () => 0,
});

const numberOfLettersInLine = useCookie<number>("numberOfLettersInLine", {
  default: () => 0,
});

//Events
onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);

  // currentMemoryLocation.value = 0;
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyPress);
});

const handleKeyButtonClick = (keyPusehd: {
  keyLetter: string;
  keyHex: string;
}) => {
  const { keyLetter, keyHex } = keyPusehd;
  console.log(keyLetter, keyHex);
  currentPhrase.value = currentPhrase.value + keyLetter;
  handleHex(keyHex);
};

//Functions
/**
 * Handle key press event
 * @param e KeyboardEvent
 */
const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === "Backspace" || e.key === "Delete") {
    onPressDelete();
    return;
  }

  const key = e.key.toUpperCase();
  if (!/^[A-Z ]$/.test(key)) return;
  const segment = segmentHex[key] ?? "00";
  if (segment) {
    currentPhrase.value = currentPhrase.value + key;
    handleHex(segment);
  }
};

const clearAll = () => {
  currentPhrase.value = "";
  result.value = "";
  currentMemoryLocation.value = 0;
  numberOfLettersInLine.value = 0;
};

/**
 * Handle delete button press
 * TODO check if is first memory location
 */
const onPressDelete = () => {
  const currentPhraseValue = currentPhrase.value;
  const resultValue = result.value;

  if (result.value.length > 0) {
    result.value = resultValue.slice(0, -2);
  }
  if (currentPhrase.value.length > 0) {
    currentPhrase.value = currentPhraseValue.slice(0, -1);
  }
  const lastString = result.value.split("\n").pop() || "";

  if (lastString.length == 9) {
    currentMemoryLocation.value = currentMemoryLocation.value - 2 || 0;
    result.value = result.value.slice(0, -9);
    numberOfLettersInLine.value = 0;
  }

  if (currentPhrase.value.length == 0) {
    clearAll();
  }
};

// TODO CHANGE THIS, with the option of delete the last letter

const handleHex = (keyHex: string) => {
  const stringResult: string = keyHex;

  if (!stringResult) return;

  numberOfLettersInLine.value++;
  if (numberOfLettersInLine.value == 1) {
    debugger;
    const location = generateLocationString(currentMemoryLocation.value);
    result.value = result.value + location + stringResult;
  } else if (numberOfLettersInLine.value == 32) {
    result.value = result.value + stringResult + "\n";
    numberOfLettersInLine.value = 0;
    currentMemoryLocation.value += 2;
  } else {
    result.value = result.value + stringResult;
  }
};
</script>
