import {createReducer} from "@reduxjs/toolkit";
import {saveCity, deleteCity} from "../actions/citiesActions";


const initialState = {
    savedCities: [],
    hasFetched: false,
};

const citiesReducer = createReducer(initialState, {
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