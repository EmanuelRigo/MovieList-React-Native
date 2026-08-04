---
name: screen-generator
description: Generación estandarizada de pantallas y sus componentes asociados en React Native + Expo.
---

# Screen Generator Skill

Esta skill genera el flujo completo de una pantalla dividida ordenadamente entre el punto de entrada de Expo Router, la pantalla contenedora, la vista de presentación y el hook de datos.

## Estructura generada
```text
app/(app)/movies/[id].tsx
src/screens/movies/movie-details.screen.tsx
src/components/movies/movie-details.tsx
src/queries/use-movie.ts
```

## Reglas
1. Usar `SafeAreaView` y `ScrollView`.
2. Usar estilos NativeWind v4.
3. Tipado estricto en props y params.
4. Sin `StyleSheet.create()`.
