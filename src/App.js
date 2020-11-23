import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getCurrentLocation, getCurrentWeather, getForecast, getCityName, getCurrentWeatherByCoord} from './redux/appThunk'
import Navbar from './components/Navbar'
import SavedCities from "./components/SavedCities";
import Main from "./components/Main";
import {Forecast} from "./components/Forecast";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
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
    const currentWeather = useSelector(store => store.currentWeather);
    const forecast = useSelector(store => store.forecast)


    useEffect(() => {
        if (!location.hasFetched && !location.isFetching) {
            // dispatch(getCurrentLocation())
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        dispatch(getCurrentWeatherByCoord([ position.coords.latitude , position.coords.longitude]));
                        // dispatch(getCityName([ position.coords.latitude , position.coords.longitude]))
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

    useEffect(() => {
        if (!currentWeather.hasFetched && !currentWeather.isFetchingError && !currentWeather.isFetching && location.hasFetched) {
            dispatch(getCurrentWeather(location.actualLocation))
        }
    }, [currentWeather, location]);

    useEffect(() => {
        if (!forecast.hasFetched && !forecast.isFetchingError && !forecast.isFetching && location.hasFetched) {
            dispatch(getForecast(location.actualLocation))
        }
    }, [forecast, location]);

    const forecastComponent = (forecast.hasFetched) ? (
        <Forecast {...forecast} />
    ) : null;


    return (
        <div className="App">
            <div className={classes.root}>
                <Navbar {...location}/>
                <Main/>
                {forecastComponent}
                <SavedCities/>
            </div>
        </div>
    );
}

export default App;
