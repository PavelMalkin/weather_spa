import React from 'react';
import {useHistory} from "react-router-dom";
import {ForecastCard} from "../elementary/ForecastCard";
import Moment from "moment";
import {Button, Typography} from "@material-ui/core";


export function DetailedWeather(props) {
    const weather = props.weather.weather;
    const location = props.location.actualLocation;
    const history = useHistory();

    return (
        <div><Button variant='outlined' onClick={() => history.push('/')}>Back</Button>
            <div className='Wizard_DetailedWeather'>
                {(props.weather.hasFetched) ? (
                    <div className='Wizard_DetailedWeather_Current'>
                        <Typography variant='h4'>{location.city}, {location.countryCode}</Typography>
                        <Typography variant='h5'>Current weather:</Typography>
                        <Typography variant='h5'>{Math.floor(weather.current.temp - 273.15, 1)} °C</Typography>
                        <Typography variant='h6'>{weather.current.weather[0].description}</Typography>
                        <Typography variant='h6'>Humidity {weather.current.humidity} %</Typography>
                        <Typography variant='h6'>Wind {weather.current.wind_speed} meters per second</Typography>
                    </div>
                ) : null}


                <div className='delimiter'>
                    <hr className="solid"/>
                </div>

                <Typography variant='h5'>Hourly forecast for 48h:</Typography>
                <div className="Wizard_DetailedWeather_hourlyForecast">
                    {(props.weather.hasFetched) ? (
                        weather.hourly.map(forecast => {
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
                    {(props.weather.hasFetched) ? (
                        weather.daily.map((day, index) => <ForecastCard key={index + 1000} {...day}/>)
                    ) : null}
                </div>
            </div>
        </div>
    );
}