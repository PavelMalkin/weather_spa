// import {createReducer} from "@reduxjs/toolkit";
// import {getCurrentWeather} from "../appThunk";
// import {dropActualWeather} from "../actions/weatherActions";
//
//
// const initialState = {
//   currentWeather: {},
//   hasFetched: false,
//   isFetching: false,
//   isFetchingError: null
// };
//
// const appReducer = createReducer(initialState, {
//   [getCurrentWeather.pending]: (state) => {
//     state.isFetching = true;
//     return state;
//   },
//   [getCurrentWeather.rejected]: (state, action) => {
//     state.isFetching = false;
//     state.error = action.error.message;
//     return state;
//   },
//   [getCurrentWeather.fulfilled]: (state, action) => {
//     state.isFetching = false;
//     state.hasFetched = true;
//     state.currentWeather =  action.payload;
//     return state;
//   },
//   [dropActualWeather] : (state) => {
//     state.currentWeather = {};
//     state.isFetching = false;
//     state.hasFetched = false;
//     return state;
//   }
// })
//
// export default appReducer;