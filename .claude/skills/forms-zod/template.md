### `src/schemas/auth.schema.ts`

```ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
```

### `src/schemas/movie.schema.ts`

```ts
import { z } from 'zod';

export const movieFormSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  format: z.enum(['vhs', 'dvd', 'bluray'], {
    errorMap: () => ({ message: 'Selecciona un formato válido' }),
  }),
  checked: z.boolean().default(false),
  notes: z.string().optional(),
});

export type MovieFormData = z.infer<typeof movieFormSchema>;
```
