import {createAsyncThunk} from "@reduxjs/toolkit";
// import {getEndpointName} from "../endpoints";
import {fetchApi} from './request'

// export const getProjects = createAsyncThunk("projects/getProjects", () => {
//     return fetchApi(getEndpointName('projects'));
// });

const cors = 'https://cors-anywhere.herokuapp.com/';

export const getContactCoordinates = createAsyncThunk( "contacts/getContacts", (address) =>{
    return fetchApi(`https://maps.googleapis.com/maps/api/geocode/json?address=paris&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
})

export const getCurrentWeather = createAsyncThunk( "weather/getCurrentWeather", (location) =>{
    const locArg = (location.length > 1)? (location[0] + ',' + location[1]) : location[0];
    return fetchApi(`${cors}http://api.openweathermap.org/data/2.5/weather?q=${locArg}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
})

export const getCurrentLocation = createAsyncThunk("getCurrentLocation",() => {
    return fetchApi('https://api.ipgeolocation.io/ipgeo?apiKey=1dcb3c056a13421f85ff969ce829d0be')
})

export const getCityName = createAsyncThunk('location/getCityName', (latLng) => {
    return fetchApi(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
})

export const getCurrentWeatherByCoord = createAsyncThunk( "weather/getCurrentWeatherByCoord", (location) =>{
    const locArg = location[0] + '&lon=' + location[1];
    return fetchApi(`${cors}http://api.openweathermap.org/data/2.5/find?lat=${locArg}&cnt=3&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
})

