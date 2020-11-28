import {createReducer} from "@reduxjs/toolkit";
import {saveCity, deleteCity} from "../actions/citiesActions";


const initialState = {
    currentCity: '',
    savedCities: [
        // {city:'Moscow',countryCode: 'RU', location:{lat:55.755826, lon:37.6172999} },
        // {city:'Barcelona',countryCode: 'ES', location:{lat:41.3850639, lon:2.1734035} },
        // {city:'Haifa',countryCode: 'IL', location:{lat:32.82, lon:34.99} },
        // {city:'New York',countryCode: 'US', location:{lat:40.7127753, lon:-74.0059728} },
        // {city:'Podolsk',countryCode: 'RU', location:{lat:55.4312453, lon:37.5457647} },
    ],
    hasFetched: false,
};

const citiesReducer = createReducer(initialState, {
    // [getCityName.pending]: (state) => {
    //     state.isFetching = true;
    //     return state;
    // },
    // [getCityName.rejected]: (state, action) => {
    //     state.isFetching = false;
    //     state.error = action.error.message;
    //     return state;
    // },
    // [getCityName.fulfilled]: (state, action) => {
    //     state.isFetching = false;
    //     state.hasFetched = true;
    //     state.currentCity =  action.payload;
    //     return state;
    // },

    [saveCity]: (state, action) => {
        state.savedCities = [...state.savedCities, ...action.payload];
        state.hasFetched = true;
        return state;
    },
    [deleteCity]: (state, action) => {
        console.log('delete reducer', action.payload)
        state.savedCities.forEach( (city, index) => {
            if (city.city === action.payload.city) {
                state.savedCities.splice(index, 1)
            }
        })
        return state
    }

})

export default citiesReducer;