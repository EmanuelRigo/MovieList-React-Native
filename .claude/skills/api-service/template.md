### `src/services/api.ts`

```ts
import axios from 'axios';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

if (!BACKEND_URL) {
  console.warn('ADVERTENCIA: EXPO_PUBLIC_BACKEND_URL no está configurada.');
}

export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Manejar respuesta 401 (No autorizado) si es necesario
    }
    return Promise.reject(error);
  }
);
```
