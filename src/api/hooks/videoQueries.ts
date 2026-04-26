import { SearchRequest } from "@api/dto/searchRequest";
import { getContentListByGenre, getGenresByType, getSearchKeyword, getSimilarTvList, getTodayTrend, getTvDetail } from "@api/video";
import { queryOptions } from "@tanstack/react-query";

export const videoKeys = {
  all: () => ['video'],
  lists: () => [...videoKeys.all(), 'list'],
  details: () => [...videoKeys.all(), 'detail'],
}

export const genresQueryOptions = (type: 'movie' | 'tv', req: SearchRequest) => queryOptions({
  queryKey: [...videoKeys.lists(), 'genres', type, { req }],
  queryFn: () => getGenresByType(type, req),
  enabled: type === 'movie' || type === 'tv'
})

export const trendingQueryOptions = (req: SearchRequest) => queryOptions({
  queryKey: [...videoKeys.lists(), 'today-trend', { req }],
  queryFn: () => getTodayTrend(req),
})

export const contentListByGenreQueryOptions = (type: 'movie' | 'tv', genreIds: number, req: SearchRequest) => queryOptions({
  queryKey: [...videoKeys.lists(), 'by-genre', genreIds, { req }],
  queryFn: () => getContentListByGenre(type, genreIds, req)
});

export const tvDetailQueryOptions = (tvId: number, req: SearchRequest) => queryOptions({
  queryKey: [...videoKeys.details(), 'tv', tvId, { req }],
  queryFn: () => getTvDetail(tvId, req),
  enabled: tvId > 0
});

export const videoSimilarQueryOptions = (tvId: number, req: SearchRequest) => queryOptions({
  queryKey: [...videoKeys.lists(), 'similar', tvId, { req }],
  queryFn: () => getSimilarTvList(tvId, req),
  enabled: tvId > 0
});

export const searchQueryOptions = (keyword: string, req: SearchRequest) => queryOptions({
  queryKey: [...videoKeys.lists(), 'search', keyword, { req }],
  queryFn: () => getSearchKeyword(keyword, req),
  enabled: !!keyword
})