<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignUp">
      <div>
        <label for="username" class="form-label">Username:</label>
        <input type="text" v-model="username" ref="username" required class="form-control" v-on:blur="handleUsername" />
      </div>
      <div>
        <label class="form-label" for="email">Email:</label>
        <input type="email" id="email" v-model="email" required class="form-control" />
      </div>
      <div>
        <label class="form-label" for="password">Password:</label>
        <input type="password" id="password" v-model="password" required class="form-control" />
      </div>
      <button type="submit" class="btn btn-success">Sign Up</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/services/apiClient'
import { ref, useTemplateRef } from 'vue'

const usernameInput = useTemplateRef('username')
const username = ref('')
const email = ref('')
const password = ref('')

const handleUsername = async () => {
  if(usernameInput.value){
    usernameInput.value.classList.remove('is-invalid', 'is-valid')
    var response = await api.get<boolean>('/auth/username-exist');
    if(response){
      //Username unavailable
      usernameInput.value.classList.add('is-invalid')
    }
      
    usernameInput.value.classList.add('is-valid')
  }
}

const handleSignUp = () => {
  // Handle sign-up logic here
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>
