import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchApi} from './request'


const cors = 'https://cors-anywhere.herokuapp.com/';


export const getCurrentWeatherByCoord = createAsyncThunk( "weather/getCurrentWeatherByCoord", (location) =>{
    const locArg = location[0] + '&lon=' + location[1];
    return fetchApi(`http://api.openweathermap.org/data/2.5/find?lat=${locArg}&cnt=3&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
})

export const getCityCoordinatesByName = createAsyncThunk('location/getCityCoordinatesByName', (city) => {
    return fetchApi(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
})

export const getWeather = createAsyncThunk( "weather/getWeather", (location) =>{
    let param = 'lat=' + location.lat + '&lon=' + location.lon
    return fetchApi(`https://api.openweathermap.org/data/2.5/onecall?${param}&exclude=minutely,alerts&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
})

