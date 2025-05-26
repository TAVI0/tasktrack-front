import api from './api';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types';

export const authService = {
  login: async (dto: LoginRequest): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', dto);
    return data;
  },

  register: async (dto: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', dto);
    return data;
  }
};