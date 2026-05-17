import { useSuspenseQueries } from '@tanstack/react-query';
import { SearchRequest } from '@watcha/api';

import { movieListByGenreQueryOptions } from './movieQueries';

export const useMovieListByGenre = (genreIds: number[], req: SearchRequest) =>
  useSuspenseQueries({
    queries: genreIds.map((id) => ({
      ...movieListByGenreQueryOptions(id, req),
      enabled: genreIds.length > 0,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data?.results.slice(0, 10) ?? []),
        isPending: results.some((result) => result.isPending),
      };
    },
  });
