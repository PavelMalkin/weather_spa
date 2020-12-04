import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import locationReducer from './reducers/locationReducer';
import citiesReducer from './reducers/citiesReducer';
import weatherReducer from './reducers/weatherReducer'

export default configureStore({
  reducer: {
    location: locationReducer,
    cities: citiesReducer,
    weather: weatherReducer,
  },
  middleware: getDefaultMiddleware()
});
