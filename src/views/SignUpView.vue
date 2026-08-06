<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignUp">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleSignUp = () => {
  // Handle sign-up logic here
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>
