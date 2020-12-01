import React, {useEffect} from 'react';
import {CardContent, Grid, Typography} from "@material-ui/core";



export function ActualWeather(props) {
    // console.log('ActualWeather counter')

    return (
        <Grid item>
            <CardContent>
                <Typography align='center'
                            variant='h5'>{Math.floor(props.weather.temp - 273.15, 1)} °C</Typography>
                <Typography align='center'
                            variant='h4'>{props.location.city}, {props.location.countryCode}</Typography>
                <Typography align='center' variant='h6'>{props.weather.weather[0].description}, Wind {props.weather.wind_speed} meters per
                    second</Typography>
            </CardContent>
        </Grid>
    );
}