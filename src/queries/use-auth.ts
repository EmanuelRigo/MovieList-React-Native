import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../schemas/auth.schema";
import { api } from "../services/api";
import { useAuthStore } from "../stores/auth.store";

export const useLoginMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);

  console.log("🚀 ~ useLoginMutation ~ setUser:", setUser);
  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await api.post("/api/session/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.user) {
        setUser(data.user);
      }
    },
  });
};
