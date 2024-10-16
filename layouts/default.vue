<!-- <template>
    <div class="min-h-screen flex flex-col">
        <header class="bg-gray-800 text-white p-4">
            <h1 class="text-2xl">Guest Layout</h1>
        </header>
        <main class="flex-grow flex">
            <aside class="w-1/4 bg-gray-200 p-4">
                <h2 class="text-xl mb-4">Login</h2>
                <form @submit.prevent="login">
                    <div class="mb-4">
                        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" v-model="username"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" v-model="password"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
                </form>
            </aside>
            <section class="w-3/4 p-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-md shadow-md">
                        <h2 class="text-xl mb-4">Feature 1</h2>
                        <p>EEprom Phrases</p>
                        <NuxtLink to="f/eeprom-phrases" class="text-blue-500">GO</NuxtLink>
                    </div>
                    <div class="bg-white p-4 rounded-md shadow-md">
                        <h2 class="text-xl mb-4">Feature 2</h2>
                        <p>Matrix</p>
                        <NuxtLink to="f/eeprom-matrix" class="text-blue-500">GO</NuxtLink>
                    </div>
                </div>
            </section>
        </main>
        <footer class="bg-gray-800 text-white p-4 text-center">
            <p>&copy; 2023 Your Company</p>
        </footer>
    </div>
</template> -->

<template>
    <div>
        <slot />
    </div>
</template>

<script setup>

const username = ref('');
const password = ref('');
const login = () => {
    console.log('Logging in with', username.value, password.value);
}

</script>

<style scoped>
/* Add any additional styles here */
</style>