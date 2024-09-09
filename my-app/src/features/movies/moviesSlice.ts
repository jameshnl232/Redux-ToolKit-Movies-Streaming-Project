import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { Movie, TvShow } from "./movie.type"
import {
  getTrendingMovies,
  getTVList,
  getMovieList,
  MovieType,
  getDetails,
} from "./movies.api"

export interface moviesSliceState {
  trendingMovies: Movie[]
  popularMovies: Movie[]
  topRatedMovies: Movie[]
  upcomingMovies: Movie[]
  popularTvShows: TvShow[]
  topRatedTvShows: TvShow[]
  favorites: (Movie | TvShow)[]
  status: "idle" | "loading" | "failed"
}

const initialState: moviesSliceState = {
  trendingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  popularTvShows: [],
  topRatedTvShows: [],
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites") as string)
    : [],
  status: "idle",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const moviesSlice = createAppSlice({
  name: "movies",
  initialState,
  reducers: create => ({
    fetchTrendingMovies: create.asyncThunk(
      async (page: number, thunkApi) => {
        // get movie list here
        const response = await getTrendingMovies(page)
        return response.results
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.trendingMovies = action.payload
          //set movies list here
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    handleFavorites: create.reducer(
      (state, action: PayloadAction<Movie | TvShow>) => {
        if (!state.favorites.some(fav => fav.id === action.payload.id)) {
          state.favorites.push(action.payload)
        } else {
          state.favorites = state.favorites.filter(
            fav => fav.id !== action.payload.id,
          )
        }
        localStorage.setItem("favorites", JSON.stringify(state.favorites))
      },
    ),
  }),
})

export const selectTrendingMovies = (state: { movies: moviesSliceState }) =>
  state.movies.trendingMovies
export const selectStatus = (state: { movies: moviesSliceState }) =>
  state.movies.status
export const selectFavorites = (state: { movies: moviesSliceState }) =>
  state.movies.favorites

export const { fetchTrendingMovies, handleFavorites } = moviesSlice.actions

export default moviesSlice.reducer
