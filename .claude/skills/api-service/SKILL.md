---
name: api-service
description: Configuración del cliente HTTP Axios, baseURL y manejo de interceptores de sesión.
---

# API Service Skill

Esta skill define la instancia singleton de Axios usada en toda la aplicación para conectarse al backend Express existente.

## Reglas
1. La instancia base debe ser obligatoriamente `src/services/api.ts`.
2. Usar la variable de entorno `process.env.EXPO_PUBLIC_BACKEND_URL`.
3. Nunca hardcodear URLs.
4. Configurar `withCredentials: true`.
