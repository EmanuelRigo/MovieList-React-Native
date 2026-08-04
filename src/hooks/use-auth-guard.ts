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
