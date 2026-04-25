import { client } from "./client";
import { MovieDetailResponse, MovieListResponse, MovieReviewListResponse } from "./dto/movie.dto";
import { SearchRequest } from "./dto/searchRequest";

export const getNowPlaying = (req: SearchRequest): Promise<MovieListResponse> => client.get<MovieListResponse>('/3/movie/now_playing', { params: { ...req } });

export const getTopRated = (req: SearchRequest): Promise<MovieListResponse> => client.get<MovieListResponse>('/3/movie/top_rated', { params: { ...req } });

export const getMovieListByGenre = (genreId: number, req: SearchRequest): Promise<MovieListResponse> => client.get<MovieListResponse>('/3/discover/movie', { params: { with_genres: genreId, ...req } });

export const getMovieDetail = (movieId: number, req: SearchRequest): Promise<MovieDetailResponse> => client.get<MovieDetailResponse>(`/3/movie/${movieId}`, { params: { ...req, 'append_to_response': 'release_dates,credits' } });

export const getMovieReviews = (movieId: number, req: SearchRequest): Promise<MovieReviewListResponse> => client.get<MovieReviewListResponse>(`/3/movie/${movieId}/reviews`, { params: { ...req, language: 'en-es' } });

export const getSimilarMovies = (movieId: number, req: SearchRequest): Promise<MovieListResponse> => client.get<MovieListResponse>(`/3/movie/${movieId}/similar`, { params: { ...req } });