import { client } from './client';
import { GenreListResponse, MovieDetailResponse, MovieListResponse } from './dto/movie.dto';
import { SearchRequest } from './dto/searchRequest';

export const getTodayTrend = (req: SearchRequest): Promise<MovieListResponse> =>
  client.get<MovieListResponse>('/3/trending/all/day', { params: req }).then((resp) => resp.data);

export const getGenresByType = (
  type: 'movie' | 'tv',
  req: SearchRequest,
): Promise<GenreListResponse> =>
  client.get<GenreListResponse>(`/3/genre/${type}/list`, { params: req }).then((resp) => resp.data);

export const getContentListByGenre = (
  type: 'movie' | 'tv',
  genreIds: number,
  req: SearchRequest,
): Promise<MovieListResponse> =>
  client
    .get<MovieListResponse>(`/3/discover/${type}`, { params: { with_genres: genreIds, ...req } })
    .then((resp) => resp.data);

export const getTvDetail = (tvId: number, req: SearchRequest): Promise<MovieDetailResponse> =>
  client
    .get<MovieDetailResponse>(`/3/tv/${tvId}`, {
      params: { ...req, append_to_response: 'content_ratings,credits' },
    })
    .then((resp) => resp.data);

export const getSimilarTvList = (tvId: number, req: SearchRequest): Promise<MovieListResponse> =>
  client.get<MovieListResponse>(`/3/tv/${tvId}/similar`, { params: req }).then((resp) => resp.data);

export const getSearchKeyword = (keyword: string, req: SearchRequest): Promise<MovieListResponse> =>
  client
    .get<MovieListResponse>(`/3/search/multi`, { params: { query: keyword, ...req } })
    .then((resp) => resp.data);
