import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth.store";

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log("🚀 ~ AuthLayout ~ isAuthenticated:", isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(app)" as any);
    }
  }, [isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
