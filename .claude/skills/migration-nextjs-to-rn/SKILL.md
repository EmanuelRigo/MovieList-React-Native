---
name: migration-nextjs-to-rn
description: Guía de migración de elementos HTML/Next.js a React Native y checklist de conversión.
---

# Migration Next.js to React Native Skill

Esta skill proporciona las equivalencias y la lista de verificación necesaria para convertir componentes web Next.js a React Native con Expo Router.

## Tabla de Equivalencias de Elementos

| Next.js / HTML | React Native               | Observaciones |
| -------------- | -------------------------- | ------------- |
| `div`          | `View`                     | Contenedor básico de layout |
| `span`         | `Text`                     | Todo texto DEBE ir dentro de `Text` |
| `p`            | `Text`                     | Usar clases de NativeWind para márgenes |
| `img`          | `Image`                    | Requiere `source={{ uri: ... }}` para URLs |
| `button`       | `Pressable`                | O `AppButton` reutilizable |
| `Link`         | `Link` de Expo Router      | Importado desde `expo-router` |
| `useRouter`    | `useRouter` de Expo Router | Importado desde `expo-router` |

## Checklist de Migración

- [ ] **Hooks de React:** Conservar lógica no visual; adaptar hooks que accedan al DOM (`window`, `document`).
- [ ] **Context API → Zustand:** Migrar stores globales (`MovieContext` → `useMovieStore`).
- [ ] **fetch plano → Axios + TanStack Query:** Convertir llamadas de red a custom query/mutation hooks.
- [ ] **Tailwind Web → NativeWind v4:** Reemplazar clases CSS web incompatibles por clases nativas.
- [ ] **Formularios → React Hook Form + Zod:** Utilizar los resolutores e inputs de RN (`AppInput`).
- [ ] **Navegación → Expo Router:** Mapear rutas de Next.js App Router a la carpeta `app/`.
- [ ] **Modales Web → `<Modal>` nativo:** Reemplazar librerías web de modales por el componente nativo `Modal` de React Native o `react-native-reanimated`.
