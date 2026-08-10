<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignUp" novalidate>
      <!-- Email Field -->
      <div class="mb-3">
        <label class="form-label" for="email">Email:</label>
        <input 
          id="email"
          type="email"
          v-model="email"
          class="form-control"
          :class="{'is-invalid': errors.email, 'is-valid': touched.email && !errors.email}"
          @blur="handleEmail"
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <!-- Username Field -->
      <div class=" mb-3">
        <label for="username" class="form-label">Username:</label>
        <input 
          id="username"
          type="text"
          v-model="username"
          class="form-control"
          :class="{'is-invalid' : errors.username, 'is-valid': touched.username && !errors.username}"
          @blur="handleUsername"
        />
        <div class="invalid-feedback">{{ errors.username }}</div>
      </div>

      <div class="mb-3 small text-muted">
        Username has the following criteria:
        <ul>
          <li>Betweeen 8 and 15 characters long</li>
          <li>Only contain letters and numbers</li>
        </ul>
      </div>

      <!-- Password Field -->
      <div class="mb-3">
        <label class="form-label" for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="password"
          class="form-control"
          :class="{'is-invalid': errors.password, 'is-valid': touched.password && !errors.password}"
          @blur="handlePassword"
        />
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <div class="mb-3 small text-muted">
        Password has the following criteria:
        <ul>
          <li>Must contain on special character (e.g. !, @, #, $, %, ^, &, *)</li>
          <li>One uppercase letter</li>
          <li>One lowercase letter</li>
          <li>Between 8 and 20 characters long</li>
        </ul>
      </div>

      <button type="submit" class="btn btn-success w-100">Sign Up</button>
      <div v-if="errors.signup" class="alert alert-danger mt-3" role="alert">
        {{ errors.signup }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/services/apiClient'
import { ValidationUtils } from '@/utils/validationUtils'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const signup = ref('')

const errors = reactive({
  email: '',
  username: '',
  password: '',
  signup: ''
})

const touched = reactive({
  email: false,
  username: false,
  password: false
})

const handleEmail = async (): Promise<boolean> => {
  touched.email = true
  
  if (!email.value) {
    errors.email = 'Email is required.'
    return false
  }

  if (!ValidationUtils.isValidEmail(email.value)) {
    errors.email = 'Please enter a valid email address.'
    return false
  }

  try {
    // Pass the email value as a query parameter to your endpoint
    const data = await api.get<boolean>(`/auth/email-exist?email=${encodeURIComponent(email.value)}`)
    if (data) {
      errors.email = 'Email is already registered.'
      return false
    }
  } catch {
    errors.email = 'Could not verify email availability. Try again.'
    return false
  }

  errors.email = '' // Passes validation
  return true
}

const handleUsername = async () : Promise<boolean> => {
  touched.username = true

  if (!username.value) {
    errors.username = 'Username is required.'
    return false
  }

  if (!ValidationUtils.isValidUsername(username.value)) {
    errors.username = 'Username must be 8-15 characters and strictly alphanumeric.'
    return false
  }

  try {
    const data = await api.get<boolean>(`/auth/username-exist?username=${encodeURIComponent(username.value)}`)
    if (data) {
      errors.username = 'Username is already taken.'
      return false
    }
  } catch {
    errors.username = 'Could not verify username availability. Try again.'
    return false
  }

  errors.username = '' // Passes validation
  return true
}

const handlePassword = (): boolean => {
  touched.password = true

  if (!password.value) {
    errors.password = 'Password is required.'
    return false
  }

  if (!ValidationUtils.isValidPassword(password.value)) {
    errors.password = 'Password does not meet the complexity criteria.'
    return false
  }

  errors.password = '' // Passes validation
  return true
}

const handleSignUp = async () => {
  // Trigger all validations concurrently on form submission
  const isEmailValid = await handleEmail()
  const isUsernameValid = await handleUsername()
  const isPasswordValid = handlePassword()

  if (!isEmailValid || !isUsernameValid || !isPasswordValid) {
    console.log('Submission blocked: Form contains validation errors.')
    return
  }

  try {
    console.log('Form data valid. Sending payload to CreateUserEndpoint...')
    const payload = {
      username: username.value,
      email: email.value,
      password: password.value
    }
    
    await api.post('/auth/user', payload)
    
    await router.push({path: '/login', query: { signupSuccess: 'true'}})

  } catch (err) {
    errors.signup = 'Something went wrong'
    return
  }
}
</script>
