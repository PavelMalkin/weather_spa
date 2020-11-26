import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import appReducer from '../../../travel_factory/src/redux/reducers/appReducer';
import locationReducer from './reducers/locationReducer';
import citiesReducer from './reducers/citiesReducer';
import forecastReducer from "./reducers/forecastReducer";

export default configureStore({
  reducer: {
    currentWeather: appReducer,
    forecast: forecastReducer,
    location: locationReducer,
    cities: citiesReducer
  },
  middleware: getDefaultMiddleware()
});
