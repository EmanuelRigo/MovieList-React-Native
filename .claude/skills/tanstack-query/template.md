### `src/queries/use-user-movies.ts`

```ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export interface UserMovie {
  _id: string;
  movieId: string;
  title: string;
  posterPath?: string;
  format: 'vhs' | 'dvd' | 'bluray';
  checked: boolean;
}

export const USER_MOVIES_KEY = ['userMovies'];

export const useUserMovies = () => {
  return useQuery<UserMovie[]>({
    queryKey: USER_MOVIES_KEY,
    queryFn: async () => {
      const response = await api.get('/api/userMovies');
      return response.data;
    },
  });
};

export const useAddUserMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMovie: Omit<UserMovie, '_id'>) => {
      const response = await api.post('/api/userMovies', newMovie);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_MOVIES_KEY });
    },
  });
};
```

### `src/queries/use-movie.ts`

```ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { USER_MOVIES_KEY } from './use-user-movies';

export interface MovieDetail {
  _id: string;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath?: string;
  genres: string[];
  format?: 'vhs' | 'dvd' | 'bluray';
  checked?: boolean;
}

export const useMovie = (id: string) => {
  return useQuery<MovieDetail>({
    queryKey: ['movie', id],
    queryFn: async () => {
      const response = await api.get(`/api/movies/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useUpdateUserMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<MovieDetail> }) => {
      const response = await api.put(`/api/userMovies/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['movie', variables.id] });
      queryClient.invalidateQueries({ queryKey: USER_MOVIES_KEY });
    },
  });
};

export const useDeleteUserMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/api/userMovies/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_MOVIES_KEY });
    },
  });
};
```
