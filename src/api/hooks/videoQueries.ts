import { SearchRequest } from "@api/dto/searchRequest";
import { getContentListByGenre, getGenresByType, getSearchKeyword, getSimilarTvList, getTodayTrend, getTvDetail } from "@api/video";
import { queryOptions } from "@tanstack/react-query";


export const videoQueries = {
  all: () => ['video'],
  lists: () => [...videoQueries.all(), 'list'],
  details: () => [...videoQueries.all(), 'detail'],

  trending: (req: SearchRequest) => queryOptions({
    queryKey: [...videoQueries.lists(), 'today-trend', { req }],
    queryFn: () => getTodayTrend(req),
  }),

  genres: (type: 'movie' | 'tv', req: SearchRequest) => queryOptions({
    queryKey: [...videoQueries.lists(), 'genres', type, { req }],
    queryFn: () => getGenresByType(type, req),
    enabled: type === 'movie' || type === 'tv'
  }),
  contentListByGenre: (type: 'movie' | 'tv', genreIds: number, req: SearchRequest) => queryOptions({
    queryKey: [...videoQueries.lists(), 'by-genre', genreIds, { req }],
    queryFn: () => getContentListByGenre(type, genreIds, req)
  }),
  tvDetail: (tvId: number, req: SearchRequest) => queryOptions({
    queryKey: [...videoQueries.details(), 'tv', tvId, { req }],
    queryFn: () => getTvDetail(tvId, req),
    enabled: tvId > 0
  }),
  similar: (tvId: number, req: SearchRequest) => queryOptions({
    queryKey: [...videoQueries.lists(), 'similar', tvId, { req }],
    queryFn: () => getSimilarTvList(tvId, req),
    enabled: tvId > 0
  }),
  search: (keyword: string, req: SearchRequest) => queryOptions({
    queryKey: [...videoQueries.lists(), 'search', keyword, { req }],
    queryFn: () => getSearchKeyword(keyword, req),
    enabled: !!keyword
  })

}