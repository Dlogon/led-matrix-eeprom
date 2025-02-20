<template>
  <section class="w-full p-4">
    <div class="grid grid-cols-2 gap-4">
      <NuxtLink to="/ee/matrix" class="">
        <div class="p-4 rounded-md shadow-md bg-color">
          <p>Matrix</p>
          GO
        </div>
      </NuxtLink>
      <NuxtLink to="/ee/keyboard" class="text-black dark:text-white">
        <div class="p-4 rounded-md shadow-md bg-color">
          <p>EEprom keyboards</p>
          GO
        </div>
      </NuxtLink>
    </div>
    <div class="aspect-w-12 aspect-h-7 mt-4 md:mt-8">
      <iframe
        class="w-full h-full"
        src="https://www.youtube.com/embed/5WH6xbH1iRQ"
        frameborder="5"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </section>
</template>

<script setup></script>
