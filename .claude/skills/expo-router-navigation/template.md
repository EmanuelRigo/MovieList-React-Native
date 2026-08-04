### `app/_layout.tsx`

```tsx
import React from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </QueryClientProvider>
  );
}
```

### `app/(auth)/_layout.tsx`

```tsx
import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuthStore } from '../../src/stores/auth.store';

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(app)');
    }
  }, [isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
```

### `app/(app)/_layout.tsx`

```tsx
import React from 'react';
import { Stack } from 'expo-router';
import { useAuthGuard } from '../../src/hooks/use-auth-guard';

export default function AppLayout() {
  const { isLoading } = useAuthGuard();

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="list" />
      <Stack.Screen name="add-movie/index" />
      <Stack.Screen name="add-movie/[id]" />
      <Stack.Screen name="edit-movie/[id]" />
    </Stack>
  );
}
```

### `src/hooks/use-auth-guard.ts`

```tsx
import { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../stores/auth.store';

export const useAuthGuard = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAppGroup = segments[0] === '(app)';

    if (!isAuthenticated && inAppGroup) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, isLoading, segments]);

  return { isLoading, isAuthenticated };
};
```
