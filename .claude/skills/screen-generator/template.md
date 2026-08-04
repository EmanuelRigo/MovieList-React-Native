### `app/(app)/movies/[id].tsx`

```tsx
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { MovieDetailsScreen } from '../../../src/screens/movies/movie-details.screen';

export default function MovieDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <MovieDetailsScreen id={id} />;
}
```

### `src/screens/movies/movie-details.screen.tsx`

```tsx
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Screen } from '../../components/ui/screen';
import { MovieDetails } from '../../components/movies/movie-details';
import { useMovie } from '../../queries/use-movie';

interface MovieDetailsScreenProps {
  id: string;
}

export const MovieDetailsScreen: React.FC<MovieDetailsScreenProps> = ({ id }) => {
  const { data: movie, isLoading, error } = useMovie(id);

  return (
    <Screen>
      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4F7942" />
        </View>
      )}

      {error && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500 font-bold">Error al cargar la película</Text>
        </View>
      )}

      {movie && <MovieDetails movie={movie} />}
    </Screen>
  );
};
```

### `src/components/movies/movie-details.tsx`

```tsx
import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Section } from '../ui/section';
import { AppButton } from '../ui/app-button';
import { MovieDetail } from '../../queries/use-movie';

interface MovieDetailsProps {
  movie: MovieDetail;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      {movie.posterPath && (
        <Image
          source={{ uri: movie.posterPath }}
          className="w-full h-80 rounded-2xl mb-4"
          resizeMode="cover"
        />
      )}

      <Text className="text-2xl font-bold text-main mb-2">{movie.title}</Text>

      <Section title="Sinopsis">
        <Text className="text-main leading-6">{movie.overview}</Text>
      </Section>

      <Section title="Información">
        <Text className="text-main mb-1">Fecha de estreno: {movie.releaseDate}</Text>
        <Text className="text-main">Géneros: {movie.genres?.join(', ')}</Text>
      </Section>

      <View className="my-4">
        <AppButton title="Guardar Cambios" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};
```
