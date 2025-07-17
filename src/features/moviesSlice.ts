import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MovieInfo } from "./movieApi";

interface MoviesState {
  selectedMovies: MovieInfo[];
}

const initialState: MoviesState = {
  selectedMovies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<MovieInfo>) => {
      if (
        !state.selectedMovies.find((m) => m.show.id === action.payload.show.id)
      ) {
        state.selectedMovies.push(action.payload);
      }
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.selectedMovies = state.selectedMovies.filter(
        (m) => m.show.id !== action.payload
      );
    },
    clearMovies: (state) => {
      state.selectedMovies = [];
    },
  },
});

export const { addMovie, removeMovie, clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
