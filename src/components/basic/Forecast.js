import React, {useMemo} from 'react';
import './Forecast.css'
import Gmap from "../elementary/Gmap";
import {ForecastCard} from "../elementary/ForecastCard";

import Moment from 'moment';

import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {ForecastLine} from "../elementary/ForecastLine";
import {useSelector} from "react-redux";

export function Forecast(props) {
    const weather = useSelector(store => store.weather )

    const forecastItems = useMemo(() => {
        return (weather.hasFetched) ? (
        weather.weather.daily.map(day => <ForecastCard key={day.dt} {...day}/>)
    ) : null;
    },[weather.weather.daily, weather.hasFetched])

    const forecastHours = weather.weather.hourly.map(forecast => {
            return (Moment.unix(forecast.dt).format('DD') === Moment().add(weather.forecastPeriod - 1, 'days').format('DD') &&
                Moment.unix(forecast.dt).format('HH') % 6 === 0)?
                <ForecastLine key={forecast.dt} {...forecast}/> : null
        });

    const gMap = useMemo(()=>{
        return weather.forecastPeriod < 7 ?<Gmap {...weather.actualLocation}/> : null
    },[weather.forecastPeriod, weather.actualLocation, weather])

    const typeForecast = (weather.hasFetched && weather.forecastPeriod < 7) ? (
        <div className='Wizard_Forecast_hourly'>
            <div className='Wizard_DetailedWeather_hourlyForecast_item'>
                <Typography variant='h5'>
                    {Moment().add(weather.forecastPeriod - 1, 'days').calendar(null, {
                        sameDay: '[Today]',
                        nextDay: '[Tomorrow]',
                        nextWeek: 'dddd',
                        sameElse: 'L'
                    })}
                </Typography>
            </div>
            <div className='Wizard_DetailedWeather_hourlyForecast_item'>
                <Typography>
                    {Moment().add(weather.forecastPeriod - 1, 'days').format('MMMM, DD')}
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
                {forecastItems}
            </div>
        </div>
    );

    return (
        <Paper elevation={3}>
            <div className='Wizard_Forecast_Container'>
                {typeForecast}
                {gMap}
            </div>
        </Paper>
    );
}