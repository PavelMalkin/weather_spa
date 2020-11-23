import {createReducer} from "@reduxjs/toolkit";
import {getCityName, getCurrentWeatherByCoord} from "../appThunk";
import {setCurrentCity} from "../actions/citiesActions"



const initialState = {
    actualLocation: [],
    hasFetched: false,
    isFetching: false,
    isFetchingError: null
};

const locationReducer = createReducer(initialState, {
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
        state.actualLocation = [
            action.payload.results[0].address_components.find( place => place.types.some(type => type ==='locality')).long_name,
            action.payload.results[0].address_components.find( place => place.types.some(type => type ==='country')).short_name
        ]
        return state;
    },
    [setCurrentCity] : (state, action) => {
        state.actualLocation = [action.payload];
        return state;
    }
})

export default locationReducer;