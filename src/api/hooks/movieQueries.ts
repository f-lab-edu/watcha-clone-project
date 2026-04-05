import { queryOptions } from "@tanstack/react-query";

import { SearchRequest } from "../dto/searchRequest";
import { getGenres, getMovieDetail, getMovieListByGenre, getMovieReviews, getNowPlaying, getSimilarMovies, getTopRated } from "../movie";

export const movieQueries = {
  all: () => ['movie'],
  lists: () => [...movieQueries.all(), 'list'],
  details: () => [...movieQueries.all(), 'detail'],

  nowPlaying: (req: SearchRequest) => queryOptions({
    queryKey: [...movieQueries.lists(), 'now-playing', { req }],
    queryFn: () => getNowPlaying(req)
  }),
  topRated: (req: SearchRequest) => queryOptions({
    queryKey: [...movieQueries.lists(), 'top-rated', { req }],
    queryFn: () => getTopRated(req)
  }),
  genres: (req: SearchRequest) => queryOptions({
    queryKey: [...movieQueries.lists(), 'genres', { req }],
    queryFn: () => getGenres(req)
  }),
  movieListByGenre: (genreId: number, req: SearchRequest) => queryOptions({
    queryKey: [...movieQueries.lists(), 'by-genre', genreId, { req }],
    queryFn: () => getMovieListByGenre(genreId, req)
  }),
  movieDetail: (movieId: number, req: SearchRequest) => queryOptions({
    queryKey: [...movieQueries.details(), movieId, { req }],
    queryFn: () => getMovieDetail(movieId, req),
    enabled: movieId > 0
  }),
  reviews: (movieId: number, req: SearchRequest) => queryOptions({
    queryKey: [...movieQueries.lists(), 'reviews', movieId, { req }],
    queryFn: () => getMovieReviews(movieId, req),
    enabled: movieId > 0
  }),
  similar: (movieId: number, req: SearchRequest) => queryOptions({
    queryKey: [...movieQueries.lists(), 'similar', movieId, { req }],
    queryFn: () => getSimilarMovies(movieId, req),
    enabled: movieId > 0
  })

}