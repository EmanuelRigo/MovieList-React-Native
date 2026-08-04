# Plan de migración: MovieList (Next.js) → React Native + Expo

> **Alcance:** solo **frontend**. El backend Express/Mongoose se mantiene **intacto** y se consume vía REST (mismos endpoints: `/api/movies`, `/api/userMovies`, `/api/users`, `/api/session`).

---

## 1. Tipo de proyecto actual

- **Frontend:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 3
- **Backend (no se migra):** Node/Express + Mongoose + Passport + JWT
- **Monorepo:** sí, dos paquetes (`/` Next.js y `/api` Express)
- **Auth:** JWT en cookie httpOnly `onlineUser` (Passport local + Google OAuth2)

---

## 2. Librerías principales detectadas

| Uso | Librería actual | Equivalente recomendado en React Native + Expo |
|---|---|---|
| Estado global | React Context (`MovieContext.tsx`) | **Zustand** (slices: `useMovieStore`, `useThemeStore`) |
| Fetch/API | `fetch` plano + `credentials: "include"` | **Axios** con interceptor y `withCredentials: true` |
| Caché/sync servidor | `useState` + `useEffect` (`useMovies.ts`) | **TanStack Query** (`@tanstack/react-query`) |
| Formularios | `useState` manual en formularios | **React Hook Form** |
| Validaciones | `isValidUserData.mid.js` (backend) | **Zod** con `@hookform/resolvers` (validación cliente) |
| Navegación | Next.js App Router + `middleware.ts` | **Expo Router** (file-based, grupos `(auth)` / `(app)`) |
| Estilos | Tailwind CSS 3 + `globals.css` | **NativeWind v4** (Tailwind para RN) |
| Manejo de fechas | `new Date()` directo | **date-fns** o **dayjs** |
| Iconos | `react-icons` | **lucide-react-native** |
| Modales | `Modal.tsx` propio + sweetalert2 | `<Modal>` de RN o **react-native-reanimated-modal** |
| Almacenamiento seguro | cookies httpOnly (vía backend) | **expo-secure-store** + **@react-native-cookies/cookies** (mantener la cookie del backend) |
| Tema dark/light | `ThemeProvider` propio + clase CSS | `useColorScheme` + clases `dark:` de NativeWind |
| Tipografías | `next/font` (Geist, Manrope) | `expo-font` + mismas fuentes locales |
| Detección online | `OnlineStatus.tsx` | `@react-native-community/netinfo` |

---

## 3. Pantallas principales (mapeo 1:1)

| Ruta Next.js | Pantalla Expo | Propósito |
|---|---|---|
| `/` | `app/(app)/index.tsx` | Home + lista personal de películas |
| `/list` | `app/(app)/list.tsx` | Catálogo con filtros (formato, género, año, checked, búsqueda) |
| `/add-movie` | `app/(app)/add-movie/index.tsx` | Buscar película para agregar |
| `/add-movie/[id]` | `app/(app)/add-movie/[id].tsx` | Detalle de película a agregar (PUT `/api/userMovies`) |
| `/edit-movie/[id]` | `app/(app)/edit-movie/[id].tsx` | Editar/eliminar película (`PUT` / `DELETE`) |
| `/login` | `app/(auth)/login.tsx` | Inicio de sesión |
| `/register` | `app/(auth)/register.tsx` | Registro |
| `not-found.tsx` | `app/+not-found.tsx` | Pantalla 404 |

---

## 4. Arquitectura mínima recomendada para Expo

```
movielist-app/
├── app/                          # Expo Router (rutas file-based)
│   ├── _layout.tsx               # Root: providers + tema
│   ├── (auth)/
│   │   ├── _layout.tsx           # Redirige si ya hay sesión
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (app)/
│   │   ├── _layout.tsx           # Protegido: useAuthGuard()
│   │   ├── index.tsx             # Home / lista personal
│   │   ├── list.tsx
│   │   ├── add-movie/
│   │   │   ├── index.tsx
│   │   │   └── [id].tsx
│   │   └── edit-movie/
│   │       └── [id].tsx
│   └── +not-found.tsx
├── src/
│   ├── components/               # UI compartido (CardRow, GridCard, etc.)
│   │   ├── list/
│   │   ├── menu/
│   │   ├── movie-viewer/
│   │   └── widgets/
│   ├── hooks/                    # useAuth, useAuthGuard, useDebounce
│   ├── services/                 # Capa de red
│   │   ├── api.ts                # Axios instance (interceptors)
│   │   ├── movies.service.ts
│   │   ├── userMovies.service.ts
│   │   └── users.service.ts
│   ├── stores/                   # Zustand
│   │   ├── movie.store.ts        # viewMode, filtros, movieList
│   │   ├── theme.store.ts
│   │   └── auth.store.ts
│   ├── types/                    # movieTypes.ts (reutilizado tal cual)
│   ├── utils/
│   │   ├── envs.utils.ts
│   │   ├── cookies.utils.ts
│   │   └── date.utils.ts
│   └── queries/                  # TanStack Query hooks
│       ├── useUserMovies.ts
│       ├── useMovie.ts
│       └── useAuth.ts
├── assets/                       # fonts, íconos, imágenes
├── app.config.ts                 # Expo config
├── tailwind.config.js            # NativeWind
├── package.json
└── tsconfig.json
```

