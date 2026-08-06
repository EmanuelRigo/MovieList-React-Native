# MovieList — Design System Spec (portable)

Spec portable del design system de MovieList, extraído de `src/app/globals.css` + `tailwind.config.ts`. Pensado para que un agente IA lo replique en otra app (recomendado: clon en React Native).

> Si vas a portar esto a React Native, los hex se mantienen iguales, las CSS variables se traducen a un objeto `colors` / `theme` en TypeScript, las animaciones de marquee y scrollbars pasan a `Animated` / `FlatList` / librerías nativas, y el grid responsive se reemplaza por `flex` + `Dimensions` / `useWindowDimensions`.

---

## 1. Identidad visual

- **Estética**: cinematográfica, fondo oscuro casi negro, un único accent cálido (amarillo) para CTAs / foco / estado activo.
- **Tipografía base**: `Arial, Helvetica, sans-serif` (sustituir en RN por `System` o una sans-serif del sistema: `Platform.OS === 'ios' ? 'System' : 'Roboto'`).
- **Modo claro vs oscuro**: el proyecto está pensado para un look oscuro. El modo claro invierte solo `--background` y `--foreground`; el resto de tokens ya son oscuros por diseño (no hay una versión "light" del accent).

---

## 2. Tokens de color (CSS custom properties)

Definidos en `:root` y consumidos vía Tailwind. En React Native se traducen 1:1 a un objeto `colors`.

### Backgrounds (capas de profundidad)

| Token                    | Hex       | Uso típico                                     |
| ------------------------ | --------- | ---------------------------------------------- |
| `--background`           | `#ffffff` | Fondo raíz. En dark mode: `#0a0a0a`.           |
| `--foreground`           | `#171717` | Color de texto raíz. En dark mode: `#ededed`.  |
| `--background-primary`   | `#0a0a0a` | Shell principal (casi negro).                  |
| `--background-secondary` | `#121212` | Paneles secundarios, fondo de inputs elevados. |
| `--background-elevated`  | `#1a1a1a` | Header, cards, modals, widgets elevados.       |

### Surfaces (estados de elementos interactivos)

| Token               | Hex       | Uso típico                                      |
| ------------------- | --------- | ----------------------------------------------- |
| `--surface-primary` | `#1e1e1e` | Inputs, chips, toggles, fondo de pill switches. |
| `--surface-hover`   | `#2a2a2a` | Hover de superficies.                           |
| `--surface-active`  | `#353535` | Presionado / activo.                            |

### Borders

| Token             | Hex       | Uso típico                                             |
| ----------------- | --------- | ------------------------------------------------------ |
| `--border-subtle` | `#2e2e2e` | Borde 1-2px sobre fondos oscuros.                      |
| `--border-strong` | `#404040` | Borde con contraste alto (focus visible, separadores). |

### Accent (color de marca)

| Token              | Hex       | Uso típico                                               |
| ------------------ | --------- | -------------------------------------------------------- |
| `--accent-primary` | `#f4b400` | CTAs, indicadores, foco, iconos de navegación primarios. |
| `--accent-hover`   | `#ffc93d` | Hover / active del accent.                               |
| `--accent-muted`   | `#d79a00` | Estados deshabilitados / variantes tenues del accent.    |

> Los accent valen lo mismo en light y dark. En Tailwind se exponen como `rgb(244 180 0 / <alpha-value>)` para permitir `/10`, `/40`, etc.

### Text

| Token              | Hex       | Uso típico                               |
| ------------------ | --------- | ---------------------------------------- |
| `--text-primary`   | `#f8f8f8` | Texto principal sobre fondos oscuros.    |
| `--text-secondary` | `#a1a1aa` | Labels, texto auxiliar, contadores.      |
| `--text-muted`     | `#6b7280` | Deshabilitado, decorativo, placeholders. |

### Dark mode override

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

El resto de tokens no cambia entre modos. Si lo portás a RN, el switch de light/dark se hace así:

```ts
// theme/colors.ts (sugerencia)
export const lightColors = {
  background: "#ffffff",
  foreground: "#171717",
  backgroundPrimary: "#0a0a0a",
  // ... (todos los demás tokens)
};

export const darkColors = {
  background: "#0a0a0a",
  foreground: "#ededed",
  // ... idénticos a lightColors, salvo background y foreground
};
```

---

## 3. Cómo se exponen como clases (Tailwind)

Para que un agente sepa qué nombres debe respetar al migrar a RN:

