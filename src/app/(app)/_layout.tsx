import { Stack } from "expo-router";

/**
 * Layout del grupo `(app)` — rutas autenticadas.
 * El guardián de auth vive en el root layout para que el store esté
 * hidratado antes de evaluar rutas; acá solo declaramos las pantallas.
 */
export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}