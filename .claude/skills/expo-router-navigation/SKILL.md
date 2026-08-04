---
name: expo-router-navigation
description: Configuración de navegación con Expo Router, estructuras de layouts y guardián de autenticación.
---

# Expo Router Navigation Skill

Esta skill define la estructura de navegación en `app/` dividida en grupos `(auth)` y `(app)` con protección de rutas mediante `useAuthGuard`.

## Reglas de Arquitectura
1. La carpeta `app/` contiene **únicamente** la declaración de rutas y layouts de Expo Router.
2. Toda la lógica de negocio y guardias debe residir en `src/`.
3. `app/_layout.tsx` inicializa los providers globales (QueryClientProvider, GestureHandler, etc.).
4. `app/(app)/_layout.tsx` ejecuta `useAuthGuard()` para proteger las rutas privadas.
5. `app/(auth)/_layout.tsx` redirige automáticamente al usuario autenticado hacia `(app)`.
