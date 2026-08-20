<template>
  <div>
    <h1 class="text-center">Welcome to the Inventory App</h1>
    <form class="mx-auto" style="max-width: 400px;">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="text" id="email" v-model="email" class="form-control" tabindex="1" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" tabindex="2" />
      </div>
      <div class="mb-3 text-center">
        <button type="submit" class="btn btn-primary" tabindex="3">Login</button>
      </div>
    </form>
    <div class="text-center">
      Don't have an account? Sign-up <a v-bind:href="'/sign-up'">here</a>.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>
