import {createReducer} from "@reduxjs/toolkit";
import {getCityName, getCurrentWeatherByCoord} from "../../../../travel_factory/src/redux/appThunk";
import {setCurrentCity} from "../actions/citiesActions"


const initialState = {
    actualLocation: [],
    hasFetched: false,
    isFetching: false,
    isFetchingError: null
};

const locationReducer = createReducer(initialState, {
    [getCurrentWeatherByCoord.pending]: (state) => {
        state.isFetching = true;
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
        state.actualLocation = [
            action.payload.list[0].name,
            action.payload.list[0].sys.country,
            action.payload.list[0].coord
        ]
        return state;
    },
    [setCurrentCity] : (state, action) => {
        state.actualLocation = [action.payload];
        return state;
    }
})

export default locationReducer;