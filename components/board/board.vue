<template>
  <div class="w-1/2 p-1 m-1">
    <URange
      v-model="size"
      :min="1"
      :max="20"
      label="Board size"
      @change="initBoard"
    />
    <UInput v-model="size" label="Actual size" disabled="" />
  </div>
  <div class="grid grid-cols-3">
    <div class="grid grid-cols-3 text-center text-xl">
      <div></div>
      <MyUIButton @click="moveUp" class="text-center">
        <UIcon
          class="text-xl text-center"
          name="material-symbols:arrow-circle-up-rounded"
        />
      </MyUIButton>
      <div></div>
      <MyUIButton @click="moveLeft" class="text-center">
        <UIcon
          class="text-xl text-center"
          name="material-symbols:arrow-circle-left-rounded"
        />
      </MyUIButton>
      <div></div>
      <MyUIButton @click="moveRight" class="text-center">
        <UIcon
          class="text-xl text-center"
          name="material-symbols:arrow-circle-right-rounded"
        />
      </MyUIButton>
      <div></div>
      <MyUIButton @click="moveDown" class="text-center">
        <UIcon
          class="text-xl text-center"
          name="material-symbols:arrow-circle-down-rounded"
        />
      </MyUIButton>
      <div></div>
    </div>
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
    <div class="grid grid-cols-3 text-center text-xl">
      <div></div>
      <MyUIButton @click="moveUp" class="text-center">
        <UIcon
          class="text-xl text-center"
          name="material-symbols:arrow-circle-up-rounded"
        />
      </MyUIButton>
      <div></div>
      <MyUIButton @click="moveLeft" class="text-center">
        <UIcon
          class="text-xl text-center"
          name="material-symbols:arrow-circle-left-rounded"
        />
      </MyUIButton>
      <div></div>
      <MyUIButton @click="moveRight" class="text-center">
        <UIcon
          class="text-xl text-center"
          name="material-symbols:arrow-circle-right-rounded"
        />
      </MyUIButton>
      <div></div>
      <MyUIButton @click="moveDown" class="text-center">
        <UIcon
          class="text-xl text-center"
          name="material-symbols:arrow-circle-down-rounded"
        />
      </MyUIButton>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const size = ref(8);
const board = ref([]);
var activeCells = ref([]);

onBeforeMount(() => {
  initBoard();
});

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
const toggleActiveCell = (x, y) => {
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
const updateActiveCells = (dx, dy) => {
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

.button-grid {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 50px);
  gap: 5px;
  justify-content: center;
  align-items: center;
}

.button-grid button {
  width: 50px;
  height: 50px;
  font-size: 20px;
}
</style>
