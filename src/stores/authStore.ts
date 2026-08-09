import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

// Define the shape of our User metadata
export interface User {
  id: number;
  email: string;
  firstName?: string;
}

export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  const token = ref<string | null>(localStorage.getItem('auth_token'));
  const user = ref<User | null>(null);

  // --- Getters ---
  const isAuthenticated = computed(() => !!token.value);

  // --- Actions ---
  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('auth_token', newToken);
  }

  function setUser(userData: User) {
    user.value = userData;
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('auth_token');
    
    // Optional: Redirect user to login page using vue-router
    window.location.href = '/login';
  }

  async function handleGoogleLogin(idToken: string) {
    try {
      // Call your FastEndpoints Google Sign-Up endpoint using your base configuration
      const response = await axios.post<{ token: string; email: string }>(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`, 
        { idToken }
      );
      
      // Save data to store state and local storage
      setToken(response.data.token);
      setUser({
        id: 0, // In a real app, parse this from the JWT or have the API return it
        email: response.data.email
      });
      
      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    logout,
    handleGoogleLogin
  };
});
