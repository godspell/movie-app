import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies", async () =>{
     const movietext = "Harry";
      const response = await movieApi
        .get(`?i=tt3896198&apikey=${APIKey}&type=movie&s=${movietext}`)
        .catch((err) =>{
        console.log("Err :" , err);
      });
     return response.data;
});

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const seriesText = "Friends";
    const response = await movieApi
      .get(`?i=tt3896198&apikey=${APIKey}&type=series&s=${seriesText}`)
      .catch((err) => {
        console.log("Err :", err);
      });
    return response.data;
  }
);

export const fetchAsyncMoviesOrShows = createAsyncThunk(
  "movies/fetchAsyncMoviesOrShows",
  async (id) => {
    const response = await movieApi
      .get(`?&apikey=${APIKey}&i=${id}&plot=full`);
    return response.data;
  }
);

const initialState = {
    movies:{},
    shows:{},
    selectedMovieOrShow:{},
}

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, shows: payload };
    },
    [fetchAsyncMoviesOrShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getSelectedMoviesOrShows = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;