import { create } from "zustand";
import { api } from "../services/api";

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
      // Equivalente a fetch con { method: "POST", credentials: "include",
      // headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) }.
      // El cliente axios ya define withCredentials:true y Content-Type,
      // y api.post fuerza el método POST. Se envía {} como body explícito.
      const response = await api.post("/api/sessions/online", {});
      // El backend devuelve el usuario en data.response
      // (no en data.user). Campos: { user_id, email, firstName, username, role, mode, isOnline }.
      const u = response.data?.response;
      if (u?.user_id) {
        set({
          user: {
            id: u.user_id,
            email: u.email,
            name: u.firstName ?? u.username,
          },
          isAuthenticated: true,
        });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/api/session/logout");
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
