import { createAction } from "@reduxjs/toolkit";

export const setForecast = createAction("setForecast")
// export const setCurrentWeather = createAction('setCurrentWeather')
export const dropActualWeather = createAction('dropActualWeather');

export const dropForecastWeather = createAction('dropForecastWeather')

export const dropWeather = createAction('dropWeather')