import React from 'react';
import Gmap from "./Gmap";
import Moment from 'moment';
import {Grid, Typography} from "@material-ui/core";
import {ForecastCard} from "./elementary/ForecastCard";

export function Forecast(props) {

    const forecastItems = (props.hasFetched) ? (
        props.weather.daily.map((day, index) => <ForecastCard key={index + 10000} {...day}/>)
    ) : null;


    let forecastHours = (props.hasFetched && props.forecastPeriod < 7) ? (
        props.weather.hourly.map(forecast => {
            if (Moment.unix(forecast.dt).format('DD') === Moment().add(props.forecastPeriod - 1, 'days').format('DD') &&
                Moment.unix(forecast.dt).format('HH') % 6 === 0) {
                return (
                    <div key={forecast.dt} className='Wizard_DetailedWeather_hourlyForecast_item'>
                        <Typography> {Moment.unix(forecast.dt).format('HH:mm ')} </Typography>
                        <Typography> {Math.floor(forecast.temp - 273.15, 1)}°C,</Typography>
                        <Typography>  {forecast.weather[0].description},</Typography>
                        <Typography> Wind - {forecast.wind_speed} m/s</Typography>
                    </div>
                )
            }
        })
    ) : null;

    const typeForecast = (props.hasFetched && props.forecastPeriod < 7) ? (
        <div className='Wizard_Forecast_hourly'>
            <div className='Wizard_DetailedWeather_hourlyForecast_item'>
                <Typography variant='h5'>
                    {Moment().add(props.forecastPeriod - 1, 'days').calendar(null, {
                        sameDay: '[Today]',
                        nextDay: '[Tomorrow]',
                        nextWeek: 'dddd',
                        sameElse: 'L'
                    })}
                </Typography>
            </div>
            <div className='Wizard_DetailedWeather_hourlyForecast_item'>
                <Typography>
                    {Moment().add(props.forecastPeriod - 1, 'days').format('MMMM, DD')}
                </Typography>
            </div>
            <div className='Wizard_DetailedWeather_hourlyForecast_item'>
                <Typography>Time</Typography>
                <Typography>Weather</Typography>
            </div>
            <div className='delimiter'>
                <hr className="solid"/>
            </div>
            {forecastHours}
        </div>
    ) : (
        <div>
            <div className='Wizard_DetailedWeather_week'>
                {(props.forecastPeriod < 7) ? null : forecastItems}
            </div>
        </div>
    );

    return (
        <div className='wizard_forecast'>
            {typeForecast}

            {(props.forecastPeriod < 7) ?
                <div className='map_container'>
                    <Gmap {...props.actualLocation}/>
                </div>
                : null}
        </div>
    );
}