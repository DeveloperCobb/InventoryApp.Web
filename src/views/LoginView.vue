<template>
  <div>
    <h1>Welcome to the Inventory App</h1>
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="text" id="email" v-model="email" class="form-control" />
      </div>
      <div>
        <label for="password" class="form-label">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <div>
      Don't have an account? Sign-up <a v-bind:href="'/sign-up'">here</a>.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>
