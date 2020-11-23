import {createReducer} from "@reduxjs/toolkit";
import {getCityName, getCurrentWeather} from "../appThunk";


const initialState = {
    currentCity: '',
    savedCities: [['Moscow', 'RU'], ['Barcelona','ES'], ['Haifa', 'IL'], ['New York', 'US'], ['Podolsk', 'RU']],
};

const citiesReducer = createReducer(initialState, {
    [getCityName.pending]: (state) => {
        state.isFetching = true;
        return state;
    },
    [getCityName.rejected]: (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
        return state;
    },
    [getCityName.fulfilled]: (state, action) => {
        state.isFetching = false;
        state.hasFetched = true;
        state.currentCity =  action.payload;
        return state;
    },

    'SAVE_CITY': (state) => {
        return state;
    },
    'SET_CITY': (state, action) => {
    }

})

export default citiesReducer;