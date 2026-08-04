import { create } from 'zustand';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  checkAuth: async () => {
    try {
      const response = await api.get('/api/session');
      if (response.data?.user) {
        set({ user: response.data.user, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/api/session/logout');
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
