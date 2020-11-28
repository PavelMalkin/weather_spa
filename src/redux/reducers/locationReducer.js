import {createReducer} from "@reduxjs/toolkit";
import {getCityName, getCurrentWeatherByCoord, getCityCoordinatesByName} from "../appThunk";
import {setCurrentCity} from "../actions/citiesActions"


const initialState = {
    actualLocation: {},
    hasFetched: false,
    isFetching: false,
    isFetchingError: null
};

const locationReducer = createReducer(initialState, {
    [getCurrentWeatherByCoord.pending]: (state) => {
        state.isFetching = true;
        state.hasFetched = false;
        return state;
    },
    [getCurrentWeatherByCoord.rejected]: (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
        return state;
    },
    [getCurrentWeatherByCoord.fulfilled]: (state, action) => {
        state.isFetching = false;
        state.hasFetched = true;
        state.actualLocation = {
            city: action.payload.list[0].name,
            countryCode: action.payload.list[0].sys.country,
            location: action.payload.list[0].coord
        }
        return state;
    },
    [setCurrentCity] : (state, action) => {
        state.actualLocation = action.payload;
        return state;
    },
    [getCityCoordinatesByName.pending]: (state) => {
        state.isFetching = true;
        state.hasFetched = false;
        return state;
    },
    [getCityCoordinatesByName.rejected]: (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
        return state;
    },
    [getCityCoordinatesByName.fulfilled]: (state, action) => {
        state.isFetching = false;
        state.hasFetched = true;
        state.actualLocation = {
            city: action.payload.results[0].address_components[0].long_name,
            countryCode: action.payload.results[0].address_components.find(addr => addr.types.some( type => type === "country")).short_name,
            location: {
                lat: action.payload.results[0].geometry.location.lat,
                lon: action.payload.results[0].geometry.location.lng
            }
        }
        return state;
    },
})

export default locationReducer;