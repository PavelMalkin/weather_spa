import React from 'react';
import {useHistory} from "react-router-dom";
import Moment from "moment";

import {ForecastCard} from "../elementary/ForecastCard";

import './DetailedWeather.css'

import {Button, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";


export function DetailedWeather(props) {
    const weather =  useSelector(store => store.weather);
    const location = props.location.actualLocation;
    const history = useHistory();

    return (
        <div><Button variant='outlined' onClick={() => history.push('/')}>Back</Button>
            <div className='Wizard_DetailedWeather'>
                {(weather.hasFetched) ? (
                    <div className='Wizard_DetailedWeather_Current'>
                        <Typography variant='h4'>{location.city}, {location.countryCode}</Typography>
                        <Typography variant='h5'>Current weather:</Typography>
                        <Typography variant='h5'>{Math.floor(weather.weather.current.temp - 273.15, 1)} °C</Typography>
                        <Typography variant='h6'>{weather.weather.current.weather[0].description}</Typography>
                        <Typography variant='h6'>Humidity {weather.weather.current.humidity} %</Typography>
                        <Typography variant='h6'>Wind {weather.weather.current.wind_speed} meters per second</Typography>
                    </div>
                ) : null}


                <div className='delimiter'>
                    <hr className="solid"/>
                </div>

                <Typography variant='h5'>Hourly forecast for 48h:</Typography>
                <div className="Wizard_DetailedWeather_hourlyForecast">
                    {(weather.hasFetched) ? (
                        weather.weather.hourly.map(forecast => {
                            if (Moment.unix(forecast.dt).format('HH') % 4 === 0) {
                                return (
                                    <div className='Wizard_DetailedWeather_hourlyForecast_item' key={forecast.dt}>
                                        <Typography> {Moment.unix(forecast.dt).format('DD MMM HH:mm ')} </Typography>
                                        <Typography>  {Math.floor(forecast.temp - 273.15, 1)}°C</Typography>
                                        <Typography> Wind {forecast.wind_speed} m/s</Typography>
                                        <Typography>  {forecast.weather[0].description}</Typography>
                                    </div>
                                )
                            }
                        })
                    ) : null}
                </div>
                <div className='delimiter'>
                    <hr className="solid"/>
                </div>
                <Typography variant='h5'>Week forecast</Typography>
                <div className="Wizard_DetailedWeather_week">
                    {(weather.hasFetched) ? (
                        weather.weather.daily.map(day => <ForecastCard key={day.dt} {...day}/>)
                    ) : null}
                </div>
            </div>
        </div>
    );
}