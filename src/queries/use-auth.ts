import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../schemas/auth.schema";
import { api } from "../services/api";
import { useAuthStore } from "../stores/auth.store";

export const useLoginMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await api.post("/api/sessions/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("🚀 ~ useLoginMutation ~ data:", data);
      // Si el backend devuelve el mismo shape que /api/sessions/online
      // ({ response: { user_id, email, firstName, username, ... } }),
      // leer de data.response y mapear al shape User del store.
      const u = data?.response ?? data?.user;
      if (u?.user_id) {
        setUser({
          id: u.user_id,
          email: u.email,
          name: u.firstName ?? u.username,
        });
      } else if (u) {
        // Fallback para un shape distinto (p. ej. data.user ya mapeado).
        setUser(u);
      }
    },
  });
};
