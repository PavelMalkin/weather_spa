import {createReducer} from "@reduxjs/toolkit";
import {getWeather} from "../appThunk";
import {dropWeather , setForecast} from "../actions/weatherActions";


const initialState = {
    weather: {
        current: [],
        daily: [],
        hourly: []
    },
    forecastPeriod: 7,
    hasFetched: false,
    isFetching: false,
    isFetchingError: null
};

const weatherReducer = createReducer(initialState, {
    [getWeather.pending]: (state) => {
        state.isFetching = true;
        state.hasFetched = false;
        return state;
    },
    [getWeather.rejected]: (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
        return state;
    },
    [getWeather.fulfilled]: (state, action) => {
        state.isFetching = false;
        state.hasFetched = true;
        state.weather =  action.payload;
        return state;
    },
    [setForecast] : (state, action) => {
        state.forecastPeriod = action.payload
        return state;
    },
    [dropWeather] : (state) => {
        state.weather = {
            current: [],
            daily: [],
            hourly: []
        };
        state.isFetching = false;
        state.hasFetched = false;
        return state;
    }
})

export default weatherReducer;