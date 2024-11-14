<template>
  <h3
    class="text-center text-lg border-spacing-1 border p-2 m-4 dark:border-gray-200 border-black"
  >
    Move highlight cells, and generate memory bits
  </h3>
  <div class="grid grid-cols-3 text-center text-xl p-10 m-2">
    <div></div>
    <MyUIButton @click="$emit('move-up-save')" class="text-center">
      <UIcon
        class="text-xl text-center"
        name="material-symbols:arrow-circle-up-rounded"
      />
      <UIcon class="text-xl text-center" name="mdi:content-save" />
    </MyUIButton>
    <div></div>
    <MyUIButton @click="$emit('move-left-save')" class="text-center">
      <UIcon
        class="text-xl text-center"
        name="material-symbols:arrow-circle-left-rounded"
      />
      <UIcon class="text-xl text-center" name="mdi:content-save" />
    </MyUIButton>
    <div></div>
    <MyUIButton @click="$emit('move-right-save')" class="text-center">
      <UIcon
        class="text-xl text-center"
        name="material-symbols:arrow-circle-right-rounded"
      />
      <UIcon class="text-xl text-center" name="mdi:content-save" />
    </MyUIButton>
    <div></div>
    <MyUIButton @click="$emit('move-down-save')" class="text-center">
      <UIcon
        class="text-xl text-center"
        name="material-symbols:arrow-circle-down-rounded"
      />
      <UIcon class="text-xl text-center" name="mdi:content-save" />
    </MyUIButton>
    <div></div>
  </div>
</template>
