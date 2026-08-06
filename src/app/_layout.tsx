import React from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import '../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/*
        Tokens del design system — fondo casi negro (#0a0a0a) + texto claro.
        Aplica al contenedor raíz que envuelve toda la app (incluyendo Stack.Screen).
      */}
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#0a0a0a', // background-primary
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </QueryClientProvider>
  );
}
