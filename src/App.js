import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getForecast, getCurrentWeatherByCoord, getWeather} from './redux/appThunk'
import Navbar from './components/Navbar'
import SavedCities from "./components/SavedCities";
import Main from "./components/Main";
import {Forecast} from "./components/Forecast";
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            // width: theme.spacing(16),
            // height: theme.spacing(16),
        },
    },
}));


function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useSelector(store => store.location);
    // const currentWeather = useSelector(store => store.currentWeather);
    const weather = useSelector(store => store.weather)

    useEffect(() => {
        if (!location.hasFetched && !location.isFetching) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        dispatch(getCurrentWeatherByCoord([ position.coords.latitude , position.coords.longitude]));
                    },
                    () => {
                        console.log('location error')
                    }
                );
            } else {
                // Browser doesn't support Geolocation
                console.log('Browser doesnt support Geolocation')
            }
        }
    }, [location]);

    // useEffect(()=>{
    //     if (position, window.google) {
    //
    //         let city;
    //         let Geocoder;
    //
    //         function initialize() {
    //             Geocoder = new window.google.maps.Geocoder();
    //         }
    //
    //
    //         function codeLatLng(lat, lng) {
    //             // var latlng = new window.google.maps.LatLng(lat, lng);
    //             Geocoder.geoco
    //             // geocoder.geocode({'latLng': latlng}, (results, status) => {
    //             //     if (status == window.google.maps.GeocoderStatus.OK) {
    //             //         console.log(results)
    //             //         if (results[1]) {
    //             //             //formatted address
    //             //             alert(results[0].formatted_address)
    //             //             //find country name
    //             //             for (var i = 0; i < results[0].address_components.length; i++) {
    //             //                 for (var b = 0; b < results[0].address_components[i].types.length; b++) {
    //             //
    //             //                     //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
    //             //                     if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
    //             //                         //this is the object you are looking for
    //             //                         city = results[0].address_components[i];
    //             //                         break;
    //             //                     }
    //             //                 }
    //             //             }
    //             //             //city data
    //             //             alert(city.short_name + " " + city.long_name)
    //             //
    //             //         } else {
    //             //             alert("No results found");
    //             //         }
    //             //     } else {
    //             //         alert("Geocoder failed due to: " + status);
    //             //     }
    //             // });
    //         }
    //         codeLatLng(position.lat, position.lng)
    //     }
    // }, [position])

    // useEffect(() => {
    //     if ( !currentWeather.hasFetched && !currentWeather.isFetchingError && !currentWeather.isFetching && location.hasFetched) {
    //         dispatch(getCurrentWeather(location.actualLocation))
    //     }
    // }, [currentWeather, location]);

    // useEffect(() => {
    //     if (!forecast.hasFetched && !forecast.isFetchingError && !forecast.isFetching && location.hasFetched) {
    //         dispatch(getForecast(location.actualLocation))
    //     }
    // }, [forecast, location]);

    // useEffect(() => {
    //     if ( !currentWeather.hasFetched && !currentWeather.isFetchingError && !currentWeather.isFetching && location.hasFetched) {
    //         dispatch(getCurrentWeather(location.actualLocation))
    //     }
    // }, [currentWeather, location]);

    useEffect(() => {
        if ( !weather.hasFetched && !weather.isFetchingError && !weather.isFetching && location.hasFetched) {
            dispatch(getWeather(location.actualLocation.location))
            console.log('getWeather from app.js')
        }
    }, [weather, location]);



    return (
        <div className="App">

            <Grid container
                  className={classes.root}
                  direction='column'
            >
                <Grid item>
                    <Navbar {...location}/>
                </Grid>

                <Grid item>
                    <Main {...location}/>
                </Grid>

                <Grid item>
                    <Forecast {...weather} />
                </Grid>

                <Grid item>
                    <SavedCities/>
                </Grid>

            </Grid>
        </div>
    );
}

export default App;
