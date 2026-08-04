import { AppButton } from "@/components/ui/app-button";
import { Screen } from "@/components/ui/screen";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useAuthStore } from "@/stores/auth.store";
import { Text } from "react-native";

export default function AppLayout() {
  const { isLoading } = useAuthGuard();
  const logout = useAuthStore((state) => state.logout);

  if (isLoading) {
    return null;
  }

  return (
    <Screen className="justify-center items-center">
      <Text className="text-2xl font-bold text-main mb-4">
        ¡Bienvenido a MovieList!
      </Text>
      <AppButton title="Cerrar sesión" variant="outline" onPress={logout} />
    </Screen>
  );
}
