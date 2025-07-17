import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TVMAZE_API_BASE_URL = import.meta.env.VITE_TVMAZE_API_BASE_URL;

export interface MovieInfo {
  show: {
    id: number;
    name: string;
    image: { medium: string; original: string } | null;
    rating: { average: number | null };
    summary: string;
    premiered?: string;
    genres?: string[];
    _embedded?: {
      cast?: { person: { name: string } }[];
    };
  };
}

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: TVMAZE_API_BASE_URL }),
  endpoints: (builder) => ({
    searchShows: builder.query<MovieInfo[], string>({
      query: (query) => `shows?q=${encodeURIComponent(query)}`,
    }),
  }),
});

export const { useSearchShowsQuery } = movieApi;
