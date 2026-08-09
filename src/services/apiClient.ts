import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// 1. Create the base Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

// 2. Async Request Interceptor
// Useful if you need to await a token refresh or a secure storage retrieval
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // You can now safely use 'await' here if you ever switch from localStorage 
    // to an async storage engine (like IndexedDB, Capacitor Secure Storage, etc.)
    const token = localStorage.getItem('auth_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Generic Wrapper Methods using async/await
export const api = {
  get: async <T>(url: string, config = {}): Promise<T> => {
    const res: AxiosResponse<T> = await apiClient.get(url, config);
    return res.data;
  },

  post: async <T>(url: string, data = {}, config = {}): Promise<T> => {
    const res: AxiosResponse<T> = await apiClient.post(url, data, config);
    return res.data;
  },

  put: async <T>(url: string, data = {}, config = {}): Promise<T> => {
    const res: AxiosResponse<T> = await apiClient.put(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config = {}): Promise<T> => {
    const res: AxiosResponse<T> = await apiClient.delete(url, config);
    return res.data;
  },
};