---

## 5. Herramientas que YA puedo reutilizar

- **TypeScript** (tipos `MovieDB`, `User`, `UserMoviesResponse`, etc. van tal cual a `src/types/movieTypes.ts`).
- **Toda la lógica de filtros** (`applyAllFilters` con formatos, `checked`, género, año, búsqueda + `normalizeString`).
- **Contratos REST del backend** (mismo `BACKEND_URL`, mismas rutas y shapes).
- **`src/utils/envs.utils.ts`** (se reexporta; en Expo usar `EXPO_PUBLIC_*`).
- **Componentes "puros"** de presentación (la estructura JSX se migra cambiando `div` → `View`, `p` → `Text`, `img` → `Image`, etc.).
- **Modelos conceptuales** (`formats: { vhs, dvd, bluray }`, `checked`, etc.).

---

## 6. Herramientas que debo reemplazar

- **Next.js App Router** → **Expo Router** (rutas file-based)
- **`middleware.ts` (JWT en Edge runtime)** → **`useAuthGuard()`** ejecutado en cada `_layout` protegido
- **Tailwind web** (`globals.css`) → **NativeWind v4** (mismas clases, distintos tags)
- **Context API global** → **Zustand** (mejor performance, menos re-renders, devtools)
- **`fetch` plano** → **Axios** (interceptor para 401, baseURL, `withCredentials`)
- **`useEffect` + `useState` para fetch** (`useMovies.ts`) → **TanStack Query**
- **`react-icons`** → **lucide-react-native**
- **`sweetalert2`** → `Alert.alert()` de RN o `react-native-reanimated-modal`
- **`OnlineStatus` web (navigator.onLine)** → **NetInfo** (`@react-native-community/netinfo`)
- **Next/font** → **expo-font** (cargar Geist/Manrope desde `assets/fonts/`)
- **`react-dom`** (no existe en RN)

---

## 7. Stack recomendado FINAL (priorizado)

1. **Expo SDK 52** + **Expo Router**
2. **TypeScript**
3. **NativeWind v4** (Tailwind para RN)
4. **Zustand** (estado global + tema + filtros)
5. **TanStack Query** (`@tanstack/react-query`) — datos del servidor
6. **Axios** — cliente HTTP con `withCredentials: true`
7. **React Hook Form** + **Zod** — formularios y validación cliente
8. **expo-secure-store** + **@react-native-cookies/cookies** — mantener sesión del backend
9. **expo-font** + **lucide-react-native** — tipografías e íconos
10. **@react-native-community/netinfo** — estado de conexión
11. **react-native-reanimated** — animaciones (modales, drawers)

---

## 8. Plan de migración en 5 pasos

1. **Bootstrap:** `npx create-expo-app@latest movielist-app -t expo-router-ts`; mover `src/types/movieTypes.ts` y la lógica de `envs` a la nueva app; configurar `EXPO_PUBLIC_BACKEND_URL`.
2. **Estilos + tema:** instalar NativeWind v4 (`tailwind.config.js`, `global.css`), replicar `ThemeProvider` como `useThemeStore` (Zustand) con `useColorScheme()` y `dark:` variants; cargar fuentes con `expo-font`.
3. **Auth + red:** crear `src/services/api.ts` con Axios (`baseURL`, `withCredentials`, interceptor 401 → `/login`); reemplazar `MovieContext` por `useMovieStore` (Zustand); mover el fetching a hooks de TanStack Query (`useUserMovies`, `useMovie`, etc.).
4. **Navegación + pantallas:** crear estructura `app/(auth)` y `app/(app)` con Expo Router; convertir páginas Next → screens RN (`View`/`Text`/`FlatList`/`Pressable`), portar `MovieListClient`, `CardRow`, `GridCard`, `CardMovieViewer`, `SettingsFilterModal`, `FooterMainMenu`, etc.; reemplazar `Modal` web por `<Modal>` nativo o librería; iconos con `lucide`.
5. **Protección de rutas + pulido:** implementar `useAuthGuard()` en `app/(app)/_layout.tsx` (lee cookie vía `@react-native-cookies/cookies`, redirige a `(auth)/login` si no hay sesión); portar `OnlineStatus` con NetInfo; reemplazar `sweetalert2` por `Alert.alert()`; probar flujo end-to-end contra el backend real.

---

## Notas para el build en Expo

- Variables de entorno: usar prefijo `EXPO_PUBLIC_` (ej. `EXPO_PUBLIC_BACKEND_URL`).
- En Android emulator el backend corre en `http://10.0.2.2:<puerto>`; en iOS simulator en `http://localhost:<puerto>`; en dispositivo físico, IP LAN de la PC.
- Si el backend usa cookies httpOnly, mantener `withCredentials: true` en Axios y configurar CORS en el backend con `credentials: true` y `origin` explícito (ya debería estarlo).
- Preparar `app.json` con `scheme`, `bundleIdentifier` (iOS) y `package` (Android), y `plugins` para `expo-secure-store` y `expo-font`.
