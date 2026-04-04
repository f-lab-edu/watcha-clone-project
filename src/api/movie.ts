import { client } from "./client";
import { GenreListResponse, MovieListResponse } from "./dto/movie.dto";
import { SearchRequest } from "./dto/searchRequest";

export const getNowPlaying = (req: SearchRequest) => client.get<MovieListResponse>('/3/movie/now_playing', { params: { ...req } });

export const getTopRated = (req: SearchRequest) => client.get<MovieListResponse>('/3/movie/top_rated', { params: { ...req } });

export const getGenres = (req: SearchRequest) => client.get<GenreListResponse>('/3/genre/movie/list', { params: { language: req.language } });

export const getMovieListByGenre = (genreId: number, req: SearchRequest) => client.get<MovieListResponse>('/3/discover/movie', { params: { with_genres: genreId, ...req } });

export const getMovieDetail = (movieId: number, req: SearchRequest) => client.get(`/3/movie/${movieId}`, { params: { ...req } });