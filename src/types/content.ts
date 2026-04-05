export interface Content {
  id: number,
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: false,
  vote_average: number,
  vote_count: number
}

export interface Genre {
  id: number;
  name: string;
}

export interface ReleaseInfo {
  certification: string,
  descriptors: string[],
  'iso_639_1': string,
  note: string,
  release_date: string,
  type: number
}