| Clase Tailwind                              | Resuelve a                    | Equivalente RN sugerido      |
| ------------------------------------------- | ----------------------------- | ---------------------------- |
| `bg-background`                             | `var(--background)`           | `colors.background`          |
| `bg-background-primary`                     | `var(--background-primary)`   | `colors.backgroundPrimary`   |
| `bg-background-secondary`                   | `var(--background-secondary)` | `colors.backgroundSecondary` |
| `bg-background-elevated`                    | `var(--background-elevated)`  | `colors.backgroundElevated`  |
| `bg-surface-primary`                        | `var(--surface-primary)`      | `colors.surfacePrimary`      |
| `bg-surface-hover`                          | `var(--surface-hover)`        | `colors.surfaceHover`        |
| `bg-surface-active`                         | `var(--surface-active)`       | `colors.surfaceActive`       |
| `border-border-subtle`                      | `var(--border-subtle)`        | `colors.borderSubtle`        |
| `border-border-strong`                      | `var(--border-strong)`        | `colors.borderStrong`        |
| `bg-accent-primary` / `text-accent-primary` | `var(--accent-primary)`       | `colors.accentPrimary`       |
| `bg-accent-hover` / `text-accent-hover`     | `var(--accent-hover)`         | `colors.accentHover`         |
| `bg-accent-muted` / `text-accent-muted`     | `var(--accent-muted)`         | `colors.accentMuted`         |
| `text-text-primary`                         | `var(--text-primary)`         | `colors.textPrimary`         |
| `text-text-secondary`                       | `var(--text-secondary)`       | `colors.textSecondary`       |
| `text-text-muted`                           | `var(--text-muted)`           | `colors.textMuted`           |

> Nota: `text-text-*` y `border-border-*` llevan el prefijo dos veces porque la primera palabra es el namespace del utility (`text-`, `border-`) y la segunda es el nombre semántico del token (`text-primary`, `border-subtle`). En RN esto se vuelve plano: `colors.textPrimary`, `colors.borderSubtle`.

### Otros tokens registrados en `tailwind.config.ts`

| Clase             | Valor                                                                |
| ----------------- | -------------------------------------------------------------------- |
| `shadow-accent`   | `0 0 18px -2px rgb(244 180 0 / 0.35), 0 0 4px rgb(244 180 0 / 0.15)` |
| `aspect-9/16`     | `aspect-ratio: 9 / 16`                                               |
| `1-5xl:` (screen) | `min-width: 1600px`                                                  |

---

## 4. Scrollbars personalizadas

Tres variantes, pensadas para `overflow: auto` (Web). En RN, las scrollbars nativas se ocultan con `showsVerticalScrollIndicator={false}` y los estilos se aplican al contenido.

### 4.1 `.scrollbar-hidden`

- `::-webkit-scrollbar { display: none; }` (WebKit/Chromium)
- `scrollbar-width: none;` (Firefox)
- `-ms-overflow-style: none;` (IE/Edge legacy)
- **Cuándo usarla**: scroll normal donde querés que la barra desaparezca pero el contenido sigue siendo scrolleable.

### 4.2 `.scrollbar-invisible`

- Mismo objetivo que `.scrollbar-hidden` pero **sin reservar espacio** (overlay WebKit).
- Incluye `scrollbar-gutter: auto` (Firefox) y `::-webkit-scrollbar-track/thumb/corner { width: 0 !important; height: 0 !important; display: none !important; background: transparent !important; }`.
- **Cuándo usarla**: columnas estrechas (ej. `CardMovieViewer`) donde cualquier píxel de scrollbar rompe el layout.

### 4.3 `.scrollbar-custom`

Estilo minimalista de la marca:

- **Track**: `#121212` (background-secondary), `border-radius: 9999px`
- **Thumb**: `#1e1e1e` (surface-primary), `border: 2px solid #121212`, `border-radius: 9999px`
- **Hover thumb**: `#2a2a2a` (surface-hover)
- **Active thumb**: `#404040` (border-strong)
- **Ancho / alto**: 8px
- **Transición**: `background 200ms ease-in-out`
- **Cuándo usarla**: listas largas, grids de cards, cualquier scroller que merezca el estilo de marca.

Equivalente RN: aplicar `showsVerticalScrollIndicator={false}` o usar una librería de scrollbar custom (no hay equivalente directo sin librería; lo más cercano es configurar `scrollbarColor` en Android via `style` o usar `react-native-scroll-indicator`).

---

## 5. Snap scroll

```css
.snap-y-proximity {
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
}

.snap-start {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}
```

