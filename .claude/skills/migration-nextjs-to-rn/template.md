### Ejemplo de Migración de Componente

#### Antes (Next.js)

```tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CardMovie({ movie }) {
  const router = useRouter();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <img src={movie.poster} alt={movie.title} className="w-full h-40 object-cover" />
      <h2 className="text-xl font-bold">{movie.title}</h2>
      <p className="text-gray-600">{movie.overview}</p>
      <button 
        onClick={() => router.push(`/movies/${movie.id}`)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Ver detalle
      </button>
      <Link href="/list">Volver</Link>
    </div>
  );
}
```

#### Después (React Native + NativeWind v4 + Expo Router)

```tsx
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';

interface Movie {
  id: string;
  title: string;
  overview: string;
  poster: string;
}

export default function CardMovie({ movie }: { movie: Movie }) {
  const router = useRouter();

  return (
    <View className="bg-surface p-4 rounded-2xl">
      <Image 
        source={{ uri: movie.poster }} 
        className="w-full h-40 rounded-xl"
        resizeMode="cover"
      />
      <Text className="text-xl font-bold text-main mt-2">{movie.title}</Text>
      <Text className="text-main/70">{movie.overview}</Text>
      
      <Pressable 
        onPress={() => router.push(`/(app)/movies/${movie.id}` as any)}
        className="bg-primary p-3 rounded-xl items-center mt-3"
      >
        <Text className="text-surface font-bold">Ver detalle</Text>
      </Pressable>

      <Link href="/(app)/list" className="text-secondary text-center mt-2 font-semibold">
        Volver
      </Link>
    </View>
  );
}
```
