import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import { AppButton } from "@/components/ui/app-button";
import { Screen } from "@/components/ui/screen";
import { SearchBar } from "@/components/ui/search-bar";
import { useAuthStore } from "@/stores/auth.store";

/**
 * Home — pantalla principal post-login.
 * Solo maquetado: SearchBar arriba, mensaje de bienvenida y botón logout.
 */
export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login" as any);
  };

  return (
    <Screen>
      <View className="mt-2 mb-6">
        <SearchBar placeholder="Buscar películas, series…" />
      </View>

      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-text-primary mb-2">
          ¡Bienvenido a MovieList!
        </Text>
        <Text className="text-text-secondary text-sm mb-6 text-center">
          Empezá a explorar tu colección de películas y series.
        </Text>
        <AppButton title="Cerrar sesión" variant="outline" onPress={handleLogout} />
      </View>
    </Screen>
  );
};