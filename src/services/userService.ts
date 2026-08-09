import { api } from "./apiClient";

// 1. Define your strongly-typed interfaces
export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CreateUserResponse {
  userId: number;
  isSuccess: boolean;
}

// 2. Define the service endpoints using the generic client
export const userService = {
  // Enforces that this GET returns the UserProfile shape
  getProfile: () => api.get<UserProfile>('/users/profile'),

  // Enforces that this POST returns the CreateUserResponse shape
  createUser: (userData: { email: string; firstName: string }) => 
    api.post<CreateUserResponse>('/users', userData),
};