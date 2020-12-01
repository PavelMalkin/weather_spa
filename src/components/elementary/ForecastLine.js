import React from 'react';
import {Typography} from "@material-ui/core";
import Moment from "moment";


export function ForecastLine(props) {
    return (
        <div className='Wizard_DetailedWeather_hourlyForecast_item'>
            <Typography> {Moment.unix(props.dt).format('HH:mm ')} </Typography>
            <Typography> {Math.floor(props.temp - 273.15, 1)}°C,</Typography>
            <Typography>  {props.weather[0].description},</Typography>
            <Typography> Wind - {props.wind_speed} m/s</Typography>
        </div>
    );
};