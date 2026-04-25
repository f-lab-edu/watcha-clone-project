import { useQueries } from '@tanstack/react-query';

import { SearchRequest } from '../dto/searchRequest';
import { movieListByGenreQueryOptions } from './movieQueries';

export const useMovieListByGenre = (genreIds: number[], req: SearchRequest) => useQueries({
  queries: genreIds.map(id => ({ ...movieListByGenreQueryOptions(id, req), enabled: genreIds.length > 0 })),
  combine: (results) => {
    return {
      data: results.map(result => result.data?.data.results.slice(0, 10) ?? []),
      isPending: results.some(result => result.isPending),
    }
  }
});