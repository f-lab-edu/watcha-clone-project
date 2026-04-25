import { queryOptions } from "@tanstack/react-query";

import { SearchRequest } from "../dto/searchRequest";
import { getMovieDetail, getMovieListByGenre, getMovieReviews, getNowPlaying, getSimilarMovies, getTopRated } from "../movie";

export const movieKeys = {
  all: () => ['movie'],
  lists: () => [...movieKeys.all(), 'list'],
  details: () => [...movieKeys.all(), 'detail'],
}

export const nowPlayingQueryOptions = (req: SearchRequest) => queryOptions({
  queryKey: [...movieKeys.lists(), 'now-playing', { req }],
  queryFn: () => getNowPlaying(req)
})

export const topRatedQueryOptions = (req: SearchRequest) => queryOptions({
  queryKey: [...movieKeys.lists(), 'top-rated', { req }],
  queryFn: () => getTopRated(req)
})
export const movieListByGenreQueryOptions = (genreId: number, req: SearchRequest) => queryOptions({
  queryKey: [...movieKeys.lists(), 'by-genre', genreId, { req }],
  queryFn: () => getMovieListByGenre(genreId, req)
})
export const movieDetailQueryOptions = (movieId: number, req: SearchRequest) => queryOptions({
  queryKey: [...movieKeys.details(), movieId, { req }],
  queryFn: () => getMovieDetail(movieId, req),
  enabled: movieId > 0
})
export const reviewsQueryOptions = (movieId: number, req: SearchRequest) => queryOptions({
  queryKey: [...movieKeys.lists(), 'reviews', movieId, { req }],
  queryFn: () => getMovieReviews(movieId, req),
  enabled: movieId > 0
})
export const similarQueryOptions = (movieId: number, req: SearchRequest) => queryOptions({
  queryKey: [...movieKeys.lists(), 'similar', movieId, { req }],
  queryFn: () => getSimilarMovies(movieId, req),
  enabled: movieId > 0
})