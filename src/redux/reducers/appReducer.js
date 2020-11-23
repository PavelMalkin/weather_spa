import {createReducer} from "@reduxjs/toolkit";
import {getCurrentWeather} from "../appThunk";



const initialState = {
  currentWeather: {},
  hasFetched: false,
  isFetching: false,
  isFetchingError: null
};

const appReducer = createReducer(initialState, {
  [getCurrentWeather.pending]: (state) => {
    state.isFetching = true;
    return state;
  },
  [getCurrentWeather.rejected]: (state, action) => {
    state.isFetching = false;
    state.error = action.error.message;
    return state;
  },
  [getCurrentWeather.fulfilled]: (state, action) => {
    state.isFetching = false;
    state.hasFetched = true;
    state.currentWeather =  action.payload;
    return state;
  }
})

export default appReducer;