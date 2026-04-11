import { Credit } from "src/types/credit";
import { Review } from "src/types/Review";
import { Content, Genre, ReleaseInfo } from "../../types/content";

export interface MovieListResponse {
  page: number;
  results: Content[];
  dates: { maximum: string, minimum: string };
  total_pages: number,
  total_results: number
}

export interface GenreListResponse {
  genres: Genre[];
}

export interface MovieDetailResponse extends Content {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  release_dates: {
    results: {
      "iso_3166_1": string,
      "release_dates": ReleaseInfo[]
    }[]
  },
  content_ratings: {
    results: {
      descriptors: string[],
      iso_3166_1: string,
      rating: string
    }[]
  }
  credits: Credit
  first_air_date: string;
}

export interface MovieReviewListResponse {
  id: number;
  page: number;
  results: Review[]
}
