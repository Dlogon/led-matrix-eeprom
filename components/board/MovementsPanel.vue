<template>
  <h3
    class="text-center text-lg border-spacing-1 border p-2 m-4 dark:border-gray-200 border-black"
  >
    Move highlight cells
  </h3>
  <div class="grid grid-cols-3 text-center text-xl p-10 m-2">
    <div></div>
    <MyUIButton @click="$emit('move-up')" class="text-center">
      <UIcon
        class="text-xl text-center"
        name="material-symbols:arrow-circle-up-rounded"
      />
    </MyUIButton>
    <div></div>
    <MyUIButton @click="$emit('move-left')" class="text-center">
      <UIcon
        class="text-xl text-center"
        name="material-symbols:arrow-circle-left-rounded"
      />
    </MyUIButton>
    <div></div>
    <MyUIButton @click="$emit('move-right')" class="text-center">
      <UIcon
        class="text-xl text-center"
        name="material-symbols:arrow-circle-right-rounded"
      />
    </MyUIButton>
    <div></div>
    <MyUIButton @click="$emit('move-down')" class="text-center">
      <UIcon
        class="text-xl text-center"
        name="material-symbols:arrow-circle-down-rounded"
      />
    </MyUIButton>
    <div></div>
  </div>
</template>
