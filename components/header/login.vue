<template>
  <div class="p-2 m-2">
    <UPopover>
      <UButton label="login" trailing-icon="basil:login-solid" />
      <template #panel>
        <form @submit.prevent="handleLogin">
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </template>
      <div class="dropdown-content"></div>
    </UPopover>
  </div>
</template>

<script setup>
const username = ref("");
const password = ref("");

const handleLogin = () => {
  // Handle login logic here
};
</script>
