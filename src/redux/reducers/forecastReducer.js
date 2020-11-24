import {createReducer} from "@reduxjs/toolkit";
import {getForecast} from "../appThunk";
import {setForecast, dropForecastWeather} from "../actions/weatherActions";


const initialState = {
    forecastWeather: {},
    forecastPeriod: 7,
    hasFetched: false,
    isFetching: false,
    isFetchingError: null
};

const forecastReducer = createReducer(initialState, {
    [getForecast.pending]: (state) => {
        state.isFetching = true;
        return state;
    },
    [getForecast.rejected]: (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
        return state;
    },
    [getForecast.fulfilled]: (state, action) => {
        state.isFetching = false;
        state.hasFetched = true;
        state.forecastWeather =  action.payload;
        return state;
    },
    [setForecast] : (state, action) => {
        state.forecastPeriod = action.payload
        return state;
    },
    [dropForecastWeather]: (state) => {
        state.isFetching = false;
        state.hasFetched = false;
        state.forecastWeather = {};
        return state;
    }
})

export default forecastReducer;