- `proximity` = snap sólo si el usuario está "cerca" del punto (no fuerza saltos largos).
- `normal` en `scroll-snap-stop` = permite saltar varios snaps en un solo gesto.
- Equivalente RN: `FlatList` con `snapToInterval` + `snapToAlignment="start"` + `pagingEnabled` (aproximado).

---

## 6. Animaciones de marquee (texto que se desplaza)

Dos keyframes. La elección entre uno y otro depende de si querés pausa en los extremos o no.

### 6.1 `@keyframes marquee` (versión simple, loop continuo)

```css
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

- Duración inyectada vía `--marquee-duration` (default `8s`).
- El segundo copy del texto está justo después del primero, así que al desplazar `-50%` el ciclo queda perfecto.

### 6.2 `@keyframes marquee-scroll` (con pausas en los extremos)

```css
@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  45% {
    transform: translateX(-50%);
  }
  50% {
    transform: translateX(-50%);
  } /* pausa en el extremo */
  95% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(0);
  } /* pausa antes de reiniciar */
}
```

- Evita que el título "salte" al reiniciar.

### Clases auxiliares

```css
.marquee-track {
  animation: marquee var(--marquee-duration, 8s) linear infinite;
  will-change: transform;
}
.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-text {
  display: inline-flex;
  white-space: nowrap;
  height: 100%;
  align-items: center;
  width: max-content;
}

