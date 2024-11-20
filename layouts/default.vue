<template>
  <div>
    <header
      class="dark:bg-gray-800 bg-gray-200 dark:text-white text-gray-800 p-4"
    >
      <div class="flow-root w-full">
        <h1 class="text-2xl float-left">
          <NuxtLink href="/"> EEprom memory</NuxtLink>
        </h1>
        <div class="float-none"></div>
        <div class="float-right flex">
          <HeaderColorpicker />
          <ClientOnly fallback-tag="span">
            <HeaderThemeChange />
          </ClientOnly>

          <HeaderLogin />
          <Suspense>
            <VisitCounter />

            <template #fallback>
              <div>
                Loading...
                <div class="spinner"></div>
              </div>
            </template>
          </Suspense>
        </div>
      </div>
      <div class="text-center text-xl"></div>
    </header>
    <main
      class="flex-grow flex dark:bg-gray-800 bg-gray-200 dark:text-white text-gray-800"
    >
      <slot />
    </main>
    <footer
      class="bg-gray-800 text-white p-4 text-center fixed bottom-0 w-full"
    >
      <p>
        2024
        <a href="https://github.com/dlogon"
          >Dlogon <UIcon name="grommet-icons:github"></UIcon
        ></a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import VisitCounter from "~/components/VisitCounter.vue";

const defineProps = {
  title: String,
};

const username = ref("");
const password = ref("");
const login = () => {
  console.log("Logging in with", username.value, password.value);
};
</script>

<style>
@import url("~/assets/css/styles.css");
</style>
