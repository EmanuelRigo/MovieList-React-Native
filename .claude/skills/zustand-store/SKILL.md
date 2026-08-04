---
name: zustand-store
description: Implementación de Zustand para gestión de estado global de la aplicación.
---

# Zustand Store Skill

Esta skill define la implementación del estado síncrono/global de la aplicación (autenticación, filtros de UI, preferencias de tema).

## Reglas
1. Los stores deben estar ubicados en `src/stores/`.
2. Usar Zustand únicamente para estado UI o cliente global. No usar Zustand para caching de datos remotos (usar TanStack Query para ello).
