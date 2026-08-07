import React from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';
import { TopBar } from '../components/top-bar';
import { useAuthGuard } from '../hooks/use-auth-guard';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <RootShell />
    </QueryClientProvider>
  );
}

/**
 * Shell raíz — envuelve todo en SafeAreaView, monta el guard de auth y
 * dibuja la topbar global antes del Stack.
 *
 * El guardián se levanta al root para que el store se hidrate antes de
 * evaluar rutas; antes vivía en (app)/_layout.tsx y la topbar quedaba
 * vacía en /(auth)/login.
 */
function RootShell() {
  useAuthGuard();

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <TopBar />

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
    </SafeAreaView>
  );
}