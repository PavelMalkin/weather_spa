import React from 'react';
import {CardContent, Typography} from "@material-ui/core";



export function ActualWeather(props) {
    return (
            <CardContent>
                <Typography align='center'
                            variant='h5'>{Math.floor(props.weather.temp - 273.15, 1)} °C</Typography>
                <Typography align='center'
                            variant='h4'>{props.location.city}, {props.location.countryCode}</Typography>
                <Typography align='center' variant='h6'>{props.weather.weather[0].description}, Wind {props.weather.wind_speed} meters per
                    second</Typography>
            </CardContent>
    );
}