.marquee-content {
  display: inline-block;
  flex-shrink: 0;
}
```

**Convención de uso**: el componente `MarqueeTitle` (en `CardMovieViewer`) inyecta `--marquee-duration` vía `style` inline según el largo del texto. La animación se activa sólo cuando el texto desborda el contenedor y el usuario no está haciendo hover.

**Equivalente RN**: `Animated.Value` + `useNativeDriver: true` con interpolación de `translateX` de `0` a `-50%`, o librería `react-native-marquee`. La pausa en hover se simula con `onTouchStart` / `onTouchEnd` deteniendo la animación.

---

## 7. Aspect ratio utilities

| Clase           | Ratio                      |
| --------------- | -------------------------- |
| `.aspect-w-9`   | `9 / 16` (poster vertical) |
| `.aspect-3-4`   | `3 / 4`                    |
| `.aspect-h-6-9` | `6 / 9` (sólo ≥1024px)     |

Equivalente RN: `aspectRatio: 9/16` (o `aspectRatio: width/height`) en `StyleSheet`.

---

## 8. Grid responsive del shell (3 columnas)

El shell de la app usa una clase `.md-grid-template` con breakpoints custom:

| Breakpoint                      | `grid-template-columns` |
| ------------------------------- | ----------------------- |
| `≥1024px` (lg)                  | `0.7fr 1.3fr 20rem`     |
| `≥1280px` (xl)                  | `0.7fr 1.3fr 16rem`     |
| `max-height: 600px` (landscape) | `0.7fr 1.3fr 15rem`     |
| `≥1920px` (2xl/4k)              | `0.7fr 1.3fr 18rem`     |

**Layout típico del shell** (de `src/app/page.tsx`):

```
[ ToolkitList          (3 cols, banner) ]
[ Menu | MovieListClient | CardMovieViewer ]
```

- Columna 1 (Menu): factor 0.7
- Columna 2 (Lista): factor 1.3 (la más ancha)
- Columna 3 (Viewer): fija en `rem` (15–20rem según viewport)

**Equivalente RN**: `useWindowDimensions` + un componente shell con `flexDirection: 'row'` y `flex` proporcionales (`flex: 0.7`, `flex: 1.3`, `width: 20rem` en la tercera). Para los anchos fijos en `rem`, convertir: `1rem = 16`, así que `20rem ≈ 320px`, `16rem ≈ 256px`, `15rem ≈ 240px`, `18rem ≈ 288px`.

---

## 9. Breakpoints custom

En `tailwind.config.ts`:

- `1-5xl`: `1600px` (uso: `1-5xl:h-5/6`, `1-5xl:max-h-[956px]`, `1-5xl:container`, `1-5xl:w-full`).

> Nombre con guion (`1-5xl`) porque Tailwind no permite arrancar nombres de screen con número. Úsalo como `1-5xl:max-h-[956px]` en clases.

---

## 10. Componentes clave que consumen estos tokens

Para que el agente sepa qué replicar:

| Componente             | Ruta                                              | Qué consume del design system                                                                                                          |
| ---------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `Home` (page)          | `src/app/page.tsx`                                | `md-grid-template`, `bg-neutral-300 dark:bg-background-primary`, `ToolkitList`, `FooterMainMenu`, `MovieListClient`, `CardMovieViewer` |
| `ToolkitList`          | `src/components/list/ToolkitList.tsx`             | `bg-background-elevated`, `bg-surface-primary`, `border-border-subtle`, `text-accent-hover`, `bg-accent-primary` (pastilla de toggle)  |
| `FooterMainMenu`       | `src/components/menu/FooterMainMenu.tsx`          | `bg-background-secondary`, `text-accent-hover`, `text-accent-hover/40`                                                                 |
| `CardMovieViewer`      | `src/components/movie-viewer/CardMovieViewer.tsx` | `marquee-*`, `border-accent-hover`, `text-accent-hover`                                                                                |
| `FormatBadge`          | `src/components/movie-viewer/FormatBadge.tsx`     | `border-accent-primary bg-accent-primary text-background-primary`                                                                      |
| `SettingsMenuModal`    | `src/components/menu/SettingsMenuModal.tsx`       | `bg-background-elevated`, `focus:ring-accent-primary`, `hover:text-danger`                                                             |
| `MovieListClient`      | `src/components/list/MovieListClient.tsx`         | `scrollbar-custom` (implícito en `overflow-auto`)                                                                                      |
| `CardRow` / `GridCard` | `src/components/list/CardRow.tsx`, `GridCard.tsx` | `border-border-subtle`, `bg-surface-primary`, `text-text-secondary`                                                                    |

---

## 11. Reglas de portación a React Native (sugeridas)

1. **Crear `src/theme/colors.ts`** con todos los hex de la sección 2, exportando dos variantes `light` / `dark` (difieren solo en `background` y `foreground`).
2. **Crear `src/theme/spacing.ts`** si necesitás espaciados derivados (`rem → px`, escala 4/8/12/16/24/32/48).
3. **Crear `src/theme/typography.ts`** con `fontFamily: 'System'` (iOS) / `'Roboto'` (Android) y escala de tamaños.
4. **Reemplazar `className` por `StyleSheet.create`** mapeando cada token a su valor numérico (`backgroundColor: colors.backgroundPrimary`, etc.).
5. **Reemplazar las animaciones de marquee** por `Animated.loop` + `translateX` interpolado de 0 a -50% del ancho del contenido, con `duration` proporcional al largo del texto.
6. **Reemplazar las scrollbars custom** por `showsVerticalScrollIndicator={false}`. Si querés barras visibles, usar una librería de scrollbar o un componente custom.
7. **Reemplazar el grid responsive** por un layout `flex` con `useWindowDimensions` que elija proporciones según el ancho.
8. **Snap scroll** en `FlatList`: `pagingEnabled={false}` + `snapToInterval={itemHeight}` + `snapToAlignment="start"` + `decelerationRate="fast"`.
9. **Aspect ratio** en RN: `aspectRatio: 9/16` o `aspectRatio: 3/4` según el caso.
10. **Dark mode** en RN: leer `useColorScheme()` y elegir entre `lightColors` / `darkColors`. No se redefine en runtime; el switch es por cambio de sistema.

---

## 12. Resumen ejecutivo (lo que un agente IA debe recordar)

- **Identidad**: oscuro cinematográfico, accent amarillo único (`#f4b400` / `#ffc93d` / `#d79a00`).
- **Capas de fondo**: 5 (`#ffffff`/`#0a0a0a` raíz, `#0a0a0a` primary, `#121212` secondary, `#1a1a1a` elevated, `#1e1e1e`/`#2a2a2a`/`#353535` surfaces).
- **Bordes**: 2 (`#2e2e2e` subtle, `#404040` strong).
- **Texto**: 3 (`#f8f8f8`, `#a1a1aa`, `#6b7280`).
- **Accent**: 3 (`#f4b400`, `#ffc93d`, `#d79a00`) — mismos en light y dark.
- **Scrollbars**: 3 variantes (`hidden`, `invisible`, `custom`).
- **Animaciones**: 2 keyframes de marquee + scroll snap.
- **Aspect ratios custom**: `9/16`, `3/4`, `6/9`.
- **Grid shell**: 3 columnas responsive (proporciones `0.7 / 1.3 / rem-fijo`) con 4 breakpoints (`1024px`, `1280px`, `1920px`, `max-height: 600px`).
- **Breakpoint custom**: `1-5xl` en `1600px`.
- **Modo oscuro**: solo invierte `--background` y `--foreground`; el resto ya es oscuro.

Este spec es suficiente para que un agente IA replique 1:1 la identidad visual y los componentes del shell en una app React Native, manteniendo la coherencia con MovieList.
