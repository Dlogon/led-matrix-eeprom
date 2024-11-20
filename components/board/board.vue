<template>
  <div>
    <div class="w-full flex">
      <div class="w-1/2 p-1 m-1">
        <URange
          v-model="size"
          :min="1"
          :max="20"
          label="Board size"
          @change="initBoard"
        />
        <UInput v-model="size" label="Actual size" disabled />
        <div class="grid grid-cols-3">
          <button class="bg-red-600 rounded-lg" @click="reset">Reset</button>
          <div></div>
          <UButton @click="saveMovement">Save movement</UButton>
        </div>
      </div>
      <div class="w-1/2 p-1 m-1 h-40 overflow-y-auto overflow-x-hidden">
        <div class="w-full h-1/2 p-2 m-2 break-words whitespace-pre-wrap">
          {{ result }}
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div class="w-full h-full">
        <BoardMovementsPanel
          @move-up="moveUp"
          @move-down="moveDown"
          @move-left="moveLeft"
          @move-right="moveRight"
        />

        <BoardMovementsSavePanel
          @move-up-save="moveUpSave"
          @move-down-save="moveDownSave"
          @move-left-save="moveLeftSave"
          @move-right-save="moveRightSave"
        />
      </div>
      <div>
        <div class="board">
          <div v-for="(row, y) in board" :key="y" class="row">
            <BoardCell
              v-for="(cell, x) in row"
              :key="x"
              :x="x"
              :y="y"
              :is-active="cell.isActive"
              @cell-clicked="toggleActiveCell(x, y)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type Cell = {
  isActive: boolean;
};

const size = ref(8);
const board = ref<Array<Array<Cell>>>([]);
const activeCells = ref<Array<{ x: number; y: number }>>([]);
var currentMemoryLocation = 0;
var secontStr = 0;

const resultCookie = useCookie<string>("generatedString", {
  default: () => "",
});
const result = ref(resultCookie.value || "");

// Removed unused window variable

onMounted(() => {
  initBoard();
  //reset(); // for clean cookie, it is not working
});

const saveMovement = () => {
  const stringResult = convertArrayToHex();
  if (secontStr == 0) {
    secontStr++;
    const location = generateLocationString(currentMemoryLocation);
    result.value = result.value + location + stringResult;
    console.log(currentMemoryLocation);
    console.log(location);
  } else {
    secontStr++;
    result.value = result.value + stringResult;
    if (secontStr == 4) {
      currentMemoryLocation += 2;
      secontStr = 0;
      result.value = result.value + "\n";
    }
  }

  resultCookie.value = result.value;

  console.log(result.value);
};

const convertArrayToHex = () => {
  // Convertir cada fila de la matriz a hexadecimal
  const hexArray = board.value.map(binaryRowToHex);
  const stringResult = hexArray.join("");
  return stringResult;
};

const generateLocationString = (location: number) => {
  const base16Location = location.toString(16).toUpperCase();
  const locationZeros = base16Location + "000";
  const leftZerosToAdd = 7 - locationZeros.length;
  const resultString = ":2".padEnd(leftZerosToAdd + 2, "0") + locationZeros;

  console.log(resultString);
  return resultString;
};

const reset = () => {
  initBoard();
  result.value = "";
  resultCookie.value = "";
  currentMemoryLocation = 0;
  secontStr = 0;
};

const binaryRowToHex = (row: Array<Cell>) => {
  const bynaryRow = row.map((cell) => (cell.isActive ? 1 : 0));
  const binaryString = bynaryRow.join("");
  const hexString = parseInt(binaryString, 2)
    .toString(16)
    .toUpperCase()
    .padStart(2, "0");
  return hexString;
};

const HexRowToBinary = (row: string) => {
  const binaryRow = parseInt(row, 16).toString(2).padStart(8, "0");
  return binaryRow;
};

const initBoard = () => {
  board.value = [];
  activeCells.value = [];
  for (let y = 0; y < size.value; y++) {
    const row = [];
    for (let x = 0; x < size.value; x++) {
      row.push({ isActive: false });
    }
    board.value.push(row);
  }
};

// Toggle individual cells' active state
const toggleActiveCell = (x: number, y: number) => {
  board.value[y][x].isActive = !board.value[y][x].isActive;
  if (board.value[y][x].isActive) {
    activeCells.value.push({ x, y });
  } else {
    activeCells.value = activeCells.value.filter(
      (cell) => cell.x !== x || cell.y !== y
    );
  }
};

// Update active cells during movement
const updateActiveCells = (dx: number, dy: number, save: boolean = false) => {
  if (save) {
    saveMovement();
  }

  const newActiveCells = activeCells.value.map(({ x, y }) => {
    const newX = (x + dx + size.value) % size.value;
    const newY = (y + dy + size.value) % size.value;
    return { x: newX, y: newY };
  });

  // Reset the board's active state before setting new positions
  board.value.forEach((row) => row.forEach((cell) => (cell.isActive = false)));

  // Set new active cells
  newActiveCells.forEach(({ x, y }) => {
    board.value[y][x].isActive = true;
  });

  activeCells.value = newActiveCells;
};

// Movement functions
const moveUp = () => updateActiveCells(0, -1);
const moveDown = () => updateActiveCells(0, 1);
const moveLeft = () => updateActiveCells(-1, 0);
const moveRight = () => updateActiveCells(1, 0);

const moveUpSave = () => updateActiveCells(0, -1, true);
const moveDownSave = () => updateActiveCells(0, 1, true);
const moveLeftSave = () => updateActiveCells(-1, 0, true);
const moveRightSave = () => updateActiveCells(1, 0, true);
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row {
  display: flex;
}
</style>
