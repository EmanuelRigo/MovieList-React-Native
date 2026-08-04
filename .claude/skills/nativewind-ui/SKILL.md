---
name: nativewind-ui
description: Configuración del sistema de diseño NativeWind v4, componentes UI reutilizables y layout base en React Native con Expo SDK 57.
---

# NativeWind UI Skill

Esta skill proporciona los archivos de configuración requeridos para NativeWind v4 y una suite de componentes UI reutilizables puros para React Native + Expo.

## Reglas de UI y Estilos
1. Usar únicamente componentes nativos de React Native (`View`, `Text`, `Pressable`, `TextInput`).
2. Usar **NativeWind v4** para estilos mediante la propiedad `className`.
3. **PROHIBIDO** usar `StyleSheet.create()`, clases de sombras (`shadow-*`), Bootstrap o React-Bootstrap.
4. Cumplir estrictamente con la paleta de colores del proyecto:
   - Primary: `#4F7942` (`bg-primary`, `text-primary`, `border-primary`)
   - Secondary: `#E19D38` (`bg-secondary`, `text-secondary`, `border-secondary`)
   - Background: `#FBF6D8` (`bg-background`)
   - Surface: `#FEFEFE` (`bg-surface`)
   - Text: `#333333` (`text-main`)

## Estructura de archivos generados
- `tailwind.config.js`
- `babel.config.js`
- `metro.config.js`
- `global.css`
- `src/components/ui/app-button.tsx`
- `src/components/ui/app-input.tsx`
- `src/components/ui/screen.tsx`
- `src/components/ui/section.tsx`
