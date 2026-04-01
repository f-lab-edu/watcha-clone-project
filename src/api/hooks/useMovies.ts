import { useQueries, useQuery } from '@tanstack/react-query';

import { SearchRequest } from '../dto/searchRequest';
import { movieQueries } from './movieQueries';

export const useNowPlaying = (req: SearchRequest) => useQuery(movieQueries.nowPlaying(req));

export const useTopRated = (req: SearchRequest) => useQuery(movieQueries.topRated(req));

export const useGenres = (req: SearchRequest) => useQuery(movieQueries.genres(req));

export const useMovieListByGenre = (genreIds: number[], req: SearchRequest) => useQueries({
  queries: genreIds.map(id => ({ ...movieQueries.movieListByGenre(id, req), enabled: genreIds.length > 0 })),
});

export const useMovieDetail = (movieId: number, req: SearchRequest) => useQuery(movieQueries.movieDetail(movieId, req));