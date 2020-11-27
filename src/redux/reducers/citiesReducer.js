import {createReducer} from "@reduxjs/toolkit";
import {getCityName, getCurrentWeather} from "../appThunk";
import {saveCity} from "../actions/citiesActions";


const initialState = {
    currentCity: '',
    savedCities: [
        {city:'Moscow',countryCode: 'RU', location:{} },
        {city:'Barcelona',countryCode: 'ES', location:{} },
        {city:'Haifa',countryCode: 'IL', location:{} },
        {city:'New York',countryCode: 'US', location:{} },
        {city:'Podolsk',countryCode: 'RU', location:{} },
    ],
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

    [saveCity]: (state, action) => {
        console.log('saveCity fired', action.payload)
        state.savedCities = [...state.savedCities, ...[action.payload]]
        return state;
    },

})

export default citiesReducer;