import React from 'react';
import { Text, View } from 'react-native';
import { useAuthStore } from '../stores/auth.store';

/**
 * TopBar — barra superior global de la app.
 *
 * Muestra el nombre del usuario autenticado. La fuente NO es la cookie en
 * sí (que solo guarda el session id httpOnly): el backend lo devuelve en
 * `POST /api/sessions/online` y se mapea a `user.name` en el auth store.
 *
 * Si no hay sesión activa, no se renderiza (evita mostrar "Invitado"
 * mientras la app está arrancando o en la pantalla de login).
 */
export const TopBar: React.FC = () => {
  const userName = useAuthStore((state) => state.user?.name);

  if (!userName) return null;

  return (
    <View className="px-4 h-14 bg-background-elevated border-b border-border-subtle flex-row items-center">
      <Text className="text-text-primary text-base font-semibold">{userName}</Text>
    </View>
  );
};